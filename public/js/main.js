let addCommentBtn = document.querySelector('#addComment');
let commentForm = document.querySelector('#comment-form');
let commentEditBtn = document.querySelector('#showEditForm');
let editForm = document.querySelector('#editForm');


addCommentBtn.addEventListener('click', function(){
	commentForm.classList.toggle('hidden');
});

commentEditBtn.addEventListener('click', function(){
	editForm.classList.toggle('hidden');
})
