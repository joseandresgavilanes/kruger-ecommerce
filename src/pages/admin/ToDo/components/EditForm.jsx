import { useState, useEffect } from "react";

// library imports

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

  useEffect(() => {
    const closeModalIfEscaped = (e) => {
      e.key === "Escape" && closeEditMode();
    };

    window.addEventListener("keydown", closeModalIfEscaped);

    return () => {
      window.removeEventListener("keydown", closeModalIfEscaped);
    };
  }, [closeEditMode]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTask({ ...editedTask, name: updatedTaskName });
  };

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => {
        e.target === e.currentTarget && closeEditMode();
      }}
    >
      <form className="todo_todo" onSubmit={handleFormSubmit}>
        <div className="todo_wrapper">
          <input
            type="text"
            id="editTask"
            className="todo_input"
            value={updatedTaskName}
            onInput={(e) => setUpdatedTaskName(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Task"
          />
          <label htmlFor="editTask" className="todo_label">
            Update
          </label>
        </div>
        <button
          className="todo_btn"
          aria-label={`Confirm edited task to now read ${updatedTaskName}`}
          type="submit"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </form>
    </div>
  );
};
export default EditForm;
