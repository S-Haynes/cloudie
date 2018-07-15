const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const User     = require('../models/user');


router.get('/', function(req, res){
	res.render('landing')
});

router.get('/login', function(req, res){
	res.render('auth/login')
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
  function(req, res) {
  	req.flash('success', 'Welcome back, ' + req.user.username + '.')
    res.redirect('/blogs');
  });

router.get('/register', function(req, res){
	res.render('auth/register')
});

router.post('/register', function(req, res){
	User.register({
		username: req.body.username,
	}, req.body.password, function(err, user){
		if(err){
			console.log(err)
			req.flash('error', err.message)
			res.redirect('/register')
		} else {
			user.save();
			passport.authenticate('local')(req, res, function(){
				req.flash('success', 'Enjoy your stay, ' + req.user.username + '.')
				res.redirect('/blogs')
			});
		
		}
	});
});

router.get('/logout', function(req, res){
	if(req.isAuthenticated()){
	 	req.flash('success', 'Successfully logged out. Visit us again, ' + req.user.username + '.')
	}
	req.logout();
	res.redirect('/')
})



module.exports = router;