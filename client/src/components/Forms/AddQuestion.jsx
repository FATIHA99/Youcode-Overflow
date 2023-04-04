import React, { useState } from 'react';
import {
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBTextArea
} from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
import Question from '../../assets/question.gif'
export default function AddQuestion() {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:8080'
  const user = localStorage.getItem('ID').replace(/"/g, '');
  const [question, setQuestion] = useState({
    title: '',
    body: '',
    language: '',
    user,
    image: ''
  })

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.id]: e.target.value })
  }
  const handlePhoto = (e) => {
    setQuestion({ ...question, image: e.target.files[0] })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.body === '' || question.title === '' || question.language === '') {
      toast.warning('please fill all  fields ')
    }
    else {
      const formData = new FormData();
      formData.append('title', question.title)
      formData.append('language', question.language)
      formData.append('body', question.body)
      formData.append('image', question.image)
      formData.append('user', question.user)
      const add = await axios.post(`${API_URL}/add`, formData)
      if (add) {
        toast.success('Question posted ')
        navigate('/questions')
      }
      else console.log('error')

    }

  }

  return (

    <div style={{ marginTop: 80 }} className='d-flex flex-row ps-5 pt-5 '>
      <ToastContainer position='bottom-right' />
      <img src={Question} style={{ height: 400, width: 400, marginLeft: 200 }} alt='svg' />
      <div style={{marginLeft:60}}>
        <MDBRow>
          <h2>Ask your Friend About Your issue they can help you to solve it </h2>
        </MDBRow>
        <MDBInput onChange={handleChange} wrapperClass='mb-4 mt-4' id='title' label='Title' />
        {/* <MDBInput onChange={handleChange} wrapperClass='mb-4 mt-4' id='user' label='user' value={user} /> */}
        <MDBInput onChange={handleChange} wrapperClass='mb-4' id='language' label='Technologie' />
        <MDBTextArea onChange={handleChange} label='Question description' id='body' rows={4} />
        <div className="mb-3">
          <label className="form-label">image</label>
          <input type="file" onChange={handlePhoto} className="form-control" name="image" multiple />
        </div>
        <MDBBtn onClick={handleSubmit} className='mb-4 mt-4' type='submit' block>
          Add Question
        </MDBBtn></div>
    </div>
  );
}