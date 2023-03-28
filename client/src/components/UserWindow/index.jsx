import React, { useEffect, useState } from 'react'
import { useView } from '../../context/UserContext'
import UserList from './UserList'
import UserInfo from './UserInfo'

const UserWindow = () => {
    const { user } = useView()
    const [userData, setUserData] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        const getDataMembers = async () => {
            const response = await fetch(`http://localhost:5000/super_user/member/${user.username}`)
            const data = await response.json()
            setUserData(data)
        }

        getDataMembers()
    }, [user.username])

    const handleUserClick = (user) => {
        setSelectedUser(user)
    }

    const handleBackClick = () => {
        setSelectedUser(null)
    }

    if (!userData) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {selectedUser ? (
                <UserInfo selectedUser={selectedUser} handleBackClick={handleBackClick} />
            ) : (
                <UserList userData={userData} handleUserClick={handleUserClick} />
            )}
        </div>
    )
}

export default UserWindow
