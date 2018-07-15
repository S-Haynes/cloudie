const express 				= require('express'),
	  app 					= express(),
	  mongoose 				= require('mongoose'),
	  passport 				= require('passport'),
	  LocalStrategy 		= require('passport-local'),
	  passportLocalMongoose = require('passport-local-mongoose'),
	  bodyParser 			= require('body-parser'),
	  flash 				= require('connect-flash'),
	  methodOverride 		= require('method-override'),
	  session				= require('express-session');

app.locals.moment = require('moment');

//require models 
const User	  = require('./models/user'),
	  Blog	  = require('./models/blog'),
	  Comment = require('./models/comment');

//require routes
const indexRoutes 	 = require('./routes/index');
	  blogRoutes  	 = require('./routes/blogs'),
	  commentRoutes  = require('./routes/comments');

//connect to mongoose database
mongoose.connect('mongodb://shaynes:shaynes123@ds137631.mlab.com:37631/cloudie', {useNewUrlParser: true});

mongoose.connection.on('error', (err) => {
	console.log(err)
})

// app config
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(flash());



// auth config 
app.use(session({
	secret: 'this website is for J. J. Lee',
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error')
	next();
});

app.use('/', indexRoutes);
app.use('/blogs', blogRoutes);
app.use('/blogs/:id/comments', commentRoutes);


// Blog.remove({}, function(err){
// 	console.log(err)
// })

// for(let i = 0; i < 72; i++){
// 	Blog.create({
// 		title: 'Sample Blog',
// 		image: 'http://www.cutestpaw.com/wp-content/uploads/2015/06/chihuahua-24.jpg',
// 		description: 'my cute chihuahua'
// 	})
// }
//port to listen for server startup
app.listen(3000, () => {
	console.log('server started');
});