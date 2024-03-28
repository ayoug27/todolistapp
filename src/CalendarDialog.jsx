import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input} from "@mui/material";
import Calendar from "react-calendar";
import {useState} from "react";

/**
 * CalendarDialog is a functional component that renders a dialog for editing a task's date.
 * It includes a form with a hidden input for the task date, and a calendar for date selection.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isOpened - Whether the dialog is open.
 * @param {Function} props.handleCloseFunction - The function to call when the dialog is closed.
 * @param {Function} props.editCalendarTaskFunction - The function to call when the form is submitted.
 */
function CalendarDialog({isOpened, handleCloseFunction, editCalendarTaskFunction}) {
    // State for the selected date, initialized to the current date
    const [date, onChange] = useState(new Date());

    return (
        <Dialog open={isOpened} onClose={handleCloseFunction}>
            <DialogTitle>Modifier le Calendrier</DialogTitle>
            <form onSubmit={editCalendarTaskFunction}>
                <DialogContent>
                    {/* Calendar for date selection, minimum date is the current date */}
                    <Calendar minDate={new Date()} onChange={onChange} value={date} />
                    {/* Hidden input for the task date, value is the selected date in 'fr-FR' locale */}
                    <Input type="hidden" name="date" value={date.toLocaleDateString('fr-FR')}></Input>
                </DialogContent>
                <DialogActions>
                    {/* Submit button for the form */}
                    <Button type="submit">Modifier</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default CalendarDialog;