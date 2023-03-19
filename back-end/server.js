const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./config/db')
const QuestionRoute = require('./routes/QuestionRoutes')
const UserRoute = require('./routes/UserRoute')

const app = express();
const path = require('path')
dotenv.config()

// middleware
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', QuestionRoute);
app.use('/auth',UserRoute)


//  static ressources 
// app.get('*', (req,res)=>{
//     res.sendFile(path.join(`${__dirname}/..`))
// })


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`app rining in port ${port}`)
})