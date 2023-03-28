import React from 'react'

const UserList = ({ userData, handleUserClick }) => {
    return (
        <div>
            {userData.map((user) => (
                <div key={user.username} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                    <img src={user.avatar} alt="user avatar" style={{ width: 50, height: 50 }} />
                    <div style={{ display: 'inline-block', marginLeft: 20 }}>{user.username}</div>
                </div>
            ))}
        </div>
    )
}

export default UserList
