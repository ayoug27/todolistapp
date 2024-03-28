import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faPenToSquare, faSquareCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import "./TaskItem.css";

// eslint-disable-next-line react/prop-types
export default function TaskItem({title, date, isDone, checkFunction, removeFunction, editFunction, editCalendarFunction}) {


    const doneHTML = isDone ? <FontAwesomeIcon icon={faSquareCheck}/> : <FontAwesomeIcon icon={faSquare} />;
    return (
        <div className="task">
            <button className="checkButton" onClick={checkFunction}>{doneHTML}</button>
            <p><strong>{title}</strong></p>
            <p>à faire pour : {date}</p>
            <div className="secondaryButtons">
                <button className="button" onClick={removeFunction}><FontAwesomeIcon icon={faTrash} /></button>
                <button className="button" onClick={editFunction}><FontAwesomeIcon icon={faPenToSquare}/></button>
                <button className="button" onClick={editCalendarFunction}><FontAwesomeIcon icon={faCalendar}/></button>
            </div>
        </div>
    );
}