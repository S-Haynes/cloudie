const express = require('express');
const router  = express.Router({mergeParams: true});
const Blog    = require('../models/blog');


router.get('/', function(req, res){
	let perPage = 8;
	let pageQuery = parseInt(req.query.page);
	let pageNumber = pageQuery ? pageQuery : 1;
	Blog.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, blogs){
		Blog.countDocuments().exec(function(err, count){
			if(err){
				console.log(err)
			} else {
				res.render('blogs/index', {
				blogs: blogs,
				current: pageNumber,
				pages: Math.ceil(count / perPage)
				});
			}	
		});
		
	});
	
});

router.get('/new', function(req, res){
		res.render('blogs/new')
});

router.post('/new', function(req, res){
	Blog.create(req.body.blog, function(err, blog){
		if(err){
			console.log(err);
		} else {
			blog.author.username = req.user.username;
			blog.author.id = req.user.id;
			blog.save();
			res.redirect('/blogs')
		}
	});
});

router.get('/:id/edit', function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			console.log(err)
		} else {
			res.render('blogs/edit', {blog: blog});
		}
	});
});


router.put('/:id', function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
		if(err){
			console.log(err);
		} else {
			blog.save();
			res.redirect('/blogs/' + req.params.id)
		}
	})
});

router.get('/:id', function(req, res){
	Blog.findById(req.params.id).populate('comments').exec(function(err, blog){
		if(err){
			console.log(err);
			res.redirect('back');
		} else {
			res.render('blogs/show', {blog: blog});
		}
	});
});

router.delete('/:id', function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/blogs')
		}
	});
});


module.exports = router;