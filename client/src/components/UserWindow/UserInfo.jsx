import React from 'react'

const UserInfo = ({ selectedUser, handleBackClick }) => {
    const { avatar, email } = selectedUser

    return (
        <div clasName=" " style={{ display: 'flex', alignItems: 'center' }}>
            <img src={avatar} alt="user avatar" style={{ width: 100, height: 100 }} />
            <div style={{ marginLeft: 20 }}>
                <div className='wrap border flex  justify-center mx-auto m-2 rounded-lg border-gray-400 bg-blue-50 mb-2 rounded-md bg-blue-50 py-2 px-4 text-sm text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false'>Email: {email}</div>
                <div>
                    <input className='wrap border flex  justify-center mx-auto m-2 rounded-lg border-gray-400 bg-blue-50 mb-2 rounded-md bg-blue-50 py-2 px-4 text-sm text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false' type="text" placeholder="Enter your input here" />
                </div>
                <button onClick={handleBackClick}>Back</button>
            </div>
        </div>
    )
}

export default UserInfo
