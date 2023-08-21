import React, {useEffect, useState} from 'react'
import { sendRequest } from '../utils/hadleApi.js'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { login } from '../store/index.js';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [message,setMessage]= useState("")
  const [isUser, setIsuser] = useState(false);
  const [issignup, setIssignup] = useState(false);
  const [input, setInput] = useState({
    name:"",
    email:"",
    password:""
  });

  const handlechange = (e)=>{ 
      setInput((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
  };

  const handleSubmit = async (e)=>{
      e.preventDefault()
      console.log(input)
      const type = issignup? "user/signup":"user/login"  
      await sendRequest(type,{
          name:input.name,
          email:input.email,
          password:input.password 
        })
        .then((data)=>{localStorage.setItem("userId",data.data.user._id)})
        .catch((data)=>{throw data})
        .then(()=>{dispatch(login())})
        .then(()=>{navigator('/blogs')})
        .catch((data)=>{
          console.log(data)
          // setMessage(data.response)
          // setIsuser(true)
        })
  };

  useEffect(() => {
    if (isUser) {
      const timeoutId = setTimeout(() => {
        setIsuser(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isUser]);

  return (
  <>
    <form onSubmit={handleSubmit}>
      <Box maxWidth={400} display={'flex'} flexDirection={'column'} 
      alignItems={'center'} justifyContent={'centre'} 
      boxShadow={'20px 20px 20px #ccc'} padding={3} margin={'auto'} 
      marginTop={5} borderRadius={5}
      >
        <Typography variant='h4'padding={3} textAlign='center'>
          {issignup?"Signup":'Login'}
        </Typography>
        {issignup && <TextField name='name'onChange={handlechange}
        value={input.name} margin='normal'variant="standard" label="Name"
        autoComplete="current-password" required/>
        }
        <TextField name='email'onChange={handlechange} value={input.email}
        type={'email'} margin='normal'variant="standard" label="Email"
        autoComplete="current-password" required
        />
        <TextField name='password' onChange={handlechange}
        value={input.password} type={'password'} autoComplete="current-password"
        margin='normal' variant="standard" label="Password"  required
        />      
        <Button variant='contained' color='warning'
        sx={{borderRadius:3, marginTop:3}} type='submit'
        >
          Submit  
        </Button>
        <Button sx={{borderRadius:3 ,marginTop:3}}
          onClick={()=>{setIssignup(!issignup)}}
        >
          Change To {issignup ? "Login":"Signup"}
        </Button>
        
        {isUser && <Alert sx={{borderRadius:3 ,marginTop:3}} severity={message.includes("user")? "info":"warning"}>{message}</Alert>}  
        
      </Box>
    </form>
  </>
  )
}
