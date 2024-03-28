import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input} from "@mui/material";
import Calendar from "react-calendar";
import {useState} from "react";

/**
 * AddTaskInputDialog is a functional component that renders a dialog for adding a new task.
 * It includes a form with an input for the task title and a calendar for date selection.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isOpened - Whether the dialog is open.
 * @param {Function} props.handleCloseFunction - The function to call when the dialog is closed.
 * @param {Function} props.addTaskFunction - The function to call when the form is submitted.
 */
export default function AddTaskInputDialog({isOpened, handleCloseFunction, addTaskFunction}) {
    // State for the selected date, initialized to the current date
    const [date, onChange] = useState(new Date());

    return (
        <Dialog open={isOpened} onClose={handleCloseFunction}>
            <DialogTitle>Ajouter une tâche</DialogTitle>
            <form onSubmit={addTaskFunction}>
                <DialogContent>
                    {/* Input for the task title, required */}
                    <Input required placeholder="Titre de la tâche" name="name"/>
                    <br/>
                    {/* Hidden input for the task date, value is the selected date in 'fr-FR' locale */}
                    <Input type="hidden" name="date" value={date.toLocaleDateString('fr-FR')}></Input>
                    {/* Calendar for date selection, minimum date is the current date */}
                    <Calendar minDate={new Date()} onChange={onChange} value={date} />
                </DialogContent>
                <DialogActions>
                    {/* Submit button for the form */}
                    <Button type="submit">Ajouter</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
