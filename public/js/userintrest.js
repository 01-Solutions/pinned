'use strict'

const interest =document.getElementById('interestcon');
const appendSearsh =document.getElementById('idForAppend');
var array=[];
interest.addEventListener('click', interestFun)

function interestFun(){
     if(event.target.value){
        
        let checkedstatus = event.target.checked;
        let eventval = event.target.value;
        if(checkedstatus){
            
            array.push(eventval);
        }else{
            var index = array.indexOf(eventval);
            array.splice(index, 1);        }
            
        }
        var newarr =array.join(' ');
        console.log(array);
        console.log(newarr);

        appendSearsh.value = newarr;
        
    }
