import React from 'react'
import { useState,useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'   

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

export const SlideCarousel = () => {
    const [exercise, setExercise] = useState([]);

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
    }, []);
    if (!exercise.length) return 'Loading...';
    
    const slicedExercise = exercise.slice(0, 7);
    
    return (
        <div className="container">
          <Animation text="Build a Workout plan that suits your build" delay={100}   />
       
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
                <p key={data.id}>{data.name.toUpperCase()} </p>
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
