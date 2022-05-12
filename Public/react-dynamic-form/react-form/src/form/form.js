import './form.css';
import '../validate/validate';
import { useRef, useState } from 'react';
function Form(props){
    const eN=props.errN;
    const eE=props.errE;
    const eP=props.errP;
    const eC=props.errC;
    var [es,setEs]=useState();
    var [ei,setEi]=useState();
    var [name,setName]=useState();
    var [email,setEmail]=useState();
    var [password,setPassword]=useState();
    var [con,setCon]=useState();
    function printN(event){
        name=event.target.value;
        setName(name);
    }
    function printE(event){
        email=event.target.value;
        setEmail(email);
    }
    function printP(event){
        password=event.target.value;
        setPassword(password);
    }
    function printC(event){
        con=event.target.value;
        setCon(con);
    }
    var nameRef=useRef(null);
    var emailRef=useRef(null);
    var passRef=useRef(null);
    function submitForm(event){
        event.preventDefault();
        
        if((eN.includes("Valid"))&&(eE.includes("Valid"))&&(eP.includes("Valid"))&&(eC.includes("Confirmed"))){
            let data={
                name:name,
                email:email,
                password:password
            }
            console.log(data);
            let options={
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(data)
            }
            es="submitted";
            ei="Your form is successfully submitted!";
            setEs(es);
            setEi(ei);
            fetch("http://localhost:6700/login",options).then((res)=>{
                res.json();
            }).then((res)=>{
                console.log("data added");
            })

        }
        else{
            
            es="Please fill correctly";
            ei="Please fill every field correctly";
            setEi(ei);
            setEs(es);
        }
    }
    return(
        <>
        <div id="reform">
        <h1 id="fo">React Form</h1>
        <form>
            <p>Enter your name *</p>
            <input type="text" name='name' ref={nameRef} onChange={(event)=>printN(event)} minLength={1} placeholder="Type your name...." onInput={(event)=>props.Name(event)} required/>
            <p className='error'>{props.errN}</p>
            <p>Enter your email-address *</p>
            <input type="email" name='email' ref={emailRef} onChange={(event)=>printE(event)} minLength={5} placeholder="Type your Email...." onInput={(event)=>props.Email(event)} required />
            <p className='error'> {props.errE} </p>
            <p>Enter your password *</p>
            <input type="password" name='password' onChange={(event)=>printP(event)} ref={passRef} minLength={8} placeholder="Type your Password...." onInput={(event)=>props.Password(event)} required/>
            <p className='error'>{props.errP}</p>
            <p>Confirm your password *</p>
            <input type="password" minLength={8} onChange={(event)=>printC(event)} placeholder="Type your Password...." onInput={(event)=>props.Confirm(event)} required/><br/>
            <p className='error'>{props.errC}</p>
    <input type="submit" value={es} onClick={(event)=>submitForm(event)} />
        </form>
        <h3 id="info">{ei}</h3></div>
        </>
    )
}
export default Form;