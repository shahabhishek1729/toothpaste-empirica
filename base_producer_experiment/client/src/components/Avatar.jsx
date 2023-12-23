import React from "react";

export function Avatar({ player }) {
  return (
    <img
      className="h-full w-full rounded-md shadow bg-white p-1"
      src={`https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=1024x1024&w=is&k=20&c=ZVVVbYUtoZgPqbVSDxoltjnrW3G_4DLKYk6QZ0uu5_w=`}
      alt="Avatar"
    />
  );
}
