import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IMAGE1 from '../Assets/LB/Barbell__Decline_Skull_Crusher.gif';
import IMAGE2 from '../Assets/LB/Barbell_Conventional_Deadlift.gif';
import IMAGE3 from '../Assets/LB/Barbell_Cross_Arm_Front_Squat.gif';
import IMAGE4 from '../Assets/LB/Barbell_Normal_Skull_Crusher.gif';
import IMAGE5 from '../Assets/LB/Barbell_Front_Squat.gif';
import IMAGE6 from '../Assets/LB/Barbell_Pendlay_Row.gif';
import IMAGE7 from '../Assets/NB/Barbell_Bench_Press.gif';
import IMAGE9 from '../Assets/NB/Dumbbell_Shoulder_Press.gif';
import IMAGE12 from '../Assets/NB/Hack_Squat_Machine.gif';
import IMAGE13 from '../Assets/NB/Incline_Bench_Press.gif';
import IMAGE15 from '../Assets/SAB/Barbell_Lying_Skull_Crushers.gif';
import IMAGE16 from '../Assets/SAB/Dumbell_Incline_Curl.gif';
import IMAGE17 from '../Assets/LAB/Barbell_JM_Press.gif';
import IMAGE18 from '../Assets/LAB/Cable_Close_Grip_Curl.gif';
import IMAGE19 from '../Assets/LAB/Close_Grip_Bench_Press.gif';
import IMAGE20 from '../Assets/LLB/Standing_Calf_Raise_.gif';
import { styled } from '@mui/system';
const CarouselContainer = styled('Paper')({
  overflow: 'hidden',
  width: '100%',
  height: 'auto',
});

const CarouselWrapper = styled('Paper')({
  display: 'flex',
  animation: 'moveRightToLeft 20s linear infinite',
});

const CarouselItem = styled('img')({
  width: '110px',
  height: '120px',
});
const images = [IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, IMAGE6, IMAGE7, IMAGE9, IMAGE12, IMAGE13, IMAGE15, IMAGE16, IMAGE17, IMAGE18, IMAGE19, IMAGE20];


export const FitnessCarsouel = () => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust speed as needed
    rtl: true, // Move from right to left
  };
  return (
    <CarouselContainer>
      <CarouselWrapper>
        {images.map((image, index) => (
          <CarouselItem src={image} alt={`Slide ${index + 1}`} key={index} />
        ))}
      </CarouselWrapper>
    </CarouselContainer>
  )
}
