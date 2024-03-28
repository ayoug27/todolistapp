import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faPenToSquare, faSquareCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import "./TaskItem.css";

/**
 * TaskItem is a functional component that renders a single task item.
 * It displays the task title, due date, and a set of buttons for task operations.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the task.
 * @param {string} props.date - The due date of the task.
 * @param {boolean} props.isDone - The completion status of the task.
 * @param {Function} props.checkFunction - The function to call when the check button is clicked.
 * @param {Function} props.removeFunction - The function to call when the remove button is clicked.
 * @param {Function} props.editFunction - The function to call when the edit button is clicked.
 * @param {Function} props.editCalendarFunction - The function to call when the calendar button is clicked.
 */
export default function TaskItem({title, date, isDone, checkFunction, removeFunction, editFunction, editCalendarFunction}) {

    // Determine the appropriate icon for the task's completion status
    const doneHTML = isDone ? <FontAwesomeIcon icon={faSquareCheck}/> : <FontAwesomeIcon icon={faSquare} />;

    return (
        <div className="task">
            {/* Render the check button with the appropriate icon */}
            <button className="checkButton" onClick={checkFunction}>{doneHTML}</button>
            {/* Render the task title */}
            <p><strong>{title}</strong></p>
            {/* Render the task due date */}
            <p>à faire pour : {date}</p>
            <div className="secondaryButtons">
                {/* Render the remove, edit, and calendar buttons */}
                <button className="button" onClick={removeFunction}><FontAwesomeIcon icon={faTrash} /></button>
                <button className="button" onClick={editFunction}><FontAwesomeIcon icon={faPenToSquare}/></button>
                <button className="button" onClick={editCalendarFunction}><FontAwesomeIcon icon={faCalendar}/></button>
            </div>
        </div>
    );
}