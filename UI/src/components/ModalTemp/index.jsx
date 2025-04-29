import { useEffect, useState } from "react";

export default function TaskModal({ task, isEdit, isOpen, onClose, onSave }) {
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
}
