var alphabet="abcdefghijklmnopqrstuvwxyz";
var newalpha= "";

function shift()
{
    for(let i=0; i< alphabet.length; i++)
    {
        let offset=(i+4)%alphabet.length;
        newalpha+=alphabet[offset];
    }
}


function encode(){
    
    shift();
    var res= "";
    let message= document.getElementById("EncryptMessage").value;
    let result = "";
    message = message.toLowerCase();
    for (let i = 0; i < message.length; i++){
        let index = alphabet.indexOf(message[i]);
        result += newalpha[index];
    }
    res= ("Your encrypted message: ").concat(result);
    window.alert(res);
}


function decode(){

    shift();
    var res2="";
    let message2= document.getElementById("DecryptMessage").value;
    let result = "";
    message2 = message2.toLowerCase();
    for (let i = 0; i < message2.length; i++){
        let index = newalpha.indexOf(message2[i]);
        result += alphabet[index];
    }
    res2= ("Your decrypted message: ").concat(result);
    window.alert(res2);
}
