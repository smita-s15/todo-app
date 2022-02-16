import { collection, doc, docs, onSnapshot, getDocs, query, querySnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { db } from "../firebase";
import Todo from "./Todo";


const TodoList = ( {todosProps} ) => {
    const [todos, setTodos] = useState([])

    const { currentUser } = useAuth();

    useEffect(() => {
        const collectionRef = collection(db, "todos")

        const q = query(collectionRef );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setTodos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        });
        return unsubscribe;
    }, [])

    return (
        <div>
            {todos.map(todo => <Todo key={todo.id}
                id={todo.id}
                title={todo.title}
                detail={todo.detail}
            />)}
        </div>
    );
}

export default TodoList;