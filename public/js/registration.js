
'use strict';
/*this function for style registration */
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

/*END function of style registration */




document.getElementById('signIn').addEventListener('click', getEmail);
document.getElementById('signUp').addEventListener('click', signUpgetEmail);


const logIn =document.getElementById('getUserEmail');
const logUp =document.getElementById('getUserEmail2');

var emailforjson;
var lat,long
function getEmail(event){
	// evnt.preventDefault();
	if (event.target.textContent == "Log in") {
		let userEmail =logIn.value;
		localStorage.setItem('key',JSON.stringify(userEmail))
		getLocation()
	}
	$('#errMsg').css('display','inline')
}
function signUpgetEmail(event){
	if (event.target.textContent == "Sign up") {
		let userEmail =logUp.value;
		localStorage.setItem('key',JSON.stringify(userEmail))
		getLocation()
	}
}


function setlocal(value){
	localStorage.setItem('key',JSON.stringify(value))
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
}

function showPosition(position) {
	lat =  position.coords.latitude;
	long = position.coords.longitude;
	localStorage.setItem('lat',JSON.stringify(lat))
	localStorage.setItem('long',JSON.stringify(long))
  }

