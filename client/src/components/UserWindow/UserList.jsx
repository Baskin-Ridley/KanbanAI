import React from "react";

const UserList = ({ userData, handleUserClick }) => {
  return (
    <div>
      {userData.map((user) => (
        <div className="wrap border flex  justify-center mx-auto m-2 rounded-lg border-gray-400 bg-blue-50 mb-2 rounded-md bg-blue-50 py-2 px-4 text-sm text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false">
          <div
            key={user.username}
            onClick={() => handleUserClick(user)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={user.avatar}
              alt="user avatar"
              style={{ width: 50, height: 50 }}
            />
            <div style={{ display: "inline-block" }}>{user.username}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
