import React from 'react'

const UserInfo = ({ selectedUser, handleBackClick }) => {
    const { avatar, email } = selectedUser

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={avatar} alt="user avatar" style={{ width: 100, height: 100 }} />
            <div style={{ marginLeft: 20 }}>
                <div>Email: {email}</div>
                <div>
                    <input type="text" placeholder="Enter your input here" />
                </div>
                <button onClick={handleBackClick}>Back</button>
            </div>
        </div>
    )
}

export default UserInfo
