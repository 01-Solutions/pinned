
console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});




document.getElementById('signIn').addEventListener('click', getEmail);
	// e.preventDefault();
	// loginBtn.click();

const logIn =document.getElementById('getUserEmail');

// document.getElementById('getdata').addEventListener('click',getEmail)
var emailforjson;
function getEmail(event){
	// event.preventDefault();
	if (event.target.textContent == "Log in") {
		let userEmail =logIn.value;
		emailforjson = userEmail;
		setlocal();
	}
}


function setlocal(){
	var sendJson = JSON.stringify(emailforjson);
	// console.log('done',emailforjson);
	localStorage.setItem('key',sendJson)
}


