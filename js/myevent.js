var database = firebase.database().ref('/');
var parent=document.getElementById('mydiv');
var goingDiv=document.getElementById('goingdiv');

var userLogin = localStorage.getItem('userLogin');
userLogin=JSON.parse(userLogin);
var myEmail=userLogin.email;

var userKey = localStorage.getItem('userKey');
userKey=userKey.slice(1,userKey.length-1);

database.child('events').on('child_added',function(snap){
var obj=snap.val();
if(obj.email===myEmail){
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
    
    var headingTxt = document.createTextNode('Event Name: '+obj.name);
    var locationTxt = document.createTextNode('Location: '+obj.location);
    var aboutTxt = document.createTextNode('Description: '+obj.instructions);
    var dateTxt = document.createTextNode('Date: '+obj.date);
    var timeTxt = document.createTextNode('Time: '+obj.time);
    
    headingElement.appendChild(headingTxt);
    locationElement.appendChild(locationTxt);
    aboutElement.appendChild(aboutTxt);
    dateElement.appendChild(dateTxt);
    timeElement.appendChild(timeTxt);
    
    innerDiv.appendChild(headingElement);
    innerDiv.appendChild(locationElement);
    innerDiv.appendChild(aboutElement);
    innerDiv.appendChild(dateElement);
    innerDiv.appendChild(timeElement);
    
    parent.appendChild(parentDiv);
}
else{
    var myKey=snap.key;
    var flag=false;
    var goK;

    database.child('users/'+userKey+'/gone').on('value',function(snap){
        //console.log(snap.val());
        var ss=snap.val();
        for(var i in ss){
            var tt=ss[i];
            for(var j in tt){
                if(tt[j]===myKey){
                    flag=true;
                    goK=i;
                }
                
            }
        }
    });

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
        var goingButton = document.createElement('BUTTON');
        if(flag){
            goingButton.setAttribute('class','btn btn-success');
            goingButton.setAttribute('id',myKey+'GOING');
            goingButton.setAttribute('onclick',"changeToNot('"+goK+"')");
        }else{
            goingButton.setAttribute('class','btn btn-primary');
            goingButton.setAttribute('id',myKey+'GOING');
            goingButton.setAttribute('onclick',"changeToGoing('"+myKey+"')");
        }

        var byElement = document.createElement('H6');
        byElement.setAttribute('class','card-subtitle mb-2 text-muted by');
    
    var headingTxt = document.createTextNode(obj.name);
    var locationTxt = document.createTextNode('Location: '+obj.location);
    var aboutTxt = document.createTextNode(obj.instructions);
    var dateTxt = document.createTextNode('Date: '+obj.date);
    var timeTxt = document.createTextNode('Time: '+obj.time);
    var goingTxt;
    if(flag){
        goingTxt=document.createTextNode('Going');
    }else{
        goingTxt=document.createTextNode('Not Going');
    }
    var byTxt=document.createTextNode('Event by: '+obj.by);

    
    headingElement.appendChild(headingTxt);
    byElement.appendChild(byTxt);
    locationElement.appendChild(locationTxt);
    aboutElement.appendChild(aboutTxt);
    dateElement.appendChild(dateTxt);
    timeElement.appendChild(timeTxt);
    goingButton.appendChild(goingTxt);

    
    innerDiv.appendChild(headingElement);
    innerDiv.appendChild(byElement);
    innerDiv.appendChild(locationElement);
    innerDiv.appendChild(aboutElement);
    innerDiv.appendChild(dateElement);
    innerDiv.appendChild(timeElement);
    innerDiv.appendChild(goingButton);
    
    goingDiv.appendChild(parentDiv);
}

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