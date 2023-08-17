import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';
import { deleteBlog } from '../utils/hadleApi';

export default function Blog({title,image,description,userName, isUser,id}) {
    const navigate = useNavigate()
    
    const handleEdit =()=>{
        navigate(`/myblogs/${id}`)
    }
    const handleDelete =()=>{
        alert("cofirm delete:")
        console.log(id)
        deleteBlog(id)
        .then(()=>navigate("/blogs"))
    }
  return (
    <>
        <Card sx={{ width: "40%", margin:'auto', mt:2, padding:2,
                boxShadow:"5px 5px 20px #ccc",
                ":hover":{boxShadow:"15px 15px 8px #ccc"}}}
            >
                {isUser && (
                    <Box display={"flex"}>
                        <IconButton onClick={handleEdit} sx={{ml:"auto", color:"blue"}}><EditNoteIcon/></IconButton>
                        <IconButton onClick={handleDelete} sx={{color:"red"}}><DeleteForeverIcon/></IconButton>
                    </Box>
                )}
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                    {userName.charAt(0).toUpperCase()}
                </Avatar>
                }

                title={title}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <b>{userName+ " :"}</b> {description}
                </Typography>
            </CardContent>
        </Card>
    </>
  )
}
