import React, { useState } from 'react'
import {Box , Typography,Link,Grid} from '@mui/material'
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import {Table} from '@mui/material';
import {TableBody} from '@mui/material';
import {TableCell} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableRow} from '@mui/material';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
export const ExcersiseLog = () => {
    const location = useLocation();
    const {displayName, email, uid} =  location.state || {};
    const [user, setUser] = useState(null);
    console.log('Exercise Log component rendering...');
     console.log('User info:', displayName, email, uid);
     
    useEffect(() => {
      const auth = getAuth();
  
      // Use onAuthStateChanged to listen for changes in authentication state
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user); // Update the user state when authentication state changes
      });
  
      return () => {
        unsubscribe(); // Clean up the listener when the component unmounts
      };
    }, []);
  // const { displayName, email, uid } = location.state || {}; // Get the user object passed as state from the Login component
  
    const[tableData,setTableData] = useState([
    {id:1,excerise:'',sets:'',reps:'',weight:'',rpe:''}

])
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const jsonData = JSON.stringify(tableData);
    console.log(jsonData);
    console.log(tableData);
    
    if (user && uid) {
      try {
    
      // Make a POST request to the Flask backend
      await axios.post('http://127.0.0.1:5000/submit-form', jsonData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${await user.getIdToken()}`
          },
          });
    } catch (error) {
      console.error('Error storing data:', error);
    } 
  }
 } ;



const addRow = () => {// Dynamically add rows to the table
    const newRow = {id:tableData.length+1,excerise:'',sets:'',reps:'',weight:'',rpe:''};
    setTableData([...tableData,newRow])
}
const removeRow = (id) => { // Dynamically remove rows from the table
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
  };
  const handleInputChange = (id, field, value) => {
    const updatedData = tableData.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setTableData(updatedData);
  };

  return (
    
    <div name='exerciselog'>
      
  
      <Button variant="outlined" onClick={addRow}>Add Row</Button>
      <form method='POST' onSubmit={handleSubmit}>
      <Table name='excersiselog'>
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Sets</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>RPE</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <TextField
                  name='excersise'
                  value={row.exercise}
                  onChange={(e) => handleInputChange(row.id, 'exercise', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                 name='weight'
                  type="number"
                  value={row.weight}
                  onChange={(e) => handleInputChange(row.id, 'weight', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                 name='sets'
                  type="number"
                  value={row.sets}
                  onChange={(e) => handleInputChange(row.id, 'sets', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name='reps'
                  type="number"
                  value={row.reps}
                  onChange={(e) => handleInputChange(row.id, 'reps', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name='rpe'
                  value={row.rpe}
                  onChange={(e) => handleInputChange(row.id, 'rpe', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => removeRow(row.id)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Button variant="contained" type='submit'>Save</Button>
      </Table>
      </form>
    </div>
  )
}
