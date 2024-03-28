import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input} from "@mui/material";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export default function EditTaskInputDialog({isOpened, handleCloseFunction, editTaskFunction}) {
    const [date, onChange] = useState(new Date());

    return (
        <Dialog open={isOpened} onClose={handleCloseFunction}>
            <DialogTitle>Ajouter une tâche</DialogTitle>
            <form onSubmit={editTaskFunction}>
            <DialogContent>
                <Input placeholder="Nouveau titre" name="name"></Input>
                <Input type="hidden" name="date" value={date.toLocaleDateString('fr-FR')}></Input>
                <Calendar minDate={new Date()} onChange={onChange} value={date} />
            </DialogContent>
            <DialogActions>
                    <Button onClick={handleCloseFunction}>Annuler</Button>
                    <Button type="submit">Modifier</Button>
            </DialogActions>
            </form>
        </Dialog>
    );
}