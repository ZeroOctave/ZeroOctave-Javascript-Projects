let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
let upi = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let lowi = "abcdefghijklmnopqrstuvwxyz";
let numi = '1234567890';
let speci = '@#$_-+=';


function press() {
    let len = document.getElementById('length').value;
    let el = document.getElementById("pass");
    let up = document.getElementById("up").checked;
    let low = document.getElementById("low").checked;
    let num = document.getElementById("num").checked;
    let spec = document.getElementById("spec").checked;
    let pass = "";
    if (low) {
        var char = Math.floor(Math.random()
            * lowi.length + 1);
        pass += lowi.charAt(char)
    }
    if (up) {
        var char = Math.floor(Math.random()
            * upi.length + 1);

        pass += upi.charAt(char)
    }
    if (num) {
        var char = Math.floor(Math.random()
            * numi.length + 1);

        pass += numi.charAt(char)
    }
    if (spec) {
        var char = Math.floor(Math.random()
            * speci.length + 1);

        pass += speci.charAt(char)
    }
    for (; pass.length <= len;) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }

    console.log(pass);
    const shuffle = [...pass].sort(() => Math.random() - .5).join('');
    el.textContent = shuffle;
}