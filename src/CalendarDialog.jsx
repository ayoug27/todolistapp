import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input} from "@mui/material";
import Calendar from "react-calendar";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
function CalendarDialog({isOpened, handleCloseFunction, editCalendarTaskFunction}) {
    const [date, onChange] = useState(new Date());

    return (
        <Dialog open={isOpened} onClose={handleCloseFunction}>
            <DialogTitle>Modifier le Calendrier</DialogTitle>
            <form onSubmit={editCalendarTaskFunction}>
                <DialogContent>
                    <Calendar minDate={new Date()} onChange={onChange} value={date} />
                    <Input type="hidden" name="date" value={date.toLocaleDateString('fr-FR')}></Input>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Modifier</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default CalendarDialog;