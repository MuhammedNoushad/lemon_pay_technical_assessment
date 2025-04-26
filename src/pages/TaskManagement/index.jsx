import React, { useEffect, useRef, useState } from "react";
import BackIcon from "../../icons/BackIcon";
import ForwardIcon from "../../icons/ForwardIcon";
import TaskModal from "../../components/Modal";

const tasks = [
  {
    id: 1,
    title: "Design Navaratri poster",
    description: "Multi-line text area.",
    dateTime: "2/02/2024 2:00 PM",
  },
  {
    id: 2,
    title: "Design Navaratri poster",
    description: "Multi-line text area.",
    dateTime: "2/02/2024 2:00 PM",
  },
  {
    id: 3,
    title: "Design Navaratri poster",
    description: "Multi-line text area.",
    dateTime: "2/02/2024 2:00 PM",
  },
];

const TaskManagement = () => {
  const [openId, setOpenId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    console.log("New task:", taskData);
    // Add your task saving logic here
  };

  return (
    <>
      <div className="p-4 mt-8 ">
        <h1 className="font-nunito text-blue-700 text-[24px] leading-[70%] font-medium mb-6">
          Task Management
        </h1>
        <div className="flex">
          <button
            onClick={handleAddTask}
            className="bg-blue-700 text-white px-4 py-2 rounded-3xl mb-4 ml-auto"
          >
            + Add Task
          </button>
        </div>

        {/* Mobile view (Cards) */}
        <div className="block md:hidden space-y-4">
          <div className="mb-[4rem]">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="relative bg-gray-100 p-4 rounded shadow border-l-2 border-gray-400 mb-2"
              >
                <div className="flex justify-between items-center font-nunito font-medium">
                  <div className="flex flex-col ">
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>{task.dateTime}</p>
                  </div>
                  <div ref={menuRef}>
                    {/* 3 Dots Button */}
                    <button
                      onClick={() =>
                        setOpenId(openId === task.id ? null : task.id)
                      }
                      className="p-2 rounded-full hover:bg-gray-300"
                    >
                      ⋮
                    </button>

                    {/* Dropdown */}
                    {openId === task.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Edit
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-8 items-center">
            <BackIcon />
            <ForwardIcon />
          </div>
        </div>

        {/* Desktop view (Table) */}
        <div className="hidden md:block">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Date & Time</th>
                <th className="px-4 py-2 border">Task</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{task.dateTime}</td>
                  <td className="px-4 py-2 border">{task.title}</td>
                  <td className="px-4 py-2 border">{task.description}</td>
                  <td className="px-4 py-2 border">
                    <button className="text-gray-500">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </>
  );
};

export default TaskManagement;
