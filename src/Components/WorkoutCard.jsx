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
import { Recomendationsmodal } from './Recomendationsmodal'
import { RM } from './RM'
export const WorkoutCard = ({title, description,img,excerise_array,excerise_description}) => {

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
    <Card sx={{maxWidth: 345}}>
    <CardActionArea>
        <CardMedia
        component={'img'}
        height={'140'}
        image={img}
        alt={title}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {description}
        </Typography>

        </CardContent>
        <Button size="small" color="primary" onClick={openModal}>Learn More</Button>
        <WorkoutModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        title={title}
        description={description}
      />
        <Button size="small" color="primary" onClick={openRecomendation} >Recommendations</Button>
        <RM
        isOpen={isRecomendationOpen}
        handleClose={closeRecomendation}
        excerise_array={excerise_array}
        excerise_description={excerise_description}
        />
    </CardActionArea>
    </Card>
  )
}
