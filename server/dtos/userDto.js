module.exports = class UserDTO {
    name;
    email;
    id;
    isActivated;
    avatar;

    constructor(model) {
       this.name = model.username;
       this.email = model.email
       this.id = model.id
       this.isActivated = model.isActivated
       this.avatar = model.avatar_url
    }
}