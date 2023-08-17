import { Alert } from '@mui/material'
import React from 'react'

export default function NotFound() {
  return (
    <>   
        <Alert  variant="filled" severity="info" sx={{marginTop:'5', width:"50%", margin:"10% auto 0 auto"}}>
            Page Is Not Found 
        </Alert>
    </>
  )
}
