import { useState } from "react";

export default function TaskModal({ isOpen, onClose, onSave }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSave = () => {
    onSave({ taskName, description, dueDate });
    setTaskName("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add Task</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Task Name"
            className="w-full p-3 bg-gray-100 rounded-md"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 bg-gray-100 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />

          <input
            type="date"
            placeholder="Date Picker"
            className="w-full p-3 bg-gray-100 rounded-md"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={handleSave}
            className="w-32 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-full"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
