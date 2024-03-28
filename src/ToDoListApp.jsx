import TaskItem from "./TaskItem.jsx";
import {useEffect, useState} from "react";
import AddTaskInputDialog from "./AddTaskInputDialog.jsx";
import EditTaskInputDialog from "./EditTaskInputDialog.jsx";
import CalendarDialog from "./CalendarDialog.jsx";
import './ToDoListApp.css'

/**
 * ToDoListApp is a functional component that renders a to-do list application.
 * It manages the state of the tasks, and the state of the dialogs for adding, editing, and changing the date of tasks.
 * It also handles the functions for opening the dialogs, checking a task, editing a task, editing a task's date, adding a task, and removing a task.
 */
export default function ToDoListApp() {
  // State for the tasks, initialized to the tasks in local storage
  const [tasks,setTasksState] = useState(JSON.parse(localStorage.getItem('tasks')));

  // State for whether the edit task dialog is open
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // State for whether the add task dialog is open
  const [openAddDialog, setOpenAddDialog] = useState(false);
  // State for whether the edit task date dialog is open
  const [openCalendarDialog, setOpenCalendarDialog] = useState(false);

  // State for the ID of the task being edited or having its date changed
  const [openedTaskID, setOpenedTaskID] = useState();

  // Effect for storing the tasks in local storage whenever they change
  useEffect(() => {
      localStorage.setItem('tasks',JSON.stringify(tasks))
  });

  // Function for opening the edit task dialog
  const openEditTaskDialog = (id) => {
      setOpenedTaskID(id);
      setOpenEditDialog(true);
  }

  // Function for opening the edit task date dialog
  const openCalendarTaskDialog = (id) => {
        setOpenedTaskID(id);
        setOpenCalendarDialog(true);
  }

  // Function for opening the add task dialog
  const openAddTaskDialog = () => setOpenAddDialog(true);

  // Function for checking a task
  const checkTask = (id) => {
      const updatedTasks = tasks.map((task, index) => {
          if (index === id)
              return { ...task, isDone: !task.isDone };
          return task;
      });
      setTasksState(updatedTasks);
  };

  // Function for editing a task
  const editTask = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newTaskName = formData.get('name');
      const date = formData.get("date");
      console.log(newTaskName);
      const updatedTasks = tasks.map((task,index) => {
          if (index !== openedTaskID) return task;
          else return {title: newTaskName, date: date, isDone: task.isDone};
      });
      setTasksState(updatedTasks);
      setOpenEditDialog(false);
  }

  // Function for editing a task's date
  const editCalendarTask = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const date = formData.get("date");
      const updatedTasks = tasks.map((task,index) => {
          if (index !== openedTaskID) return task;
          else return {title: task.title, date: date, isDone: task.isDone};
      });
      setTasksState(updatedTasks);
      setOpenCalendarDialog(false);
  }

  // Function for adding a task
  const addTask = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskName = formData.get('name');
        const date = formData.get("date");
        const task = {title: taskName, date: date, isDone: false};
        console.log(task);
        setTasksState([...tasks, task]);
        setOpenAddDialog(false);
  };

  // Function for removing a task
  const removeTask = (id) => {
      const updatedTasks = tasks.filter((task,index) =>
          index !== id
      );
      setTasksState(updatedTasks);
  };

  // Render the to-do list application
  return (
    <div className="container">
      <EditTaskInputDialog isOpened={openEditDialog} handleCloseFunction={() => setOpenEditDialog(false)} editTaskFunction={editTask}></EditTaskInputDialog>
      <AddTaskInputDialog isOpened={openAddDialog} handleCloseFunction={() => setOpenAddDialog(false)} addTaskFunction={addTask}/>
      <CalendarDialog isOpened={openCalendarDialog} handleCloseFunction={() => setOpenAddDialog(false)} editCalendarTaskFunction={editCalendarTask}/>
      <button onClick={openAddTaskDialog}>Ajouter une tâche</button>
      {
          tasks.map((task, id) => (
              <TaskItem key={id} title={task.title} date={task.date} isDone={task.isDone} checkFunction={() => checkTask(id)} removeFunction={() => removeTask(id)} editFunction={() => openEditTaskDialog(id)} editCalendarFunction={() => openCalendarTaskDialog(id)}/>
          ))
      }
    </div>
  )
}