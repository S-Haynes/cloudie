const express = require('express');
const router = express.Router({mergeParams: true});
const Blog = require('../models/blog');
const Comment = require('../models/comment');


router.post('/', function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			console.log(err);
		} else {
			Comment.create({
				text: req.body.text
			}, function(err, comment){
				if(err){
					console.log(err)
				} else {
				comment.author.username = req.user.username;
				comment.author.id = req.user._id	
				comment.save();
				blog.comments.push(comment)
				blog.save();
				res.redirect('/blogs/' + req.params.id)
				}
			});
		}
	})
})

router.delete('/:comment_id', function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err)
		} else {
			res.redirect('/blogs/' + req.params.id)
		}
	});
});

router.put('/:comment_id', function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
		if(err){
			console.log(err);
		} else {
			comment.save();
			res.redirect('/blogs/' + req.params.id)
		}
	})
})

module.exports = router;