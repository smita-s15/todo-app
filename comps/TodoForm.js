import { Button, TextField } from '@mui/material'
import { addDoc, collection, updateDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { useAuth } from '../Auth'
import { db } from '../firebase'


const TodoForm = () => {
  const {currentUser} = useAuth();
    const [todo, setTodo] = useState ({title: '', detail: ''});

    const onSubmit = async () => {
            const collectionRef = collection(db, "todos");
            const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email });
           await  setTodo({ title: '', detail: ''})
    }


    return (
      <form noValidate autoComplete='off' >
          <TextField 
            onChange={(e) =>setTodo ({...todo, title:e.target.value})}
            fullWidth 
            label ="title"
            variant='outlined' 
            color='secondary' 
            required 
          />
          <TextField 
            onChange={(e) =>setTodo ({...todo, detail:e.target.value})}
            fullWidth 
            label ="detail" 
            multiline maxRows={4} 
            variant="outlined"
            color='secondary'
            required
          />
          <Button onClick={onSubmit} type="submit" variant='contained' sx={{ mt: 3 }}>
            Add a new todo 
            </Button>
      </form>
    )
}
 
export default TodoForm;