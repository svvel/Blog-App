import './App.css';
import React, { useEffect } from 'react';
import {Route , Routes} from "react-router-dom"
import Header from './components/header.js';
import Auth from './components/auth.js';
import Blogs from "./components/Blogs.js";
import Userblog from './components/userBlog.js';
import BlogDetail from './components/BlogDetail.js';
import Addblog from './components/addblog.js';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './components/notFound';
import { login } from './store';

function App() {
  const isloggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("userId")){
        dispatch(login())
    }
  })
  
  return (
  <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        
        <Route path='/auth' element={<Auth/>}/>
        {!isloggedIn? <Route index element={<Auth/>}/>:
        <>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/blogs/add' element={<Addblog/>}></Route>
        <Route path='/myblogs' element={<Userblog/>}></Route>
        <Route path='/myblogs/:id' element={<BlogDetail/>}></Route>
        </>
        }
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
  </React.Fragment>
  );
}

export default App;
