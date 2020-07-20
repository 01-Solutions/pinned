$('.love').click(function() {
    event.preventDefault();
    $(this).closest('div').find('#saved,.love').toggleClass("press", 1000);
    sendDataToBackEnd();
});
sendDataToBackEnd();

function sendDataToBackEnd() {
    let artIMG = document.getElementById('artIMG').src;
    let cardTag = document.getElementById('cardTag').textContent;
    let cardTime = document.getElementById('cardTime').textContent;
    let cardUrl = document.getElementById('cardUrl').href;
    let cardTitle = document.getElementById('cardTitle').textContent;
    let cardAuthor = document.getElementById('cardAuthor').textContent;

    console.log(artIMG);
    console.log(cardTag);
    console.log(cardTime);
    console.log(cardUrl);
    console.log(cardTitle);
    console.log(cardAuthor);
    $.post('/saveFavorate', { articlIMG: artIMG, articlSource: cardTag, articlDate: cardTime, articlURL: cardUrl, articlTitle: cardTitle, articlAuthor: cardAuthor });


}