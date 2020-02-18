require('dotenv').config()
const UserRoutes = require('./Routes/userRoutes')
// const TaskRoutes = require('./Routes/taskRoutes')
const express = require('express')
const hbs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const viewsPath = path.join(__dirname,'/views')
const session = require('express-session')
const passport = require('passport')

const app = express()
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.set('view engine','ejs')
app.set('views',viewsPath)

app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(UserRoutes)


const port = process.env.PORT || 3000






app.listen(port,()=>{
    console.log(`server is running on port ${port}...`)
})