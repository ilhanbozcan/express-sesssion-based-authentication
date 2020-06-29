var express = require('express');
const session = require('express-session');
var router = express.Router();

const users = [
  {id: 1, name: 'ilhan', email: 'ilhan@bozcan', password: 'secret'},
  {id: 2, name: 'admin', email: 'admin@admin', password: 'admin'},
  {id: 3, name: 'deneme', email: 'deneme@deneme', password: 'deneme'}

]


const redirectLogin = (req,res,next) =>{
  if(!req.session.userId){
    res.redirect('/login');
  }
  else{
    next();
  }
}

const redirectHome = (req,res,next) =>{
  if(req.session.userId){
    res.redirect('/home');
  }
  else{
    next();
  }
}







/* GET home page. */
router
  .get('/', function(req, res, next) {
    
    const userId = req.session;
    console.log(userId);
    
  
    res.render('index', { title: 'Welcome', userId: userId });

});



router
.get('/home', redirectLogin, function(req, res) {
  res.render('index', { title: 'HOME' });
});


router.get('/login',redirectHome, function(req, res) {  
  res.render('login', { title: 'LOGİN' });
});

router.post('/login',function(req,res){
    let email = req.body.email;
    let pass = req.body.password;
    //console.log(email);
    //console.log(pass);
    //console.log('************');
    if (email && pass){
      const user = users.find(
        user => user.email === email && user.password === pass
      )

      if(user){
        req.session.userId = user.id;
        res.redirect('/home');
      }
      else{
        res.redirect('/login');
      }

    }
  });

router
  .get('/register', function(req, res) {
  res.render('index', { title: 'REGISTER' });
})
  .post(function(reqires){

  });
router.post('/logout', redirectLogin, function(req,res){
  req.session.destroy(err =>{
    if(err){
      return res.redirect('/home');
    }

    res.clearCookie('sid');
    res.redirect('/login');

  })
});

module.exports = router;
