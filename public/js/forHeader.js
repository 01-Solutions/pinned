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