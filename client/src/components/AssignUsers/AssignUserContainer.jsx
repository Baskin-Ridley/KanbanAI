import React, { useState } from "react";
import AssignUsers from "./AssignUsers";
import imageOne from "./photos/1.png";
import imageTwo from "./photos/2.png";
import imageThree from "./photos/3.jpeg";
import imageFour from "./photos/4.png";

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
      imageSrc: imageOne,
      username: "Sho",
      ticketId: matchingTicketId,
    },
    {
      imageSrc: imageTwo,
      username: "Kay",
      ticketId: matchingTicketId,
    },
    {
      imageSrc: imageThree,
      username: "Gabriel",
      ticketId: matchingTicketId,
    },
    {
      imageSrc: imageFour,
      username: "Gabrielle",
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
