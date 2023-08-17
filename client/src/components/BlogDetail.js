import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogbyID, updateBlog } from '../utils/hadleApi'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';

const labelStyle = {mb:1, mt:3, fontSize:"24px", fontWeight:"normal"}


export default function BlogDetail() {
  const navigate = useNavigate()
  const id = useParams()
  const [input, setInput] = useState({});

  useEffect(()=>{
    getBlogbyID(id)
    .then((data)=>{
      setInput({
      title:data.data.blog.title,
      description:data.data.blog.description,
      imageurl:data.data.blog.image
    })
    })
    .catch((data)=>{console.log(data)})
  },[id]);

  const handleChange = (e)=>{
    setInput((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    updateBlog(id,{
      title:input.title,
      description:input.description,
      image:input.imageurl
    })
    .then((data)=>{console.log(data)})
    .then(()=>{navigate("/myblogs")})
  };

  return (
    <>
      <form onSubmit={handleSubmit} >
        <Box border={3} borderColor={"linear-gradient(90deg, rgba(28,19,180,1) 0%, rgba(94,94,199,1) 35%, rgba(52,190,218,1) 100%)"} borderRadius={10}
        boxShadow={"10px 10px 20px #ccc"} padding={3} margin={"auto"} marginTop={3}
        display={"flex"} flexDirection={"column"} width={"80%"} >
          <Typography fontWeight={"bold"} padding={3} color="grey" 
           variant='h4' textAlign={"center"} >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField name="title" value={input.title} onChange={handleChange} margin='normal' variant="outlined"/>
          <InputLabel  sx={labelStyle}>Description</InputLabel>
          <TextField name="description" multiline value={input.description} onChange={handleChange} margin='normal' variant="outlined"/>
          <InputLabel sx={labelStyle}>ImageUrl</InputLabel>
          <TextField name="imageurl" value={input.imageurl} onChange={handleChange} margin='normal' variant="outlined"/>
          <Button type='submit' sx={{mt:2 ,borderRadius:4, width:"20%", ml:"auto", mr:"auto"}} variant='contained' 
           color='warning' >
            Submit
          </Button>
        </Box>
      </form>
    </>
  )
}
