const { onlineUsers } =
  require("../presence");

module.exports =
  function getOnlineUsers() {

    return [
      ...onlineUsers.keys()
    ];
  };