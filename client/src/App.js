import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ForgetPassword from './components/ForgetPassword'
import GetStarted from './pages/getStarted'
import Home from './pages/Home'
import Card from './components/Card'
import AddQuestion from './components/Forms/AddQuestion'
import UserQuestion from './components/UserQuestions'
import ResetPassword from './components/ResetPassword';
import QuestionOverView from './components/QuestionOverView';

function App() {
  return (
    <Router>

      <Routes>
        <Route element={<GetStarted />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
        </Route>


        <Route element={<Home />}>
          <Route path='/questions' element={<Card/>} />
          <Route path='/add_questions' element={<AddQuestion />} />
          <Route path='/user_questions' element={<UserQuestion />} />
          <Route path='/question_over_view/:id' element={<QuestionOverView />} />
          <Route path="/test/:id" element={<Test />} />
        </Route>

      </Routes>
    </Router>
  );
}

function Test() {
  const {id} = useParams()
  console.log('====================================');
  console.log(id);
  console.log('====================================');
  return (
    <h1>hello there</h1>
  )
}

export default App;
