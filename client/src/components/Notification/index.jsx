import React, { useEffect, useState } from "react";
import { useView } from "../../context/UserContext";

const NotificationCard = () => {
  const [notification, setNotification] = useState([]);
  const { user } = useView();

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        `https://built-differently-backend.onrender.com/notification/${user.username}`
      );
      const data = await response.json();
      setNotification(data);
    };

    fetchNotifications();
  }, []);

  return (
    <>
      {notification && (
        <div className="flex items-center justify-center mx-auto m-2 rounded-lg border border-gray-400 bg-blue-50">
          <h2 className="text-3xl font-bold m-2 text-center">Notifications</h2>
          <div className="outerbox min-h-20 rounded-lg border-dashed border-transparent bg-blue-100 p-2 transition-colors duration-150 hover:border-gray-400 hover:bg-blue-200">
            <ul className="wrapper-notifications">
              {notification.map((e, i) => (
                <div
                  className="wrap border flex  justify-center mx-auto m-2 rounded-lg border-gray-400 bg-blue-50 mb-2 rounded-md bg-blue-50 py-2 px-4 text-sm text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false"
                  key={i}
                >
                  <li className="w-full">Content: {e.content}</li>
                  <li className="w-full">By User: {e.member}</li>
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
