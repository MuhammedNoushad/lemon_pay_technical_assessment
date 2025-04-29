import React, { useEffect, useState } from "react";
import BackIcon from "../../icons/BackIcon";
import ForwardIcon from "../../icons/ForwardIcon";
import Pagination from "../../components/pagination";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import formatToIndianDate from "../../../util/formateDate";

export const TaskModal = ({ task, isEdit, isOpen, onClose, onSave }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Reset the form when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      if (isEdit && task) {
        // Format date for date input (yyyy-MM-dd)
        const formattedDate = task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "";

        setTaskName(task.taskName || "");
        setDescription(task.description || "");
        setDueDate(formattedDate);
      } else {
        // Default values for new task
        setTaskName("");
        setDescription("");
        setDueDate("");
      }
    }
  }, [isOpen, isEdit, task]);

  const handleSave = (e) => {
    e.preventDefault();

    // Basic validation
    if (!taskName.trim()) {
      alert("Task name is required");
      return;
    }

    onSave({
      taskName,
      description,
      dueDate,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isEdit ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Name*
            </label>
            <input
              id="taskName"
              type="text"
              placeholder="Enter Task Name"
              className="w-full p-3 bg-gray-100 rounded-md"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              className="w-full p-3 bg-gray-100 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              className="w-full p-3 bg-gray-100 rounded-md"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              type="submit"
              className="w-32 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-full"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TaskManagement = () => {
  const [openId, setOpenId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [singleTask, setSingleTask] = useState(null);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/task?page=${page}`);
      setTasks(response.data.tasks);
      setTotalTasks(response.data.totalTasks);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  const handleAddTask = () => {
    setIsEdit(false);
    setSingleTask(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      let response;
      if (isEdit && singleTask) {
        response = await axiosInstance.put(`/task/${singleTask._id}`, taskData);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === singleTask._id ? { ...task, ...taskData } : task
          )
        );
        toast.success("Task updated successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        response = await axiosInstance.post("/task", taskData);

        const newTotalTasks = totalTasks + 1;
        const tasksPerPage = 10;
        const lastPage = Math.ceil(newTotalTasks / tasksPerPage);

        await fetchTasks(lastPage);
        setCurrentPage(lastPage);

        toast.success("Task added successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Error saving task: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsEdit(false);
      setSingleTask(null);
    }
  };

  const handleEdit = async (taskId) => {
    try {
      const response = await axiosInstance.get(`/task/${taskId}`);
      setSingleTask(response.data.task);
      setIsEdit(true);
      setIsModalOpen(true);
      setOpenId(null);
    } catch (error) {
      console.error("Error fetching task for edit:", error);
      toast.error(`Error fetching task for edit: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setOpenId(null); // Close dropdown after deleting
      toast.success("Task deleted successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(`Error deleting task: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const toggleDropdown = (index, event) => {
    event.stopPropagation();
    setOpenId(openId === index ? null : index);
  };

  if (isloading) {
    return (
      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 mt-8 h-screen">
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
            {tasks && tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="relative bg-gray-100 p-4 rounded shadow border-l-2 border-gray-400 mb-2"
                >
                  <div className="flex justify-between items-center font-nunito font-medium">
                    <div className="flex flex-col">
                      <h2>{task.taskName}</h2>
                      <p>{task.description}</p>
                      <p>{formatToIndianDate(task.dueDate)}</p>
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => toggleDropdown(index, e)}
                        className="p-2 rounded-full hover:bg-gray-300"
                      >
                        ⋮
                      </button>

                      {openId === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(task._id);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(task._id);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No Data Found
              </div>
            )}
          </div>

          <div className="flex justify-center gap-8 items-center">
            <BackIcon />
            <ForwardIcon />
          </div>
        </div>

        {/* Desktop view (Table) */}
        <div className="hidden md:block">
          <table className="min-w-full table-auto border-separate border-spacing-y-12 border-spacing-x-0">
            <thead>
              <tr className="bg-gray-100 text-blue-700 font-nunito font-medium leading-[136%]">
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Date & Time</th>
                <th className="px-4 py-2 border">Task</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr
                    key={task._id}
                    className="text-center font-nunito font-medium leading-[136%] bg-white shadow border border-gray-200 rounded"
                  >
                    <td className="px-4 py-2 border-l-2 border-gray-400">
                      {index + 1 + (currentPage - 1) * 3}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatToIndianDate(task.dueDate)}
                    </td>
                    <td className="px-4 py-2 border">{task.taskName}</td>
                    <td className="px-4 py-2 border">{task.description}</td>
                    <td className="px-4 py-2 border relative">
                      <button
                        type="button"
                        onClick={(e) => toggleDropdown(index, e)}
                        className="text-gray-500"
                      >
                        ⋮
                      </button>

                      {openId === index && (
                        <div className="absolute right-0 top-full mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(task._id);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(task._id);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        task={singleTask}
        isEdit={isEdit}
        onSave={handleSaveTask}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TaskManagement;
