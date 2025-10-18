import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <span className="loading loading-bars w-16"></span>
      <h3 className="font-semibold text-center mt-2">Please Wait!</h3>
    </div>
  );
};
