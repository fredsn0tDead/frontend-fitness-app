import React from 'react'
import axios from 'axios'


export const fetchExcercises = async () => {
    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises',
        params: {limit: '500'},
        headers: {
          'X-RapidAPI-Key': 'b5ebc4b4a5mshc17d7df0b8a0caap10feb6jsn20e6e324a2f2',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    }
    //I need the excersise name of all excersise for my data
