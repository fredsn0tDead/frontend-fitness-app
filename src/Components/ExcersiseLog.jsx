import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { styled } from '@mui/system';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import excerNames from './exercise_names_C.json';

export const ExcersiseLog = () => {
 const location = useLocation();
  const { displayName, email, uid } = location.state || {};
  const [user, setUser] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [exerciseNames] = useState(excerNames);

  // useEffect(() => {
  //   const loadExerciseNames = async () => {
  //     try {
  //       const response = await fetch('Movie.json');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
        
  //       const data = await response.json();
  //       setExerciseNames(data);
  //       console.log('Exercise Names:', data);
  //       console.log('Exercise Names:', exerciseNames);
  //     } catch (error) {
  //       console.error('Error loading exercise names:', error);
  //     }
  //   };
  //   console.log('Excersise Names',exerciseNames)
  //   loadExerciseNames();
  // }, []);
 

  console.log('Exercise Log component rendering...');
  console.log('User info:', displayName, email, uid);

  const StyledTable = styled(Table)({
    borderCollapse: 'collapse',
    '& th, & td': {
      border: 'none',
    },
  });

  const StyledH2 = styled('h2')(() => ({
    fontFamily: 'Fjalla One',
    color: '#141313',
    margin: 0,
    marginLeft:0,
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      marginBottom: '10px',
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: '10px', // Add margin between textfields
      marginRight: '0px', // Add margin between textfields
    },
  }));

  const StyledTextField = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: '20px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('md')]: {
      width: '90%', // Reduce the width for larger screens
      marginRight: '0px', // Add space between textfields
      marginBottom: '20px',
      marginTop: '20px',
    },
  }));
const StyledAutoField = styled(Autocomplete)(({ theme }) => ({  
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: '20px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%', // Reduce the width for larger screens
      marginRight: '0px', // Add space between textfields
      marginBottom: '20px',
      marginTop: '20px',
    },
  }));
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [tableData, setTableData] = useState([
    { id: 1, exercise: '', sets: '', reps: '', weight: '', rpe: '' },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', tableData.map((row) => row.exercise));//we want to store the weights and reps in the database
    const execersiseNameData = (tableData.map((row) => row.exercise));
    console.log(execersiseNameData)
    if (user && uid) {
      try {
        await axios.post('http://127.0.0.1:5000/submit-form',{
          data: tableData,  // The original table data
          exerciseNames: execersiseNameData  // The exercise names
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${await user.getIdToken()}`,
          },
        });

        setSubmissionStatus('success');
      } catch (error) {
        console.error('Error storing data:', error);
        setSubmissionStatus('failure');
      }
    }
  };

  const addRow = () => {
    const newRow = { id: tableData.length + 1, exercise: '', sets: '', reps: '', weight: '', rpe: '' };
    setTableData([...tableData, newRow]);
  };

  const removeRow = (id) => {
    if (tableData.length === 1) {
      console.log('Cannot remove the last row.');
      return;
    }

    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = tableData.map((row) => (row.id === id ? { ...row, [field]: value } : row));
    setTableData(updatedData);
  };

  return (
    <div name="exercise-log">
      <Box sx={{ paddingTop: '10px' }}>
        <form method="POST" onSubmit={handleSubmit}>
          <StyledTable>
            <Table name="exercise-log">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start" marginLeft='240px'>
                      <StyledH2>Exercise</StyledH2>
                      {tableData.map((row) => (
                        <StyledAutoField
                        freeSolo // Allow typing values not in options
                        options={exerciseNames.excerNames.map(name=>name.toUpperCase())}//added excerNames allows me to access the values from th key excerNames
                        autoHighlight  
                        key={`exercise-${row.id}`}
                        name="exercise"
                        value={row.exercise}
                        onChange={(event, value) => {
                          handleInputChange(row.id, 'exercise', value); 
                        }}
                        
                        renderInput={(params) => (
                          <TextField {...params} label="Search Exercises" 
                          />
                        )}
                      />
                      ))}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start">
                      <StyledH2>Weight (Ibs)</StyledH2>
                      {tableData.map((row) => (
                        <StyledTextField
                          key={`weight-${row.id}`}
                          name="weight"
                          type="number"
                          value={row.weight}
                          onChange={(e) => handleInputChange(row.id, 'weight', e.target.value)}
                        />
                      ))}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start">
                      <StyledH2>Sets</StyledH2>
                      {tableData.map((row) => (
                        <StyledTextField
                          key={`sets-${row.id}`}
                          name="sets"
                          type="number"
                          value={row.sets}
                          onChange={(e) => handleInputChange(row.id, 'sets', e.target.value)}
                        />
                      ))}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start">
                      <StyledH2>Reps</StyledH2>
                      {tableData.map((row) => (
                        <StyledTextField
                          key={`reps-${row.id}`}
                          name="reps"
                          type="number"
                          value={row.reps}
                          onChange={(e) => handleInputChange(row.id, 'reps', e.target.value)}
                        />
                      ))}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start">
                      <StyledH2>RPE</StyledH2>
                      {tableData.map((row) => (
                        <StyledTextField
                          key={`rpe-${row.id}`}
                          name="rpe"
                          value={row.rpe}
                          onChange={(e) => handleInputChange(row.id, 'rpe', e.target.value)}
                        />
                      ))}
                    </Stack>
                  </StyledTableCell>
                 
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start">
                      <Button variant="outlined" onClick={addRow} style={{marginTop:10}}>
                        Add Row
                      </Button>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start" style={{marginTop:10}}>
                      <Button variant="contained" onClick={() => removeRow(tableData.length)}>
                        Remove
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    <Button variant="contained" type="submit" style={{marginLeft:'240px' }}>
                      Record
                    </Button>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTable>
        </form>
      </Box>
      {submissionStatus && (
        <Typography color={submissionStatus === 'success' ? 'success' : 'error'}>
          {submissionStatus === 'success' ? 'Workout saved successfully!' : 'Failed to save workout.'}
        </Typography>
      )}
    </div>
  );
};