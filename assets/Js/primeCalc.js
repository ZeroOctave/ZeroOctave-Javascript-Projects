// pre-computation of Sieve of Eratosthenes
function seieve(){
    let arr = [];
    let output = [];
    
    //setting max value
    const MAX = 1e7;

    const upperLimit =  Math.sqrt(MAX);

    for(let i =2;i<MAX;i++){
        arr.push(1);
    }

    for(let i =2; i<=upperLimit;i++){
        if(arr[i]){
            for(let j = i*i;j<MAX;j+=i){
                arr[j]=0;
            }
        }
    }

    for(let i =2;i<MAX;i++){
        if(arr[i]){
            output.push(i)
        }
    }
    return output;
}

// storing primes in array
let primeArray =  seieve();

// begin calculation of prime factors of the supplied number
function calculate(number){
    let factors= [];
    let factorization = [];
    let factorExponent ={};
    for(let i = 0;i<primeArray.length;i++){
        if(primeArray[i]>number){
            break;
        }
        else{
            if(number%primeArray[i]==0){
                factors.push(primeArray[i]);
                while(number%primeArray[i]==0){
                    factorization.push(primeArray[i]);
                    number/=primeArray[i];
                }
            }
        }
    }
    factors.forEach((i)=>factorExponent[i]=0);
    factorization.forEach((i)=>factorExponent[i]++);

    // adding update values to table
    let factorCell = document.getElementById("edit").rows[1].cells[1];
    factorCell.innerHTML = factors;

    let factorizationCell = document.getElementById("edit").rows[2].cells[1];
    factorizationCell.innerHTML = display(factorization);

    let exponetCell = document.getElementById("edit").rows[3].cells[1];
    exponetCell.innerHTML = display2(factorExponent);

}



// onclick of button {find out factor}
let num =()=>{
    let inputNum = document.getElementById("input").value;
    if(inputNum <=0){
        alert("Please enter a positive integer to get started");
    }
    else if(inputNum == 1){
        alert("1 is neither prime nor composite. It's a unique number.")
    }
    else{
        calculate(inputNum) 
    }
}

// onclick of button {reset}
let reset = ()=>{
    document.getElementById("edit").rows[1].cells[1].innerHTML = " ";
    document.getElementById("edit").rows[2].cells[1].innerHTML = " ";
    document.getElementById("edit").rows[3].cells[1].innerHTML = " ";

    document.getElementById("input").value = "";
}



// text manipulation functions to display on webpage
function display(factorization){
    let str = "";
    for (let i = 0; i < factorization.length; i++) {
        if( i==factorization.length-1){
            str+=factorization[i].toString();
            break;
        }
        else{
            str+=factorization[i].toString() + " * ";
        }
        
    }
    return str;

}
function display2(factorExponent){
    let expArray = Object.keys(factorExponent);
    let valArray = Object.values(factorExponent)
    let str = "";
    for (let i = 0; i <expArray.length; i++) {
        str+= expArray[i]+"<sup>"+valArray[i]+"</sup>";
        if(i!=expArray.length-1){
            str+="* "
        }   
    }
    return str;
}