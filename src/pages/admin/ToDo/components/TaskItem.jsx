import { useState } from "react";

// styles
import styles from "./TaskItem.module.css";

const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
  const [isChecked, setIsChecked] = useState(task.checked);

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    toggleTask(task.id);
  };

  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onChange={handleCheckboxChange}
          name={task.name}
          id={task.id}
        />
        <label htmlFor={task.id} className={styles.label}>
          {task.name}
          <p className={styles.checkmark}>
            <i class="fa-solid fa-check"></i>{" "}
          </p>
        </label>
      </div>
      <div className={styles["task-group"]}>
        <button
          className="todo_btn"
          aria-label={`Update ${task.name} Task`}
          onClick={() => enterEditMode(task)}
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </button>

        <button
          className={`todo_btn ${styles.delete}`}
          aria-label={`Delete ${task.name} Task`}
          onClick={() => deleteTask(task.id)}
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
};
export default TaskItem;
