'use strict';


/* this is for check if the user login or not when he open the site */
if (localStorage.getItem('key')) {
    let long = localStorage.getItem('long');
    let lat = localStorage.getItem('lat');
    var testlocal = JSON.parse(localStorage.getItem('key'))
    $.post('/getUserEmail', {
        email: testlocal,
        longitud: long,
        latitud: lat
    });
}


///////////////////////////* start style with js *///////////////////////

/* for slider */
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}



///////////////////////////* start style with js *///////////////////////

/* this is for send data to back-end (useremail-search&&intrest) */
const searchBtn = document.getElementById('searchBtn');
const searshStr = document.getElementById('idForAppend');
searchBtn.addEventListener('click', searchBtnHandler)

function searchBtnHandler() {
    // event.preventDefault();
    let localStorageData = getlocal();

    $.post('/getUserEmail', {
        email: localStorageData,
        search: searshStr.value
    });
}

function getlocal() {

    if (localStorage.getItem('key')) {
        var getdatafromJson = JSON.parse(localStorage.getItem('key'))
            // console.log(getdatafromJson);
    }
    return getdatafromJson;
}

const ifuser = `<li id="mylist">
<a href='/favList' data-item='My List'>My List</a>
</li>

<form id='logOut' action="/signupdata" method="GET" id="signupdata">

<button class="login-btn-alt ">Log-out<i id="logicon" class="fas fa-sign-in-alt"></i>
</button>

</form>`

/* to check if there data in locale storage that mean the user was signin */
function ifuserOrnot() {
    if (localStorage.getItem('key')) {
        var dataInlocal = JSON.parse(localStorage.getItem('key'))
        console.log('done :) ', dataInlocal);
        $('#signupdata').remove();
        $('.menuItems').append(ifuser);
    }
}
ifuserOrnot();

$('#logOut').on('click', () => {

    localStorage.clear();
})