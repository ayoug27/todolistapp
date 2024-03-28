import TaskItem from "./TaskItem.jsx";
import {useEffect, useState} from "react";
import AddTaskInputDialog from "./AddTaskInputDialog.jsx";
import EditTaskInputDialog from "./EditTaskInputDialog.jsx";
import CalendarDialog from "./CalendarDialog.jsx";
import './ToDoListApp.css'

export default function ToDoListApp() {
  const [tasks,setTasksState] = useState(JSON.parse(localStorage.getItem('tasks')));

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openCalendarDialog, setOpenCalendarDialog] = useState(false);


  const [openedTaskID, setOpenedTaskID] = useState();

  useEffect(() => {
      localStorage.setItem('tasks',JSON.stringify(tasks))
  });

  const openEditTaskDialog = (id) => {
      setOpenedTaskID(id);
      setOpenEditDialog(true);
  }

  const openCalendarTaskDialog = (id) => {
        setOpenedTaskID(id);
        setOpenCalendarDialog(true);
  }

  const openAddTaskDialog = () => setOpenAddDialog(true);

  const checkTask = (id) => {
      const updatedTasks = tasks.map((task, index) => {
          if (index === id)
              return { ...task, isDone: !task.isDone };
          return task;
      });
      setTasksState(updatedTasks);
  };

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

  const removeTask = (id) => {
      const updatedTasks = tasks.filter((task,index) =>
          index !== id
      );
      setTasksState(updatedTasks);
  };

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