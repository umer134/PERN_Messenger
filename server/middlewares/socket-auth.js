const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function(socket, next) {
  
  try {   
    
    const token = socket.handshake.auth.token;

    if(!token) {
      return next(ApiError.UnauthorizedError());
    }

    const user = tokenService.validateAccessToken(token);

    if(!user) {
      return next(ApiError.UnauthorizedError());
    }

    socket.user = user;

    next();

  } catch (e) {
    next(ApiError.UnauthorizedError(e));
  }
}