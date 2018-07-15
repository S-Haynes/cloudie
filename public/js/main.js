let addCommentBtn = document.querySelector('#addComment');
let commentForm = document.querySelector('.comment-form');
let commentEditBtn = document.querySelectorAll('.showEditForm');
let editForm = document.querySelectorAll('.editForm');


addCommentBtn.addEventListener('click', function(){
	commentForm.classList.toggle('hidden');
});



for(let i = 0; i < commentEditBtn.length; i++){
	commentEditBtn[i].addEventListener('click', function(){
		editForm[i].classList.toggle('hidden');
	})

}
