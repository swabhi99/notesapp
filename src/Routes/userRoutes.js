const express = require('express')

const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const Task = require('../models/task')
require('../db/mongoose')




passport.use(User.createStrategy())

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/',(req,res)=>{
   res.render('home')
})


router.get('/login',(req,res)=>{
  res.render('login')
})

router.get('/addtasks',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('tasks')
    }else{
        res.redirect('/login')
    }
})



router.post('/tasks',async(req,res)=>{
  const task = new Task({
    description:req.body.task,
    owner:req.user._id
  })
  await task.save()
  res.redirect('/tasks')
})

router.get('/tasks',async(req,res)=>{
 
const task= await Task.find({owner:req.user.id})

 res.render('vietasks',{
   tasks : task
 })
 })


router.post('/signup',(req,res)=>{
  User.register({username: req.body.username , name:req.body.name}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/signup");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.render('success',{name:user.name,tasks :[]})
      });
    }
  });
  })

 router.get('/signup',(req,res)=>{
      res.render('signup')
  })

router.post('/login' , async(req,res)=>{
const user = new User ({
  username : req.body.username,
  password:req.body.password,
})
const name = await User.findOne({username:req.body.username})
req.login(user,(err)=>{
  if(err){
    console.log(err)
  }else{
    passport.authenticate('local',{ failureRedirect:'/login'})(req,res,()=>{
      res.render('success',{name:name.name,tasks:[]})
      })
      
    
  }
})

})

router.get('/logout',(req,res)=>{
  req.logout()
  res.redirect('/')
})

router.get('/tasks/:id',async(req,res)=>{
  const id = req.params.id
  console.log(id)
  const task = await Task.findByIdAndRemove(id)
  console.log(task)
  res.redirect('/tasks')
})

module.exports = router