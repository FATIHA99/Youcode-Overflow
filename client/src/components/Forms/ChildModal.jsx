import React, { useEffect, useState } from 'react';
import {
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBTextArea
} from 'mdb-react-ui-kit';
import { useNavigate ,useParams} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'

export default function AddQuestion({route}) {


  const {id} = useParams();

  const API_URL = 'http://localhost:8080'
  const user = localStorage.getItem('ID').replace(/"/g, '');
//  const [one,setOne] = useState({});
const navigate =  useNavigate()
  const [question, setQuestion] = useState({
    title: '',
    body: '',
    language: 'https://tipsonubuntu.com/wp-content/uploads/2019/03/Disco-Dingo_WP_4096x2304-610x343.jpg',
    user,
    image : ''
  })

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.id]: e.target.value })
  }
  const handlePhoto = (e) => {
    setQuestion({ ...question, image: e.target.files[0] })
  }


  function getOne() {
    axios.get(`${API_URL}/get_question/${id}`)
    .then((info)=>{
      setQuestion(info.data)
        // console.log(info.data)
    })
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.body === '' || question.title === '' || question.language === '') {
      toast.warning('please fill all  fields ')
    }
    else {
      // const formData = new FormData();
      // formData.append('title',question.title)
      // formData.append('language',question.language)
      // formData.append('body',question.body)
      // formData.append('image',question.image)
      // formData.append('user',question.user)
      const id  = question._id
      const add = await axios.put(`${API_URL}/update/${id}`, question)
      if(add){ 
        toast.success('Question updated ')
          navigate('/user_questions')
    }
    else console.log('error')
      
    }

  }


  useEffect(()=>{
    getOne()
  },[])
  return (

    <div style={{ marginTop: 100, width:500}}>
      <ToastContainer  />
      <MDBRow>
        <h2>Modify Your Question </h2>
      </MDBRow>
      <MDBInput value={question.title}  onChange={handleChange} wrapperClass='mb-4 mt-4' id='title' label='Title' />
      <MDBInput   value={question.language} onChange={handleChange} wrapperClass='mb-4' id='language' label='Technologie' />
      <MDBTextArea  value={question.body}  onChange={handleChange} label='Question description' id='body' rows={4} />
      {/* <div className="mb-3">
        <label className="form-label">image</label>
        <input  type="file" onChange={handlePhoto} className="form-control" name="image" multiple />
      </div> */}
      <MDBBtn onClick={handleSubmit} className='mb-4 mt-4' type='submit' block>
        Modify Question
      </MDBBtn>
    </div>
  );
}