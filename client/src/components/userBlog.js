import React, { useState, useEffect } from 'react'
import { userByid } from '../utils/hadleApi'
import Blog from './Blog.js';

export default function UserBlog() {
  const[blogs, setblogs] = useState()
  const userid = localStorage.getItem("userId")
  useEffect( ()=>{ 
    userByid(userid)
    .then((data)=>{
      setblogs(data.data)
    })
    .catch((data)=>{console.log(data)})
    
  },[userid])
  
  
  return (
    <>
     {blogs && blogs.blogs.map((blog,i)=>{
       return <Blog 
        isUser={localStorage.getItem("userId")===blogs._id}
        id={blog._id}
        key = {blog._id} 
        title={blog.title} 
        image={blog.image}
        description={blog.description}
        userName={blogs.name}/>
      })}
    </>
  );
};
