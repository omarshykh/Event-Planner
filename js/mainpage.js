var database = firebase.database().ref('/');
var parent=document.getElementById('mydiv');

var userLogin = localStorage.getItem('userLogin');
userLogin=JSON.parse(userLogin);
var userKey = localStorage.getItem('userKey');
userKey=userKey.slice(1,userKey.length-1);

var myEmail=userLogin.email;


database.child('events').on('child_added',function(snap){
    var obj=snap.val();
    var myKey=snap.key;

    var parentDiv=document.createElement('DIV');
    parentDiv.setAttribute('class','card events');
    parentDiv.setAttribute('style','width: 20rem;margin-top:2%');
    var innerDiv=document.createElement('DIV');
    innerDiv.setAttribute('class','card-body');
    parentDiv.appendChild(innerDiv);
    
    var headingElement = document.createElement('H4')
    headingElement.setAttribute('class','card-title heading1');
    
    var locationElement = document.createElement('H6');
    locationElement.setAttribute('class','card-subtitle mb-2 text-muted infos');
    
    var aboutElement =document.createElement('P');
    aboutElement.setAttribute('class','card-text infos');
    
    var dateElement = document.createElement('H6');
    dateElement.setAttribute('class','card-subtitle mb-2 text-muted infos');
    
    var timeElement = document.createElement('H6');
    timeElement.setAttribute('class','card-subtitle mb-2 text-muted infos');
    if(obj.email!==myEmail){
        var goingButton = document.createElement('BUTTON');
        goingButton.setAttribute('class','btn btn-primary');
        goingButton.setAttribute('id',myKey+'GOING');
        goingButton.setAttribute('onclick',"changeToGoing('"+myKey+"')");

        var byElement = document.createElement('H6');
        byElement.setAttribute('class','card-subtitle mb-2 text-muted by');
    }
    
    var headingTxt = document.createTextNode(obj.name);
    var locationTxt = document.createTextNode('Location: '+obj.location);
    var aboutTxt = document.createTextNode(obj.instructions);
    var dateTxt = document.createTextNode('Date: '+obj.date);
    var timeTxt = document.createTextNode('Time: '+obj.time);
    var goingTxt,byTxt;
    if(obj.email!==myEmail){
        goingTxt=document.createTextNode('Not Going');
        byTxt=document.createTextNode('Event by: '+obj.by);
    }

    
    headingElement.appendChild(headingTxt);
    if(obj.email!==myEmail){
        byElement.appendChild(byTxt);
    }
    locationElement.appendChild(locationTxt);
    aboutElement.appendChild(aboutTxt);
    dateElement.appendChild(dateTxt);
    timeElement.appendChild(timeTxt);
    if(obj.email!==myEmail){
        goingButton.appendChild(goingTxt);  
    }

    
    innerDiv.appendChild(headingElement);
    if(obj.email!==myEmail){
        innerDiv.appendChild(byElement); 
    }
    innerDiv.appendChild(locationElement);
    innerDiv.appendChild(aboutElement);
    innerDiv.appendChild(dateElement);
    innerDiv.appendChild(timeElement);
    if(obj.email!==myEmail){
        innerDiv.appendChild(goingButton); 
    }
    
    parent.appendChild(parentDiv);

});

database.child('users/'+userKey+'/gone').on('child_added',function(snap){
var kk=document.getElementById(snap.val().goKey+'GOING');
kk.setAttribute('class','btn btn-success');
kk.innerHTML='Going';
kk.setAttribute('onclick',"changeToNot('"+snap.key+"')");
});

database.child('users/'+userKey+'/gone').on('child_removed',function(snap){
    var kk=document.getElementById(snap.val().goKey+'GOING');
    kk.setAttribute('class','btn btn-primary');
    kk.innerHTML='Not Going';
    kk.setAttribute('onclick',"changeToGoing('"+snap.val().goKey+"')");
    });


function changeToGoing(myKey){
    var userGoing={
        goKey:myKey
    };
    database.child('users/'+userKey+'/gone').push(userGoing);
}

function changeToNot(myKey){
//console.log('kkk',myKey);
database.child("users/"+userKey+"/gone/"+myKey).remove();
}