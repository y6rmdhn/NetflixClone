import React from "react";

const Notification = ({ message }) => {
  return (
    <div className="toast toast-top toast-center mt-20">
      <div className="alert bg-black/90">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
