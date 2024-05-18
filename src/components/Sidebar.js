import React from "react";

const Sidebar = ({ roomName, users }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-500 p-4">
        <h2 className="text-xl font-semibold">{roomName}</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <h3 className="text-md font-semibold mb-2">Users</h3>
        <ul>
          {users?.map((user) => (
            <li key={user.id} className="mb-2">
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
