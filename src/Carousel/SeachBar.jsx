import React from 'react'
import { TextField,Autocomplete } from '@mui/material'

export const SeachBar = () => {
    const [exercise, setExercise] = useState([]);
    const [excersiseOption, setExcersiseOption] = useState([]);
    useEffect(() => {
        // Define the async function inside useEffect and call it immediately
        const getExercise = async () => {
            try {
            const response = await fetchData(excersiselist[1].name);
            setExercise(response);
            console.log(exercise);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
            
        };
        
        getExercise();
        }
        , [exercise]);
  
    return 
(


    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" />}
    />


  )
}
