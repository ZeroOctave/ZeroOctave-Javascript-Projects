import Form from "../form/form";
import {useState} from "react";

function Validate(){
    var [eName,setEname]=useState();
var [eEmail,setEemail]=useState();
var [ePassword,setEpassword]=useState();
var [eConfirm,setEconfirm]=useState();
var [password,Setpassword]=useState();
var [name,Setname]=useState();
function letter(str){
    const ltt=/^[a-zA-Z]+$/;
    return ltt.test(str);

}
function special(str){
    const specialChars=/[^A-Z a-z0-9]/;
    return specialChars.test(str);
}
function Checkname(event){
    name=event.target.value;
    let fl=name.charAt(0).toUpperCase();
    Setname(name);
    let l=(event.target.value).length;
    if(!name){
        eName="Please enter your name";
        setEname(eName);
    }
    else if(!(letter(name))){
        eName="Name should not contain any number or special character";
        setEname(eName);
    } 
    else if((name.charAt(0))!==fl){
        eName="First letter of name should be capital";
        setEname(eName);
    }
    else if(l<2){
        eName="Name should contain atleast 2 characters";
        setEname(eName);
    }
    
    else{
        eName="Valid name";
        setEname(eName);
    }

}
function Checkemail(event){
    let email=event.target.value;
    let fl=(event.target.value).charAt(0).toUpperCase();
    if(!email){
        eEmail="Please enter your email";
        setEemail(eEmail);
    }
    else if(!(letter(email.charAt(0)))){
        eEmail="First character of email should be a letter";
        setEemail(eEmail);
    }
    else if((email.charAt(0))===fl){
        eEmail="First letter of the email should be small";
        setEemail(eEmail);
    }
    else if(email.length<5){
        eEmail="Your email must be atleast 5 characters long";
        setEemail(eEmail);
    }
    else if(!(email.includes("@"))){
        eEmail="Your email must contain a '@' ";
        setEemail(eEmail);
    }
    else if(!(email.includes("."))){
        eEmail="Your email must contain '.' ";
        setEemail(eEmail);
    }
    else if(email.length<5){
        eEmail="Please enter a valid email";
        setEemail(eEmail);
    }
    else{
        eEmail="Valid email";
        setEemail(eEmail);
    }
     

}
function Checkpassword(event){
    password=event.target.value;
    Setpassword(password);
    if(!password){
        ePassword="Please enter your password";
        setEpassword(ePassword);
    }
    else if(!(letter(password.charAt(0)))){
        ePassword="Your password must start with a letter";
        setEpassword(ePassword);

    }
    else if(password.length<8){
        ePassword="Your password must be atleast 8 characters long";
        setEpassword(ePassword);
     

    }
    
    
    else if((letter(password))){
        ePassword="Your password must contain special characters or numbers";
        setEpassword(ePassword);
    }
    else{
        ePassword="Valid password";
        setEpassword(ePassword);
    }
}
function Checkconfirm(event){
    let confirm=event.target.value;
    if(confirm!==password){
        eConfirm="Your password must match with your entered password";
        setEconfirm(eConfirm);
    }
    else{
        eConfirm="Confirmed password";
        setEconfirm(eConfirm);
    }
}

    return(
        <Form errN={eName} errE={eEmail} errP={ePassword} errC={eConfirm} Name={(event)=>Checkname(event)} Email={(event)=>Checkemail(event)} Password={(event)=>Checkpassword(event)} Confirm={(event)=>Checkconfirm(event)} />
    )
}
export default Validate;