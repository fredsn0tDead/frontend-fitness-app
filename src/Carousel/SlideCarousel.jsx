import React from 'react'
import { useState,useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'   
import {styled} from '@mui/system';
import'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Animation } from './Animation'
import { fetchData } from '../utils/fetch'
import { exerciseData } from '../utils/fetch'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

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
`;
  
const Styledheader = styled('span')`
  font-family: 'Fjalla One';
  color: #ffff;
  margin: 0;
  padding: 5px;
  background-color: #8e44ad;
  border-radius: 90px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  `;
  

export const SlideCarousel = () => {
    const [exercise, setExercise] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
    if (!exercise.length) return 'Loading...';
    
    const slicedExercise = exercise.slice(0, 7);
    
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
    const handleSearch = async (e) => {
      if (e.key === 'Enter') {
        try {
          const response = await fetchData(searchTerm);
          setExercise(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    return (
        <div className="container">
          <Animation text="Build a Workout plan that suits your build" delay={100} />
          <input
        type="text"
        placeholder="Search for exercise..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleSearch}
      />
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
                <img src={data.gifUrl}  loading ="lazy" />
                <StyledExerciseNameContainer><Styledheader  key={data.id}>{data.name.toUpperCase()} </Styledheader></StyledExerciseNameContainer>
              </SwiperSlide>
            ))
          }
            
            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
          
          
        </div>
      
      );
}
