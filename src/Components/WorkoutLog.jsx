import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px', // Adjust the margin as needed
});


const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  borderRadius: theme.spacing(1.5),
  width: '125%', // Increase the width as needed
  overflow: 'auto', // Enable overflow handling
  background: '#8e44ad',
  color: 'white',
  fontWeight: 'bold',
  animation: '$slideInOut 0.5s ease-out',
  borderCollapse: 'collapse',
}));

const StyledCardContent = styled(CardContent)({
  paddingTop: 0,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'right',
  '& table': {
    width: '100%',
    margin: 'auto',
    borderCollapse: 'collapse',
    padding: '8px', // Add padding to both ends
  },
  '& th, & td': {
    padding: '8px', // Adjust the padding as needed
    textAlign: 'center',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    color: 'white',
  },
  '& td:hover, & th:hover': {
    backgroundColor: '#3498db', // Change to your preferred hover color
    borderRadius: '4px', // Adjust the border-radius as needed
  },
});

const StyledTable = styled(Table)({
  width: '100%',
  
  color: 'white',
  fontWeight: 'bold',
  borderCollapse: 'collapse',
  '& th, & td': {
    border: 'none',
  },
});
const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  color: 'white',
  '& .MuiCardHeader-subheader': {
    color: 'white', // Set subheader color to white
  },
  '&:hover': {
    backgroundColor: '#3498db',
    borderRadius: '8px',
  },
}));


let id = 0;

function createData(name, reps, sets, weight, rpe) {
  id += 1;
  return { id, name, reps, sets, weight, rpe };
}

export const WorkoutLog_Card = ({ workoutdata, selecteddate,className, onDelete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const datestring = JSON.stringify(selecteddate);
  const formatedate = datestring.slice(1, 11);
  const [name,setName] = useState([]);
  const [weight,setWeight] = useState([]);
  
  
  useEffect(() => {
    // Initialize empty arrays for name and weight
    const initialNames = [];
    const initialWeights = [];

    if (Array.isArray(workoutdata)) {
      workoutdata.forEach((item) => {
        const exercises = JSON.parse(item.exercises);

        exercises.forEach((exercise) => {
          initialNames.push(exercise.exercise);
          initialWeights.push(exercise.weight);
        });
      });
    }

    // Update the state
    setName(initialNames);
    setWeight(initialWeights);
    console.log('name',name);
    console.log('weight',weight);
  }, [workoutdata]); // Run the effect when workoutdata changes

  // ... (rest of your component code)


  

  if (!Array.isArray(workoutdata)) {
    return <p>No workout data available for {formatedate}.</p>;
  }

  return (
    <Container>
    <StyledCard >
    <StyledCardHeader title={'Exercise Log'} subheader={formatedate} />
      <StyledCardContent>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell align="left">Reps</TableCell>
              <TableCell align="left">Sets</TableCell>
              <TableCell align="left">Weight</TableCell>
              <TableCell align="left">RPE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              workoutdata.map((item, index) => {
                const exercises = JSON.parse(item.exercises);

                return (
                  <React.Fragment key={index}>
                    {exercises.map((exercise, exerciseIndex) => (
                      
                      console.log('name',name),
                      <TableRow key={exerciseIndex}>
                        <TableCell align="left">{exercise.exercise}</TableCell>{/*add a button */}
                        <TableCell align="left">{exercise.sets}</TableCell>
                        <TableCell align="leftt">{exercise.reps}</TableCell>{/*add a button get all the reps over time */}
                        <TableCell align="left">{exercise.weight}</TableCell>
                        <TableCell align="left">{exercise.rpe}</TableCell>
                        <Button className='delete-button' variant="contained"onClick={() => onDelete(item._id)}>Delete</Button>
                      </TableRow>
                    ))}
                  </React.Fragment>
                );
              })}
          </TableBody>
        </StyledTable>
      </StyledCardContent>
    </StyledCard>
    </Container>
  );
};