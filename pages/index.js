import { Avatar, Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuth } from "../Auth";
import TodoForm from "../comps/TodoForm";
import TodoList from "../comps/TodoList";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { verifyIdToken } from "../FirebaseAdmin";
import { getDocs } from "firebase/firestore";
import nookies from 'nookies';
import { createContext } from "react";

export const TodoContext = createContext(null);

export default function Home( { todosProps } ) {
   const { currentUser } = useAuth();
   const [todo, setTodo] = useState({ title: '', detail: '' })
   const [open, setOpen] = useState(false);
   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };

   return (
      <TodoContext.Provider value={{ todo, setTodo }}>
         <Container maxWidth="sm" >
            <Box sx={{
               display: "flex",
               justifyContent: "space-between",
               p: 2}}
               mt={3}
            >
               <IconButton onClick={() => auth.signOut()}>
                  <Avatar src={currentUser.photoURL} />
               </IconButton>
               <Typography variant="h5" >
                  {currentUser.displayName}
               </Typography>
            </Box>
            <TodoForm />
            <TodoList todosProps={todosProps} />
         </Container>
      </TodoContext.Provider>
   )
}

export async function getServerSideProps(context) {
   try {
      const cookies = nookies.get(context);
      const token = await verifyIdToken(cookies.token);
      const { email } = token;
      const collectionRef = collection(db, "todos")
      constq = query(collectionRef, where ("email", "==" , email));
      const querySnapshot = await getDocs(q);
      let todos = [];
      querySnapshot.forEach((doc) => {
         todos.push ({...doc.data(), id: doc.id });
      })
      return {
          props: {
             todosProps: JSON.stringify(todos) || [],
          }
      };
   } catch ( error) {
      return { props: {}};
   }
   
}