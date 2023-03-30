import React, { useEffect, useState } from "react";
import { useView } from "../../context/UserContext";

const NotificationCard = () => {
  const [notification, setNotification] = useState([]);
  const { user } = useView();

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        `http://localhost:5000/notification/${user.username}`
      );
      const data = await response.json();
      setNotification(data);
    };

    fetchNotifications();
  }, []);

<<<<<<< HEAD
  return (
    <>
      {notification && (
        <div className="flex items-center justify-center mx-auto m-2 rounded-lg border border-gray-400 bg-blue-50">
          <h2 className="text-3xl font-bold m-2 text-center">Notifications</h2>
          <div className="outerbox min-h-20 rounded-lg border-dashed border-transparent bg-blue-100 p-2 transition-colors duration-150 hover:border-gray-400 hover:bg-blue-200 w-full">
            <ul className="wrapper-notifications">
              {notification.map((e, i) => (
                <div
                  className="wrap border flex  justify-center mx-auto m-2 rounded-lg border-gray-400 bg-blue-50 mb-2 rounded-md bg-blue-50 py-2 px-4 text-sm text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false"
                  key={i}
                >
                  <li className="w-full"> {e.content}</li>
                  <li className="w-full">By User: {e.member}</li>
=======
        fetchNotifications()
    }, [])



    return (
        <>
            <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
            {notification &&
                <div className="flex items-center justify-center mx-auto m-2 rounded-lg border border-gray-400 bg-blue-50">
                    <h2 className="text-3xl font-bold m-2 text-center"><i class="fa fa-comments-o" aria-hidden="true"></i><i class="fa fa-exclamation" aria-hidden="true"></i>Notifications</h2>
                    <div className='outerbox min-h-20 rounded-lg border-dashed border-transparent bg-blue-100 p-2 transition-colors duration-150 hover:border-gray-400 hover:bg-blue-200 w-full'>
                        <ul className="wrapper-notifications">
                            {notification.map((e, i) => (
                                <div className="wrap border flex  justify-center mx-auto m-2 rounded-lg border-gray-400 bg-blue-50 mb-2 rounded-md bg-blue-50 py-2 px-4 text-sm text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false" key={i}>
                                    <li className="w-full"> {e.content}</li>
                                    <li className="w-full">By User: {e.member}</li>
                                </div>
                            ))}
                        </ul>
                    </div>
>>>>>>> cb3c26470b2901ad496e550642f2087074c179b2
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCard;
