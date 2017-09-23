var database = firebase.database().ref('/');

var eventName=document.getElementById('name');
var eventLocation=document.getElementById('location');
var eventInstructions=document.getElementById('instructions');
var eventDay=document.getElementById('day');
var eventMonth=document.getElementById('month');
var eventYear=document.getElementById('year');
var eventHour=document.getElementById('hours');
var eventMinutes=document.getElementById('minutes');
var eventStandard=document.getElementById('standard');

function newEvent(){
    var userLogin = localStorage.getItem('userLogin');
    userLogin=JSON.parse(userLogin);
    var userName=userLogin.name;
    var userEmail=userLogin.email;
    if(eventName.value!==""&&eventLocation.value!==""&&eventDay.value!==""&&eventMonth.value!==""
    &&eventYear.value!==""&&eventHour.value!==""&&eventMinutes.value!==""&&eventStandard.value!==""&&eventInstructions!==""){

    if(valid(eventDay.value)&&valid(eventMonth.value)&&valid(eventYear.value)
    &&valid(eventHour.value)&&valid(eventMinutes.value)){
        if(checkStandard(eventStandard.value)){
            var event={
                name:eventName.value,
                location:eventLocation.value,
                instructions:eventInstructions.value,
                date:eventDay.value+'/'+eventMonth.value+'/'+eventYear.value,
                time:eventHour.value+':'+eventMinutes.value+' '+eventStandard.value,
                by:userName,
                email:userEmail,
                gone:["unknown"]
            };
            database.child('events').push(event);
            window.location="myevent.html";
        }else{
            alert('Time third value i.e standard should be am or pm');
        }
    }else{
        alert('Days,Months and Years should be numbers\nHours and Minutes should be numbers');
    }

    }
    else{
        alert("Please completely fill full form and then click on Create Event");
    }
}

function valid(data){
    var pattern = new RegExp("^[0-9]+$");
    if(pattern.test(data)===true)
    {
        return true;
    }
    else{
        return false;
    }
}

function checkStandard(st){
var k=st.toLowerCase();
if(k==='am'||k==='pm'){
return true;
}else{
    return false;
}
}