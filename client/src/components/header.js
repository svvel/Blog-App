import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  logout} from '../store/index.js'

export default function Header() {
  const [value, setvalue] = useState(0);
  const isloggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()
  
  return (
    <AppBar position='sticky' sx={{background:
               "linear-gradient(90deg, rgba(28,19,180,1) 0%, rgba(94,94,199,1) 35%, rgba(52,190,218,1) 100%)"
               }}>
        <Toolbar>
            <Typography variant='h5'>BlogApp</Typography>
            {isloggedIn && <Box  marginLeft='auto' marginRight='auto'>
              <Tabs textColor= 'inherit' value = {value} onChange={(e,value)=>{setvalue(value)}}>
                <Tab LinkComponent={Link} to='/blogs' label='All Blogs'/>
                <Tab LinkComponent={Link} to='/myblogs' label='My Blogs'/>    
                <Tab LinkComponent={Link} to='/blogs/add' label='Add Blogs'/>    
              </Tabs>
            </Box>}
            <Box display='flex' marginLeft='auto'>
                { isloggedIn &&
                <>
                <Button LinkComponent={Link} to='/auth' variant='contained' sx={{ margin: 1, borderRadius:10 }}
                  onClick={()=>{dispatch(logout())}} color='warning'>
                      Logout
                </Button>
                </>
                }
            </Box>
        </Toolbar>
    </AppBar>
  )
}
