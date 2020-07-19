'use strict';


// for slider

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



const searchBtn = document.getElementById('searchBtn');
const searshStr =document.getElementById('idForAppend');


searchBtn.addEventListener('click',searchBtnHandler)

function searchBtnHandler(){
    // event.preventDefault();
    let localStorageData = getlocal();

    $.post('/search', { 
        email: localStorageData,
         search: searshStr.value
        });
}



function getlocal(){
    
    if(localStorage.getItem('key')){
        var getdatafromJson = JSON.parse(localStorage.getItem('key'))
        console.log(getdatafromJson);
    }
    return getdatafromJson;
}