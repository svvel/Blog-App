import express from 'express';
import { getblogs, addblogs, updateblog, getbyid, deletebyid,getbyuser } from '../controller/blogcontroller.js';

const blogroutes = express.Router()

blogroutes.post('/add',addblogs)
blogroutes.get('/', getblogs)
blogroutes.put('/update/:id',updateblog)
blogroutes.delete('/delete/:id',deletebyid)
blogroutes.get('/:id',getbyid)
blogroutes.get("/user/:id",getbyuser)

export default blogroutes