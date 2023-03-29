import React from 'react'

const UserInfo = ({ selectedUser, handleBackClick }) => {
    const { avatar, email } = selectedUser


    const handlesendClick = () => {

    }

    return (
        <div clasName=" " style={{ display: 'flex' }}>
            <img className='photo border ' src={avatar} alt="user avatar" style={{ width: 100, height: 100 }} />
            <div style={{ marginLeft: 20 }}>
                <div className=' email-fieldwrap border flex  justify-center mx-auto m-2 rounded-lg border-gray-400 bg-blue-50 mb-2 rounded-md bg-blue-50 py-2 px-4 text-sm text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false '>Email: {email}</div>
                <div>
                    <textarea className='input-box px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full h-full 
                    '  cols="40" rows="5" type="text" placeholder="Enter your input here" />
                </div>
                <button className='send-button bg-blue-500 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none hover:bg-blue-200 hover:text-black undefined w-full' onClick={handlesendClick}>Send</button>
            </div>
        </div>
    )
}

export default UserInfo
