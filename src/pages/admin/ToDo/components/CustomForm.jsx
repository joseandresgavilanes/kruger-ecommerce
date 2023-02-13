import { useState } from "react";

// library imports

const CustomForm = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      name: task,
      checked: false,
      id: Date.now(),
    });
    setTask("");
  };

  return (
    <form className="todo_todo" onSubmit={handleFormSubmit}>
      <div className="todo_wrapper">
        <input
          type="text"
          id="task"
          className="todo_input"
          value={task}
          onInput={(e) => setTask(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Enter Task"
        />
        <label htmlFor="task" className="todo_label">
          Enter Task
        </label>
      </div>
      <button className="todo_btn" aria-label="Add Task" type="submit">
        <i class="fa-solid fa-plus"></i>
      </button>
    </form>
  );
};
export default CustomForm;
