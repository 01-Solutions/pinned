'use strict';
let artIMG;
let cardTag;
let cardTime;
let cardUrl;
let cardTitle ;
let cardAuthor;
let articlDesc;
$('.love').click(function(event) {
    event.preventDefault();
    $(this).closest('div').find('#saved,.love').toggleClass("press", 1000);
    artIMG = $(this).parents('form').find('#artIMG').attr('src');
    cardTag = $(this).parents('form').find('#cardTag').text();
    cardTime = $(this).parents('form').find('#cardTime').text();
    cardUrl = $(this).parents('form').find('#cardUrl').attr('href');
    cardTitle = $(this).parents('form').find('#cardTitle').text();
    cardAuthor = $(this).parents('form').find('#cardAuthor').text();
    articlDesc = $(this).parents('form').find('#articlDesc').text();

    sendDataToBackEnd();
    // alert(event.target.parentElement.parentElement.parentElement.parentElement.id)
});
// sendDataToBackEnd();
// const ifuser = `<li id="mylist">
// <a href='/favList' data-item='My List'>My List</a>
// </li>

// <form id='logOut' action="/signupdata" method="GET">

// <button class="login-btn-alt ">Log-out<i id="logicon" class="fas fa-sign-in-alt"></i>
// </button>

// </form>`

// /* to check if there data in locale storage that mean the user was signin */
// function ifuserOrnot() {
//     if (localStorage.getItem('key')) {
//         var dataInlocal = JSON.parse(localStorage.getItem('key'))
//         console.log('done :) ', dataInlocal);
//         $('#signupdata').remove();
//         $('.menuItems').append(ifuser);
//     }
// }
// ifuserOrnot();

// $('#logOut').on('click', () => {

//     localStorage.clear();
// })
function getlocal() {

    if (localStorage.getItem('key')) {
        var getdatafromJson = JSON.parse(localStorage.getItem('key'))
        console.log(getdatafromJson);
    }
    return getdatafromJson;
}


function sendDataToBackEnd() {
    let localData = getlocal();
    if (localData) {
        // alert('im in');
        // console.log('im in');
        // let artIMG = document.getElementById('artIMG').src;
        // let cardTag = document.getElementById('cardTag').textContent;
        // let cardTime = document.getElementById('cardTime').textContent;
        // let cardUrl = document.getElementById('cardUrl').href;
        // let cardTitle = document.getElementById('cardTitle').textContent;
        // let cardAuthor = document.getElementById('cardAuthor').textContent;
        // let articlDesc = document.getElementById('articlDesc').textContent;

        // console.log(artIMG);
        // console.log(cardTag);
        // console.log(cardTime);
        // console.log(cardUrl);
        // console.log(cardTitle);
        // console.log(cardAuthor);
        $.post('/saveFavorate', { articlIMG: artIMG, articlSource: cardTag, articlDes: articlDesc, articlURL: cardUrl, articlTitle: cardTitle,articlDate: cardTime, articlAuthor: cardAuthor });
    } else {
        // console.log('im out');
        // alert('im out');
        // window.redirect('/signupdata');
        window.location.replace('/signupdata');

    }

}