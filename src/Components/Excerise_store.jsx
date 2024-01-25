//WE want to create a page where we enter the name of the excersise and have it stored in our database
//Enter the name of the excersise, Excersise type, description
// Three text boxes
//Api call to axios where the excerise is stored then clean the data so I can extract the three pieces of information
//We really only want the gif url from this website
// Enter "Bench Press" Enter "LB" Enter "Description"
//First text box will ultimately query and return the information of the excerise to be stored which will have the gif
// Need to create a function to extract the gif information from the api call so i can store it in the database just the gif
//Recall Gif information disappears after a certain period 
//Should i manually download the cooresponding gif and store it in the database???????
//Second text box will be the type of excerise which I will lable LB, GB or NB
//Third text box will be the description of the excerise I must manually enter in order to store in the database
//This is a Tedious Process I must do 24 times for this application to work
//The final step is to store the excerise name + gif, excerise type, and excerise description in the database after they have all been extracted
//Think of a way to download all the gifs at once and store them in the database
import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchData, fetchData1 } from '../utils/fetch';

export const Excerise_store = () => {

  const [exerciseName, setExerciseName] = useState('');
  const [excersiseID, setExcersiseID] = useState('');
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseGif, setExerciseGif] = useState('');

  

  useEffect(() => {
    // Fetch exercise options when exerciseName changes
    const fetchExerciseOptions = async () => {
      try {
        const data = await fetchData(exerciseName).then((response) => setExerciseOptions(response));
        console.log(data);
        console.log(exerciseOptions);
      } catch (error) {
        console.error('Error fetching exercise options:', error);
      }
    };

    if (exerciseName) {
      fetchExerciseOptions();
    }
  }, [exerciseName]);
const handleExerciseSelect = (gifurl) => {
  setSelectedExercise(gifurl);
  setExerciseGif(gifurl); // Make sure to replace 'gifLink' with the actual property in your API response
};
  

  return (
    <div>
      {/* Add a text box for exercise type */}
      <TextField
        label="Exercise Type"
        variant="outlined"
        onChange={(e) => {/* Set the exercise type in state */}}
      />
       <Autocomplete
        options={exerciseOptions}
        getOptionLabel={(option) => option.name || ''}  
        onChange={(event, newValue) => handleExerciseSelect(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Exercise Name"
            variant="outlined"
            onChange={(e) => setExerciseName(e.target.value)}
          />
        )}
      />
       
       

      {selectedExercise && (
        <>
          <Button variant="contained" >
            Download GIF
          </Button>
          <Button variant="contained" >
            Submit to Database
          </Button>
        </>
      )}

     

    </div>
  )
}
