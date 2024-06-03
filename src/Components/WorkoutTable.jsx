import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, } from '@mui/material';
import { useState,useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
const StyledTableCell = styled(TableCell) ({


    fontWeight: 'bold',
    fontFamily: "Fjalla One",
    fontSize: '15px',
    color: 'black',
});
const StyledTableCellData = styled(TableCell) ({


   
    fontFamily: "Fjalla One",
    fontSize: '10px',
    color: 'black',
});



//functnoi
// function createRows(data){
//     const rows = [];
//     for (let i = 0; i < data.length; i++) {
//         rows.push(createData(data[i].exercise, data[i].weight, data[i].reps, data[i].sets, data[i].rpe));
//     }
//     return rows;
    
// }

  
export const WorkoutTable = ({data,handleDateChange}) => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setSnackbarOpen(false);
    };
    const { uid } = location.state || {};
    useEffect(() => {
        const auth = getAuth();
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
       console.log('data',data)
    

      const [editedData, setEditedData] = useState(Array.isArray(data) ? data.map(entry => ({
        ...entry,
        Workoutdata: entry.Workoutdata.map(workout => ({ ...workout })),
    })) : []);
    // Function to handle editing of a specific workout entry
    
    // useEffect(() => {
    //     // Reset editedData whenever there's new data or a refresh is requested
    //     if (Array.isArray(data)) { 
    //       setEditedData(data.map(entry => ({
    //         ...entry,
    //         Workoutdata: entry.Workoutdata.map(workout => ({ ...workout })),
    //       })));
    //     } else {
    //       setEditedData([]); // Ensure editedData is empty if no data is available
    //     }
    //   }, [data, shouldRefresh]); 
    
      // ... rest of your component (functions, JSX) 
    
    
      // ... rest of your component (functions, JSX) 
    

    const handleEdit = (entryIndex, workoutIndex, field, value) => {
        const newData = [...editedData];
        newData[entryIndex].Workoutdata[workoutIndex][field] = value;
        setEditedData(newData);
    };
    const handleDelete = async (exerciseId) => {
        try {
            // Make a DELETE request to the Flask backend
            await axios.delete(`http://127.0.0.1:5000/delete_exercise_data/${exerciseId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${await user.getIdToken(false)}`,
                },
            });

            setEditedData(prevData => {
                // Remove the entry from the data array
                const newData = prevData.map(entry => ({
                    ...entry,
                    Workoutdata: entry.Workoutdata.filter(workout => workout.id !== exerciseId)
                }));
    
                // Remove the entry from the rows array if it exists
             
            });
            setSnackbarMessage('Exercise has been removed');
            setSnackbarOpen(true);
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
    <TableContainer component={Paper} sx={{fontWeight:'bold',fontFamily: "Fjalla One"}}>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
    <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
        {snackbarMessage}
    </MuiAlert>
</Snackbar>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Excerise Name </StyledTableCell>
            <StyledTableCell  >Weight(Ibs)</StyledTableCell>
            <StyledTableCell >Reps&nbsp;</StyledTableCell>
            <StyledTableCell >Sets&nbsp;</StyledTableCell>
            <StyledTableCell >RPE&nbsp;</StyledTableCell>
            <StyledTableCell >Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
                    {editedData.map((entry, entryIndex) => (
                        
                        entry.Workoutdata && entry.Workoutdata.map((workout, workoutIndex) => (
                            <TableRow key={`${entryIndex}-${workoutIndex}`}>
                                
                                <StyledTableCellData>{workout.exercise}</StyledTableCellData>
                              
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
                                <TableCell >
                                    <TextField
                                        type="text"
                                        value={workout.rpe}
                                        onChange={e => handleEdit(entryIndex, workoutIndex, 'rpe', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell  sx={{ paddingLeft: '5px' }}>
                                    <Button variant='outlined' onClick={() => handleDelete(entry._id)} sx={{padding: '10px', margin: '10px',}}>Delete </Button>
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
