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
    $(this).parents('button').find('.saved,.love').toggleClass("press", 1000);
    artIMG = $(this).parents('form').find('#artIMG').attr('src');
    cardTag = $(this).parents('form').find('#cardTag').text();
    cardTime = $(this).parents('form').find('#cardTime').text();
    cardUrl = $(this).parents('form').find('#cardUrl').attr('href');
    cardTitle = $(this).parents('form').find('#cardTitle').text();
    cardAuthor = $(this).parents('form').find('#cardAuthor').text();
    articlDesc = $(this).parents('form').find('#articlDesc').text();

    sendDataToBackEnd();
});

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
     
        $.post('/saveFavorate', { articlIMG: artIMG, articlSource: cardTag, articlDes: articlDesc, articlURL: cardUrl, articlTitle: cardTitle,articlDate: cardTime, articlAuthor: cardAuthor });
    } else {
        window.location.replace('/signupdata');

    }

}