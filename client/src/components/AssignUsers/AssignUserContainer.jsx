import React, { useState } from "react";
import AssignUsers from "./AssignUsers";

function AssignUsersContainer(matchingTicketId) {
  const [grayedOutMap, setGrayedOutMap] = useState(new Map());

  const handleGrayOutToggle = (imageSrc, ticketId) => {
    const key = `${imageSrc}:${ticketId}`;
    const newGrayedOutMap = new Map(grayedOutMap);
    const grayedOut = newGrayedOutMap.get(key);
    newGrayedOutMap.set(key, !grayedOut);
    setGrayedOutMap(newGrayedOutMap);
  };

  const images = [
    {
      imageSrc: "https://picsum.photos/id/237/200/200",
      username: "User1",
      ticketId: matchingTicketId,
    },
    {
      imageSrc: "https://picsum.photos/id/238/200/200",
      username: "User2",
      ticketId: matchingTicketId,
    },
    {
      imageSrc: "https://picsum.photos/id/239/200/200",
      username: "User3",
      ticketId: matchingTicketId,
    },
  ];

  return (
    <div>
      {images.map((image) => (
        <AssignUsers
          key={`${image.imageSrc}:${image.ticketId}`}
          imageSrc={image.imageSrc}
          username={image.username}
          onClick={() => handleGrayOutToggle(image.imageSrc, matchingTicketId)}
          grayedOut={grayedOutMap.get(`${image.imageSrc}:${matchingTicketId}`)}
          ticketId={matchingTicketId}
        />
      ))}
    </div>
  );
}

export default AssignUsersContainer;
