const {Op} = require('sequelize');
const mailService = require("./mail-service");
const uudi = require('uuid');
const bcrypt = require('bcrypt');
const tokenService = require("./token-service");
const UserModel = require("../models/userModel");
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/api-error')
 


class UserService {
    async registration (name, email, password, avatar_url) {
        const candidate = await UserModel.findOne({where: {email: email}});

        if(candidate) {
            throw ApiError.BadRequest(`the user with email ${email} is exist`)
        }
        const hashPassord = await bcrypt.hash(password, 3 )
        const activationLink = uudi.v4()
        const user = await UserModel.create({username:name, email, password: hashPassord, avatar_url, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async activate (activationLink) {
        const user = await UserModel.findOne({where:{activationLink: activationLink}});
        if(!user) {
            throw ApiError.BadRequest('not correct link')
        }
        user.isActivated = true;
        await user.save();
    }

    async login (email, password) {
        const user = await UserModel.findOne({where: {email}});
        if(!user) {
            throw ApiError.BadRequest('the user is not found');
        }
        
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if(!isPasswordEquals) {
            throw ApiError.BadRequest('uncorrect password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async refresh (reshreshToken) {
        if(!reshreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(reshreshToken);
        const tokenFromDb = tokenService.findToken(reshreshToken);
        
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findOne({where: {id: userData.id}})
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async getUsers () {
        const users = await UserModel.findAll();
        return users;
    }

    async getUser (userId) {
        const user = await UserModel.findOne({where: {id: userId}});
        return user;
    }

    async searchUsers(query) {
        
        if (!query || typeof query !== 'string') {
          throw ApiError.BadRequest('Search query is required');
        }
      
        try {
          const users = await UserModel.findAll({
            where: {
              username: { [Op.iLike]: `%${query}%` }
            },
            attributes: ['id', 'username', ['avatar_url', 'avatar']],
            limit: 10
          });
         
          return users; 
        } catch (dbError) {
            console.log('dbEr', dbError);
          throw ApiError.BadRequest('Search failed', [
            { msg: 'Database error' }
          ]);
        }
      }
}


module.exports = new UserService ();