import React from 'react'
import { useState,useEffect } from 'react'
import cx from 'clsx';
import {Button , Card, CardActionArea,Table,TableHead,TableRow,TableCell,TableBody,CardContent,CardHeader} from '@mui/material'
// import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
// import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
// import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { styled } from '@mui/system';


const useStyles = styled(() => ({
  card: {
    marginTop: 40,
    borderRadius:12,
    transition: '0.3s',
    width: '90%',
    overflow: 'initial',
    background: '#ffffff',
  },
  content: {
    paddingTop: 0,
    textAlign: 'left',
    overflowX: 'auto',
    '& table': {
      marginBottom: 0,
    }
  },
}));

let id = 0;
function createData(name,reps,sets,weight, rpe) {
  id += 1;
  return { id, name, reps, sets, weight, rpe };
}
//I want to loop through the workout data and create a row for each exercise 
//I want to display the date at the top of the card
//I want to display the workout data in a table
//I want to display the total volume of the workout
//I want to display the total sets of the workout


export const WorkoutLog_Card = ({workoutdata,selecteddate}) => {
  
  const datestring = JSON.stringify(selecteddate)
  const formatedate = datestring.slice(1,11)
  

  const classes = useStyles();
//   const cardHeaderStyles = useContainedCardHeaderStyles();
//   const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
//   const cardHeaderShadowStyles = useFadedShadowStyles();

    
  if (!Array.isArray(workoutdata)) {
    return <p>No workout data available for {formatedate}.</p>;
  }
  return (
    <Card className={cx(classes.card)}>
      <CardHeader
        // className={cardHeaderShadowStyles.root}
        // classes={cardHeaderStyles}
        title={'Excersise Log'}
        subheader={formatedate}
      />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Excersise</TableCell>
              <TableCell align="right"> Reps</TableCell>
              <TableCell align="right">Sets</TableCell>
              <TableCell align="right"> Weight</TableCell>
              <TableCell align="right">RPE</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {workoutdata.map((item, index) => {
              const exercises = JSON.parse(item.exercises)
              
              return (
                <React.Fragment key={index}>
                {exercises.map((exercise, exerciseIndex) => (
                  <TableRow key={exerciseIndex}>
                    <TableCell align="right">{exercise.exercise}</TableCell>
                    <TableCell align="right">{exercise.sets}</TableCell>
                    <TableCell align="right">{exercise.reps}</TableCell>
                    <TableCell align="right">{exercise.weight}</TableCell>
                    <TableCell align="right">{exercise.rpe}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
              );
                })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
