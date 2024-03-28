// eslint-disable-next-line react/prop-types
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input} from "@mui/material";
import Calendar from "react-calendar";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export default function AddTaskInputDialog({isOpened, handleCloseFunction, addTaskFunction}) {
    const [date, onChange] = useState(new Date());

    return (
        <Dialog open={isOpened} onClose={handleCloseFunction}>
            <DialogTitle>Ajouter une tâche</DialogTitle>
            <form onSubmit={addTaskFunction}>
                <DialogContent>
                    <Input required placeholder="Titre de la tâche" name="name"/>
                    <br/>
                    <Input type="hidden" name="date" value={date.toLocaleDateString('fr-FR')}></Input>
                    <Calendar minDate={new Date()} onChange={onChange} value={date} />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Ajouter</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
