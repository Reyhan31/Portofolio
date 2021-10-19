function validation(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var male = document.getElementById('male').checked;
    var female = document.getElementById('female').checked;
    var checkbox = document.getElementById('checkbox').checked;
    var passwordContainsNumber = 0;
    var passwordContainsAlphabet = 0;
    for(var i=0;i<password.length;i++){
        if(passwordContainsAlphabet == 1 && passwordContainsNumber == 1){
            break;
        }
        else if(password[i] >= 'a' &&  password[i] <= 'z'){
            passwordContainsAlphabet = 1;
        }
        else if(password[i] >= 'A' &&  password[i] <= 'Z'){
            passwordContainsAlphabet = 1;
        }
        else if(password[i] >= '0' &&  password[i] <= '9'){
            passwordContainsNumber = 1;
        }
    }

    // Validasi Name
    if(name == ""){
        alert("Name must be filled !");
    }
    else if(name.length < 8 || name.length > 20){
        alert("Name must be 8 - 20 characters !");
    }

    // Validasi Email
    else if(email == ""){
        alert("Email must be filled !");
    }
    else if(!email.includes('@')){
        alert("Email must includes at least one '@' symbol  !");
    }
    else if(!email.endsWith('.com') && !email.endsWith('.co.id') && !email.endsWith('.ac.id')){
        alert("Email domain must be valid !");
    }

    // Validasi Password
    else if(password == ""){
        alert("Password must be filled !");
    }
    else if(password.length < 8 || password.length > 20){
        alert("Password must be 8 - 20 characters !");
    }
    else if(passwordContainsAlphabet == 0){
        alert("Password must contains at least 1 alphabet !");
    }
    else if(passwordContainsNumber == 0){
        alert("Password must contains at least 1 number !");
    }


    // Validasi gender
    else if(male == false && female == false){
        alert("Gender must be choosen !");
    }

    // Validasi checkbox
    else if(checkbox == false){
        alert("You must agree the terms & conditions first !");
    }

    // Success Validation
    else{
        alert("Register Success");
    }

}