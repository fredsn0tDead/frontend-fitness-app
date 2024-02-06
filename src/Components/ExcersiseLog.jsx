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
} from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { useEffect } from 'react';
import { styled } from '@mui/system';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const ExcersiseLog = () => {
 const location = useLocation();
  const { displayName, email, uid } = location.state || {};
  const [user, setUser] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

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
    },
  }));

  const StyledTextField = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: '20px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%', // Reduce the width for larger screens
      marginRight: '10px', // Add space between textfields
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

    const jsonData = JSON.stringify(tableData);

    if (user && uid) {
      try {
        await axios.post('http://127.0.0.1:5000/submit-form', jsonData, {
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
                    <Stack direction="column" alignItems="flex-start">
                      <StyledH2>Exercise</StyledH2>
                      {tableData.map((row) => (
                        <StyledTextField
                          key={`exercise-${row.id}`}
                          name="exercise"
                          value={row.exercise}
                          onChange={(e) => handleInputChange(row.id, 'exercise', e.target.value)}
                        />
                      ))}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start">
                      <StyledH2>Weight (Pounds)</StyledH2>
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
                      <Button variant="outlined" onClick={addRow}>
                        Add Row
                      </Button>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" alignItems="flex-start">
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
                    <Button variant="contained" type="submit" style={{ marginLeft: '1px' }}>
                      Save
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