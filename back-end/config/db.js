const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{ console.log('DATABASE CONNECTED SUCCUSSFULLY')})
.catch((err)=>{console.log('NOT CONNECTED', err)})