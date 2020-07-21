
/* this is for check if the user login or not when he open the site */
'use strict';
if(localStorage.getItem('key')){
    var testlocal = JSON.parse(localStorage.getItem('key'))
    $.post('/getUserEmail', { 
        email: testlocal
        });
}