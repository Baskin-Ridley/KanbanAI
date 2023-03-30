import React, { useEffect, useState } from "react";
import { useView } from "../../context/UserContext";
import UserList from "./UserList";
import UserInfo from "./UserInfo";

const UserWindow = () => {
  const { user } = useView();
  const [userData, setUserData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getDataMembers = async () => {
      const response = await fetch(
        `https://built-differently-backend.onrender.com/super_user/member/${user.username}`
      );
      const data = await response.json();
      setUserData(data);
    };

    getDataMembers();
  }, [user.username]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="Card w-1/3">
        <div style={{ flex: 1 }}>
          <UserList userData={userData} handleUserClick={handleUserClick} />
        </div>
      </div>
      <div className="Card w-full">
        <div style={{ flex: 2 }}>
          {selectedUser && (
            <UserInfo
              selectedUser={selectedUser}
              handleBackClick={handleBackClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserWindow;
