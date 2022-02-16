import { IconButton, ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import { shadows } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { doc, deleteDoc} from "firebase/firestore";
import { db } from '../firebase'
import { useRouter } from "next/router";

const Todo = ({ id, title, detail }) => {
    const router = useRouter();

    const deleteTodo = async (id,e) => {
        e.stopPropagation();
        const docRef = doc (db, "todos", id );
        await deleteDoc (docRef)
    }
    const seeMore = (id, e) => {
        e.stopPropagation();
        router.push(`/todos/${id}`)
    }

    return ( 
        <ListItem onClick={() => { id, title, detail }}
            sx={{ mt: 3, boxShadow:3 }}
            style={{ backgroundColor: '#FAFAFA' }}
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteTodo(id, e)} >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={e => seeMore(id, e)} >
                        <MoreVertIcon />
                    </IconButton>
                </>
            }
        >
            <ListItemText
                primary={ title }
                secondary={ detail }
            />
        </ListItem>
     );
}
 
export default Todo;