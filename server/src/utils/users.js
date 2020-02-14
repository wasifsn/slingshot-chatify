const users = [];
// addUser
const addUser = ({ id, name, room }) => {
  // clean the data
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // validate the data
  if (!name || !room) {
    return {
      error: "Name and Room is required "
    };
  }

  //check existing user
  const existingUser = users.find(user => {
    return user.room === room && user.name === name;
  });

  //   validate username
  if (existingUser) {
    return {
      error: "Name is already taken please enter another Name"
    };
  }

  // store user
  const user = { id, name, room };
  users.push(user);
  console.log(users);
  return {
    user
  };
};

// removeUser
const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// getUser
const getUser = id => {
  const user = users.find(user => user.id === id);
  return user;
};

// getUsersInRoom
const getUsersInRoom = room => {
  const usersInRoom = users.filter(user => {
    return user.room === room;
  });
  return usersInRoom;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  users
};
