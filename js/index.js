var database = firebase.database().ref('/');
var auth = firebase.auth();

var signUpName=document.getElementById('signupName');
var signUpEmail=document.getElementById('signupEmail');
var signUpPassword=document.getElementById('signupPassword');

var loginEmail=document.getElementById('loginEmail');
var loginPass=document.getElementById('loginPassword');

function signUp(){
    if(signUpName.value!="" && signUpEmail.value!="" && signUpPassword.value!=""){
        var user ={
            name:signUpName.value,
            email:signUpEmail.value
        };
        //console.log(user);
        //console.log(database);
        auth.createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value)
        .then(function(res){
        database.child('users/'+res.uid).set(user);
            loginSignup(signupEmail.value,signUpPassword.value);
            //alert('Registered!!');
        })
        .catch(function(err){
            alert(err);
        })
    }
    else{
        alert('Please fill all fields then click Signup');
    }
//console.log(database);
//console.log('zzz');
}

function login(){
    if ((!(loginEmail.value === "")) && (!(loginPass.value === ""))) {
        firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPass.value)
        .then(function(res){

        database.child('users/'+res.uid).once('value',function(snap){
            var aj=snap.val();
            var ak=snap.key;
            aj=JSON.stringify(aj);
            ak=JSON.stringify(ak);
            localStorage.setItem('userLogin',aj);
            localStorage.setItem('userKey',ak);
            //console.log('Login success');
            window.location="mainpage.html";
        });
        
        })
        .catch(function(err){
            alert(err);
        })
    }
    else if (((loginEmail.value === "")) && (!(loginPass.value === ""))) {
        alert("Please enter email then press Log In button!");
        loginEmail.focus();
    }
    else if ((!(loginEmail.value === "")) && ((loginPass.value === ""))) {
        alert("Please enter password then press Log In button!");
        loginPass.focus();
    }
    else if ((loginEmail.value === "") && (loginPass.value === "")) {
        alert("Please enter email and password then press Log In button!");
        loginEmail.focus();
    }
}

function loginSignup(email,pass){
    
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function(res){
    
        database.child('users/'+res.uid).once('value',function(snap){
            var aj=snap.val();
            var ak=snap.key;
            aj=JSON.stringify(aj);
            ak=JSON.stringify(ak);
            
            localStorage.setItem('userLogin',aj);
            localStorage.setItem('userKey',ak);
           
            window.location="mainpage.html";
            
        }); 
        })
        .catch(function(err){
            alert(err);
        })
    }