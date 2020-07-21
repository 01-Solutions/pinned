'use strict';



const ifuser = `<li id="mylist">
<a href='/favList' data-item='My List'>My List</a>
</li>

<form id='logOut' action="/signupdata" method="GET">

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

function getlocal() {

    if (localStorage.getItem('key')) {
        var getdatafromJson = JSON.parse(localStorage.getItem('key'))
        console.log(getdatafromJson);
    }
    return getdatafromJson;
}




// $('.love').click(function () {
//     event.preventDefault();
//     sendDataToBackEnd();
//     $(this).closest('div').find('#saved,.love').toggleClass("press", 1000);
// });
// // sendDataToBackEnd();



// function sendDataToBackEnd() {
//     let localData = getlocal();
//     if (localData) {
//         // alert('im in');
//         // console.log('im in');
//         let artIMG = document.getElementById('artIMG').src;
//         let cardTag = document.getElementById('cardTag').textContent;
//         let cardTime = document.getElementById('cardTime').textContent;
//         let cardUrl = document.getElementById('cardUrl').href;
//         let cardTitle = document.getElementById('cardTitle').textContent;
//         let cardAuthor = document.getElementById('cardAuthor').textContent;
//         let articlDesc = document.getElementById('articlDesc').textContent;

//         console.log(artIMG);
//         console.log(cardTag);
//         console.log(cardTime);
//         console.log(cardUrl);
//         console.log(cardTitle);
//         console.log(cardAuthor);
//         $.post('/saveFavorate', { articlIMG: artIMG, articlSource: cardTag, articlDes: articlDesc, articlURL: cardUrl, articlTitle: cardTitle, articlDate: cardTime, articlAuthor: cardAuthor });
//     } else {
//         // console.log('im out');
//         // alert('im out');
//         // window.redirect('/signupdata');
//         window.location.replace('/signupdata');

//     }

// }
// parents()

const devFavorate = $('#card card-1');
devFavorate.on('click',favorateHandle);
function favorateHandle(){
    if(event.target.class == 'love'){
        alert('dones');
    }
}