import Header from './components/Header/Header'
import StackOverflow from './components/StackOverFlow'
// import Question from './components/Add-Question/Question';
import ViewQuestion from './components/ViewQuestion'


import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import Question from './components/Add-Question/Question';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
         <Route path='/' element={<StackOverflow/>} />
         <Route path='/add-question' element={<Question/>} />
         <Route path='/question' element={<ViewQuestion/>} />
          {/* <Route element={ <StackOverflow />}>
            <Route path='/' element={<Login />} />
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
