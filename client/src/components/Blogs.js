import React, { useEffect, useState } from 'react'
import { getblogs } from '../utils/hadleApi.js'
import Blog from './Blog.js'

export default function Blogs() {
  const[blogs,setBlogs] = useState([])

  useEffect(()=>{
    getblogs()
    .then((data)=>{setBlogs(data.data.blogs)})
    .catch((err)=>{console.log(err)})
  },[])
  
 

return (
    <>
      {blogs && blogs.map((blogs,i)=>{
       return <Blog key = {blogs._id} 
        isUser={localStorage.getItem("userId") ===blogs.user._id}
        title={blogs.title} image={blogs.image}
        description={blogs.description} userName={blogs.user.name}
        id={blogs._id}/>
      })}
    </>
  )
}
