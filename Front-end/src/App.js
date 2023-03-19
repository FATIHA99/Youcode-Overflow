import React, { useEffect } from 'react'
import Header from './components/Header/Header'
import StackOverflow from './components/StackOverFlow'
// import Question from './components/Add-Question/Question';
import ViewQuestion from './components/ViewQuestion'
import Auth from './components/Auth'
import {
  BrowserRouter as Router, Route, Routes, Navigate
} from 'react-router-dom'
import Question from './components/Add-Question/Question';
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './feature/userSlice'
import { auth } from './firebase'




function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email
          })
        )
      } else {
        dispatch(logout())
      }
    });
  }, [dispatch]);



  const PrivateRoute = ({ element: Element, ...rest }) => (
    <Route
      {...rest}
      element={user ? <Element /> : (
        <Navigate
          to={'/auth'}


        />
      )}
    />
  );



  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/home' element={<StackOverflow />} />
          <Route path='/add-question' element={<Question />} />
          {/* <PrivateRoute path='/add-question' element={<Question />} /> */}
          <Route path='/question' element={<ViewQuestion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
