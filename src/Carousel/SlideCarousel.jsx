import React from 'react'
import { useState,useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'   
import {styled} from '@mui/system';
import'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Animation } from './Animation'
import { fetchData } from '../utils/fetch'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Typography,TextField,Box } from '@mui/material';
import image1 from '../Assets/HAPPYw.png'

const excersiselist = [
    {
        id: 1,
        name: 'bench press',
    },
    {
        id: 2,
        name: 'deadlift',
    },
    {
        id: 3,
        name: 'squat',
    }
    


]
const StyledExerciseNameContainer = styled('div')`
  text-align: center;
  font-size: 10px;
`;
  
const Styledheader = styled('span')`
  font-family: 'Fjalla One';
  color: #000;
  margin: 0;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  `;
  

export const SlideCarousel = () => {
    const [exercise, setExercise] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [apiLimitReached, setApiLimitReached] = useState(false);

    useEffect(() => {
      // Define the async function inside useEffect and call it immediately
      const getExercise = async () => {
        try {
          const response = await fetchData(excersiselist[0].name);
          setExercise(response);
          console.log(exercise);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        
      };
    
      getExercise();
    }, []);
    if (!exercise) return 'Loading...';
    
    const slicedExercise = exercise.slice(0, 7);
    
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
    };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        const response = await fetchData(searchTerm);
        setExercise(response);
        setApiLimitReached(false); 
      } catch (error) {
        if (error.message === 'API Rate Limit Reached') {
          setApiLimitReached(true);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    }
  };
    return (
        <div className="container">
          <Animation text="Build a Workout plan that suits your build" delay={100} />
      <Box sx={{ 
          display: 'flex', // Ensure the Box uses flexbox layout
          flexDirection: 'column', // Arrange children in a column
          alignItems: 'center', // Center children along the cross-axis (horizontally for a column layout)
          justifyContent: 'center', // Center children along the main axis (vertically for a column layout)
    }}>
    <Typography variant="h6" component="h2" gutterBottom color='#0000' >
       <div className='subheading' ><span>Discover new variations from our database of exercises try them out and watch your progress explode!</span> </div> 
      </Typography>
      <TextField 
            style={{marginTop:'5px'}}
            margin="normal"
            required
            
            id="search"
            label="Search"
            placeholder='Search for exercise...'
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            onKeyDown={handleSearch}
          />
         
      </Box>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
          >
            {
            slicedExercise.map((data) => (  
              <SwiperSlide>
                {/* <ExcersiseCard giflink= {da ta.equipment}/> */}
                <img src={data.gifUrl} alt='' loading ="lazy" />
                <StyledExerciseNameContainer><Styledheader  key={data.id}>{data.name.toUpperCase()} </Styledheader></StyledExerciseNameContainer>
              </SwiperSlide>
            ))
          }

      {apiLimitReached ? (

          <img src={image1} alt="" loading="lazy" />
      
      ) : slicedExercise.length > 0 ? ( // Check if there's data
        slicedExercise.map((data) => (
          <SwiperSlide key={data.id}>
            <img src={data.gifUrl} alt="" loading="lazy" />
            <StyledExerciseNameContainer>
              <Styledheader>{data.name.toUpperCase()}</Styledheader>
            </StyledExerciseNameContainer>
          </SwiperSlide>
        ))
      ) : (
      
          <Typography variant="body2" color="text.secondary">
          <img src={image1} alt="" loading="lazy" />
            No exercises found.
          </Typography>
      )}
      

            
            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
              {/* <div className="swiper-pagination"></div> */}
            </div>
          </Swiper>
          
     
        </div>
      
      );
}
