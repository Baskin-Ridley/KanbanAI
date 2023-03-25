import React, { useEffect, useState } from 'react'
import { useView } from '../../context/UserContext'

const NotificationCard = () => {
    const [notification, setNotification] = useState([])
    const { user } = useView()

    useEffect(() => {

        const fetchNotifications = async () => {
            const response = await fetch(`http://localhost:5000/notification/${user.username}`)
            const data = await response.json()
            setNotification(data)
        }

        fetchNotifications()
    }, [])




    return (
        <>
            {notification && <div>
                <ul className='wrapper-notifications'>
                    {notification.map((e, i) => (
                        <div className='wrapper-content-notification'>
                            <li key={i}>content:{e.content}</li>
                            <li>by user: {e.member}</li>
                        </div>
                    ))}
                </ul>
            </div>}
        </>
    )
}

export default NotificationCard
