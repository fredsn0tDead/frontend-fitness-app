import React from 'react'
import {Button, Paper} from '@mui/material'
import{styled} from '@mui/material/styles'
import {Card} from '@mui/material'
import {CardMedia} from '@mui/material'
import {CardActionArea} from '@mui/material'
import {CardActions} from '@mui/material'
import {CardContent} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Box,Typography,Stack,Grid } from '@mui/material'
import { WorkoutModal } from './WorkoutModal'
import { RM } from './RM'
import { padding } from '@mui/system'
export const WorkoutCard = ({title, description,img,excerise_array,excerise_description,ExerciseNames,TP,MP,BP,learn_more_description,
header,headline,main_description,bolded_description}) => {


  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isRecomendationOpen, setIsRecomendationOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openRecomendation = () => {
    setIsRecomendationOpen(true);
  };
  const closeRecomendation = () => {
    setIsRecomendationOpen(false);
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  return (
    <Card sx={{ maxWidth: 345 , mb: 2,textAlign:'center'}}>
      <CardActionArea  sx={{fontFamily: 'Fjalla One'}}>
        <CardMedia
          component={'img'}
          height={'140'}
          image={img}
          sx={{ objectFit: 'cover', height: '50%', overflow: 'hidden' }}
          alt={title}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: 'Fjalla One',}} >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Fjalla One', fontSize: '10px', display: { xs: 'none', sm: 'none', md: 'block' } }}>
        {description}
      </Typography>
        </CardContent>
        <Stack 
  spacing={2} 
  direction={{ xs: 'column', md: 'row' }} // Change direction to column on medium screens
  justifyContent="center" 
  alignItems="center" 
  p={2} 
  sx={{
    width: '100%',
  }}
>
  <Button 
    size="small" 
    color="primary" 
    variant="outlined" 
    onClick={openModal}
    sx={{ marginBottom: { xs: 2, md: 0 }, marginRight: { xs: 0, md: 2 } }} // Adjust margin for buttons based on screen size
  >
    Learn More
  </Button>
  <Button 
    size="small" 
    color="primary" 
    variant="outlined" 
    onClick={openRecomendation} 
    sx={{ marginBottom: { xs: 0, md: 2 }, marginRight: { xs:0, md: 2 }}} // Adjust margin for buttons based on screen size
  >
    Fitness Plan
  </Button>
</Stack>

        <WorkoutModal isOpen={isModalOpen}
         handleClose={closeModal} 
         title={title} 
         description={description}
         TP={TP}
          MP={MP}
          BP={BP}
          learn_more_description={learn_more_description}
          header={header}
          headline={headline}
          main_description={main_description}
          bolded_description={bolded_description}
 />
        <RM
          isOpen={isRecomendationOpen}
          handleClose={closeRecomendation}
          excerise_array={excerise_array}
          excerise_description={excerise_description}
          ExerciseNames={ExerciseNames}
          TP={TP}
          MP={MP}
          BP={BP}
          learn_more_description={learn_more_description}
          

        />
      </CardActionArea>
    </Card>
  )
};
