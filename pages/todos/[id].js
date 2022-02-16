import { async } from "@firebase/util";
import {  Grid, Typography } from "@mui/material";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import React from 'react'
import Link from "next/link";


const Detail = ({todoProps}) => {
    const todo = JSON.parse(todoProps)
    return ( 
        <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Typography mt={1}><h1 >{todo.title}</h1> </Typography>
            <Typography><h2 >{todo.detail}</h2> </Typography>
    
            <Link href="/">
            <a  type="submit" variant='contained' sx={{ mt: 3 }}>
                Go Back To Home
            </a>
            </Link>
        </Grid>
     );
}
 
export default Detail

export const getStaticPaths = async() => {
    
    const snapshot = await getDocs(collection(db, 'todos'));
    const paths = snapshot.docs.map(doc => {
        return {
            params: {id: doc.id.toString() }
        }
    })
    
    return {
        paths,
        fallback: false 
    }
}
export const getStaticProps = async (context) => {
    const id = context.params.id;

    const docRef = doc(db, "todos" , id);
    const docSnap = await getDoc(docRef);

    return {
        props: { todoProps: JSON.stringify(docSnap.data()) ||null}
    }     
}


