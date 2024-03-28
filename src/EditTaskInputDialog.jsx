import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input} from "@mui/material";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useState} from "react";

/**
 * EditTaskInputDialog is a functional component that renders a dialog for editing a task.
 * It includes a form with an input for the new task title, a hidden input for the task date, and a calendar for date selection.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isOpened - Whether the dialog is open.
 * @param {Function} props.handleCloseFunction - The function to call when the dialog is closed.
 * @param {Function} props.editTaskFunction - The function to call when the form is submitted.
 */
export default function EditTaskInputDialog({isOpened, handleCloseFunction, editTaskFunction}) {
    // State for the selected date, initialized to the current date
    const [date, onChange] = useState(new Date());

    return (
        <Dialog open={isOpened} onClose={handleCloseFunction}>
            <DialogTitle>Ajouter une tâche</DialogTitle>
            <form onSubmit={editTaskFunction}>
                <DialogContent>
                    {/* Input for the new task title */}
                    <Input placeholder="Nouveau titre" name="name"></Input>
                    {/* Hidden input for the task date, value is the selected date in 'fr-FR' locale */}
                    <Input type="hidden" name="date" value={date.toLocaleDateString('fr-FR')}></Input>
                    {/* Calendar for date selection, minimum date is the current date */}
                    <Calendar minDate={new Date()} onChange={onChange} value={date} />
                </DialogContent>
                <DialogActions>
                    {/* Cancel button for the form, closes the dialog */}
                    <Button onClick={handleCloseFunction}>Annuler</Button>
                    {/* Submit button for the form */}
                    <Button type="submit">Modifier</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}