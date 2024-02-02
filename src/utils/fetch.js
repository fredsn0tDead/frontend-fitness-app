import axios from 'axios';

export const fetchData = async (excersise) => {
  const apiurl = `https://exercisedb.p.rapidapi.com/exercises/name/${excersise}`
  const options = {
    method: 'GET',
    url: apiurl,
    headers: {
      'X-RapidAPI-Key': '617226819dmshf904d7cf29b8ce4p1cd154jsn2ff03aff3d6f',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }

  // const response = await fetch(`${BaseUrl}${options}`);
  // const data = await response.json();
  // return data;

}
export const fetchData1 = async (id) => {
  const apiurl = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`
  const options = {
    method: 'GET',
    url: apiurl,
    headers: {
      'X-RapidAPI-Key': '961680eb58msh98f84a5663475e9p131d20jsncdef16fc47a6',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }

  // const response = await fetch(`${BaseUrl}${options}`);
  // const data = await response.json();
  // return data;

}

export const fetchAndStoreExerciseData = async (exerciseName) => {
 
  
  try {
    const response = await fetchData(exerciseName); // Assuming fetchData is defined
    const jsonData = JSON.stringify(response);
    console.log(jsonData);

    await axios.post('http://127.0.0.1:5000/store_exercise_data', jsonData,{ 
      headers: {
        'Content-Type': 'application/json' 
      },
      params: {
        exercise_name: exerciseName
      }
    }
        );
      
    
    console.log('Exercise data fetched and stored successfully.');
  } catch (error) {
    console.error('Error fetching and storing exercise data:', error);
  }
};  