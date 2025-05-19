const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');


class UserController {

    async registration (req, res, next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('validation error', errors.array()));
            }
            const {name, email, password} = req.body;
            const avatarPath = req.file ? `/uploads/avatars/${req.file.filename}` : null;
            console.log('avatarPath', avatarPath)
            const userData = await userService.registration(name, email, password, avatarPath);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false, 
                sameSite: 'lax', 
              });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false, 
                sameSite: 'lax', 
              });
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh (req, res, next) {
        try {  
            const {refreshToken} = req.cookies;
            //if(!refreshToken) return next(ApiError.UnauthorizedError())
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false, 
                sameSite: 'lax', 
              });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers (req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUser (req, res, next) {
        try {
            const { userId } = req.params;
            const user = await userService.getUser(userId);
            return res.json(user);
        } catch(e) {
            next(e)
        }
    }

    async searchUsers (req, res, next) {
        try {
            const { query } = req.query;
            if(!query) return res.json([]);
            
            const user = await userService.searchUsers(query);
            return res.json(user);
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new UserController();