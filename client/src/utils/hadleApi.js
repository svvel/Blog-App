import axios from 'axios'

const Base_Url = "http://localhost:5000/"

export const sendRequest =async (type,loginobj)=>{

    return await axios.post(Base_Url+type,loginobj)
}

export const getblogs = async ()=>{

    return await axios.get(Base_Url+"blog")
}

export const userByid = async (userid)=>{
    return axios.get(Base_Url+"blog/user/"+userid)
}

export const addBlog = async (blog) =>{
    return axios.post(Base_Url+"blog/add", blog)
}

export const getBlogbyID = async (id)=>{
    return axios.get(Base_Url+`blog/${id.id}`)
}

export const updateBlog=(id,obj)=>{
    return axios.put(Base_Url+`blog/update/${id.id}`,obj)
}

export const deleteBlog = (id)=>{
    return axios.delete(Base_Url+`blog/delete/${id}`)
}
