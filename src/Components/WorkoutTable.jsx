import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tab } from '@mui/material';
import { useState,useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function createData(ExceriseName,id,Weight,Reps,Sets,RPE)
 {
    return { ExceriseName, id, Weight, Reps, Sets, RPE };
  }

//functnoi
// function createRows(data){
//     const rows = [];
//     for (let i = 0; i < data.length; i++) {
//         rows.push(createData(data[i].exercise, data[i].weight, data[i].reps, data[i].sets, data[i].rpe));
//     }
//     return rows;
    
// }
function createRows(data) {
    const rows = [];
    data.forEach(entry => {
        const workoutData = entry.Workoutdata;
        const id = entry._id;
        console.log('id',id)
        workoutData.forEach(workout => {
            rows.push(createData(workout.exercise, id, workout.weight, workout.reps, workout.sets, workout.rpe));
        });
    });
    return rows;
}
  
export const WorkoutTable = ({data}) => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    const { displayName, email, uid } = location.state || {};
    useEffect(() => {
        const auth = getAuth();
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
    
    console.log('data',data);
    
    const rows = createRows(data);
    console.log('rows',rows);
    const [editedData, setEditedData] = useState(data.map(entry => ({
        ...entry,
        Workoutdata: entry.Workoutdata.map(workout => ({ ...workout })),
    })));

    // Function to handle editing of a specific workout entry
    const handleEdit = (entryIndex, workoutIndex, field, value) => {
        const newData = [...editedData];
        newData[entryIndex].Workoutdata[workoutIndex][field] = value;
        setEditedData(newData);
    };
    const handleDelete = async (entryId) => {
        try {
            // Make a DELETE request to the Flask backend
            await axios.delete(`http://127.0.0.1:5000/delete_exercise_data/${entryId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${await user.getIdToken(false)}`,
                },
            });
    
            // Optionally, update the state or perform any other necessary actions
            console.log('Exercise data deleted successfully!');
        } catch (error) {
            console.error('Error deleting exercise data:', error);
        }
    };
    // Function to save the edited data
    const handleSave = async () => {
        console.log('Edited Data:', editedData);
        const execersiseNameData = editedData.map((row) => row.ExerciseName);
        if (user && uid) {
            try {
                await axios.post('http://127.0.0.1:5000/edit-form', {
                    data: editedData,
                    exerciseNames: execersiseNameData
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${await user.getIdToken()}`,
                    },
                });
                console.log('Data saved successfully');
            } catch (error) {
                console.error('Error storing data:', error);
            }

        }

        // Here you can send the edited data to your backend or update state as needed
        console.log('Edited Data:', editedData);
    };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Excerise Name </TableCell>
            
            <TableCell align='right' >Weight(Ibs)</TableCell>
            <TableCell align='right'>Reps&nbsp;</TableCell>
            <TableCell align='right'>Sets&nbsp;</TableCell>
            <TableCell align='right'>RPE&nbsp;</TableCell>
            <TableCell align='right'>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                    {editedData.map((entry, entryIndex) => (
                        entry.Workoutdata.map((workout, workoutIndex) => (
                            <TableRow key={`${entryIndex}-${workoutIndex}`}>
                                <TableCell>{workout.exercise}</TableCell>
                               
                                <TableCell>
                                    <TextField
                                        type="text"
                                        value={workout.weight}
                                        onChange={e => handleEdit(entryIndex, workoutIndex, 'weight', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="text"
                                        value={workout.reps}
                                        onChange={e => handleEdit(entryIndex, workoutIndex, 'reps', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="text"
                                        value={workout.sets}
                                        onChange={e => handleEdit(entryIndex, workoutIndex, 'sets', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="text"
                                        value={workout.rpe}
                                        onChange={e => handleEdit(entryIndex, workoutIndex, 'rpe', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant='outlined' onClick={() => handleDelete(entryIndex)} sx={{padding: '10px', margin: '10px'}}>Delete</Button>
                                </TableCell>
                                
                            </TableRow>
                        ))
                    ))}
                </TableBody>
                <Button variant='outlined' onClick={handleSave} sx={{padding: '10px', margin: '10px'


                }}>Save</Button>
      </Table>
    </TableContainer>

  )
}
