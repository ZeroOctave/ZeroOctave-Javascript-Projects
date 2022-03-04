const rgb_pattern = /rgb\(\s*(\d{0,3})\s*,\s*(\d{0,3})\s*,\s*(\d{0,3})\s*\)/
const hex_pattern = /#[0-9a-fA-F]{6}/
const cmyk_pattern = /cmyk\(\s*(\d{0,3})\%\s*,\s*(\d{0,3})\%\s*,\s*(\d{0,3})\%\s*,\s*(\d{0,3})\%\s*\)/
const hsl_pattern = /hsl\(\s*(\d{0,3})\s*,\s*(\d{0,3})\%\s*,\s*(\d{0,3})\%\s*\)/

let conv_rgb, conv_hex, conv_cmyk, conv_hsl;

function convert(){
    to_convert = document.getElementById("to_convert").value;
    // console.log(to_convert.match(rgb_pattern))
    if(to_convert.match(rgb_pattern)){
        let match = to_convert.match(rgb_pattern);
        conv_rgb = match[0];
        conv_hex = from_rgb_to_hex(match[1],match[2],match[3]);
        conv_cmyk = rgb_to_cmyk(match[1],match[2],match[3]);
        conv_cmyk = `cmyk(${conv_cmyk[0]}%, ${conv_cmyk[1]}%, ${conv_cmyk[2]}%, ${conv_cmyk[3]}%)`;
        conv_hsl = rgb_to_hsl(match[1],match[2],match[3]);
        conv_hsl = `hsl(${conv_hsl[0]}, ${conv_hsl[1]}%, ${conv_hsl[2]}%)`;
    }else if(to_convert.match(hex_pattern)){
        conv_rgb = Con_hex_to_rgb(to_convert);
        let main_rgb = conv_rgb;
        conv_rgb = `rgb(${conv_rgb[0]}, ${conv_rgb[1]}, ${conv_rgb[2]})`;
        conv_hex = to_convert;
        conv_cmyk = rgb_to_cmyk(...main_rgb);
        conv_cmyk = `cmyk(${conv_cmyk[0]}%, ${conv_cmyk[1]}%, ${conv_cmyk[2]}%, ${conv_cmyk[3]}%)`;
        conv_hsl = rgb_to_hsl(...main_rgb);
        conv_hsl = `hsl(${conv_hsl[0]}, ${conv_hsl[1]}%, ${conv_hsl[2]}%)`;
    }else if(to_convert.match(cmyk_pattern)){
        let match = to_convert.match(cmyk_pattern);
        match = [match["1"], match["2"], match["3"], match["4"]];
        conv_cmyk = to_convert;
        let conv_rgb_temp = cmyk_to_rgb(...match);
        conv_rgb = `rgb(${conv_rgb_temp[0]}, ${conv_rgb_temp[1]}, ${conv_rgb_temp[2]})`;
        conv_hex = from_rgb_to_hex(...conv_rgb_temp);
        conv_hsl = rgb_to_hsl(...conv_rgb_temp);
        conv_hsl = `hsl(${conv_hsl[0]}, ${conv_hsl[1]}%, ${conv_hsl[2]}%)`;
    }else if(to_convert.match(hsl_pattern)){
        let match = to_convert.match(hsl_pattern);
        let conv_rgb_temp = hsl_to_rgb(match[1], match[2], match[3]);
        conv_rgb = `rgb(${conv_rgb_temp[0]}, ${conv_rgb_temp[1]}, ${conv_rgb_temp[2]})`;
        conv_cmyk = rgb_to_cmyk(...conv_rgb_temp);
        conv_cmyk = `cmyk(${conv_cmyk[0]}%, ${conv_cmyk[1]}%, ${conv_cmyk[2]}%, ${conv_cmyk[3]}%)`;
        conv_hsl = to_convert;
        conv_hex = from_rgb_to_hex(...conv_rgb_temp);
    }

    let rgb = document.getElementById("rgb");
    let hex = document.getElementById("hex");
    let cmyk = document.getElementById("cmyk");
    let hsl = document.getElementById("hsl");

    rgb.value = conv_rgb;
    hex.value = conv_hex;
    cmyk.value = conv_cmyk;
    hsl.value = conv_hsl;
}


// RGB <--> HEX //
function from_rgb_to_hex(r,g,b){
    let conv_r = Con_Dec_to_hex(r);
    let conv_g = Con_Dec_to_hex(g);
    let conv_b = Con_Dec_to_hex(b);
    return `#${conv_r}${conv_g}${conv_b}`;
}
function Con_Dec_to_hex(to_convert){
    let base = 16
    let integral_part = parseInt(to_convert);
    let res = [];
    while (parseInt(integral_part) != 0){
        integral_part /= base;
        let element = (integral_part - parseInt(integral_part)) * base;
        if(parseInt(element)<10){
            res.unshift(String.fromCharCode(parseInt(element)+48));
        }else{
            res.unshift(String.fromCharCode(parseInt(element)+55));
        }
    }
    // Check conversion length
    if(res.length==1){
        res.unshift(0);
        return res.join("");
    }else{
        return res.join("");
    }
}
function Con_hex_to_rgb(hex){
    hex = hex.substring(1).match(/.{1,2}/g);
    let temp = 0;
    let base=1;
    let res = [];
    for(i of hex){
        for(element of i){
            if(element >= '0' && element <= '9'){
                temp += (element.charCodeAt(0) - 48) * (16**base);
                base -= 1;
            }else{
                element = element.toUpperCase();
                temp += (element.charCodeAt(0) - 55) * (16**base);
                base -=1;
            }
        }
        res.push(temp);
        base=1;
        temp=0;
    }
    return res;
}
// RGB <--> HEX //


// RGB <--> CMYK //
function rgb_to_cmyk(r,g,b){
    let computedC = 0;
    let computedM = 0;
    let computedY = 0;
    let computedK = 0;

    // Black
    if(r==0 && g==0 && b==0){
        return [0,0,0,1];
    }

    computedC = 1 - (r/255);
    computedM = 1 - (g/255);
    computedY = 1 - (b/255);

    computedK = Math.min(computedC, Math.min(computedM, computedY));

    computedC = ((computedC - computedK) / (1 - computedK)).toFixed(2) *100;
    computedM = ((computedM - computedK) / (1 - computedK)).toFixed(2) *100;
    computedY = ((computedY - computedK) / (1 - computedK)).toFixed(2) *100;
    computedK = (computedK).toFixed(2) *100;
    console.log(computedK)

    return [computedC, computedM, computedY, computedK];
}
function cmyk_to_rgb(c,m,y,k){
    c = ((c / 100) * (1-(k/100))) + (k/100);
    m = ((m / 100) * (1-(k/100))) + (k/100);
    y = ((y / 100) * (1-(k/100))) + (k/100);

    let r = ((1-c)*255).toFixed(0);
    let g = ((1-m)*255).toFixed(0);
    let b = ((1-y)*255).toFixed(0);
    
    return [r,g,b];
}
// RGB <--> CMYK //


// RGB <--> Hsl //
function rgb_to_hsl(r,g,b){
    r = parseInt(r) / 255;
    g = parseInt(g) / 255;
    b = parseInt(b) / 255;
    let max = Math.max(r, Math.max(g, b));
    let min = Math.min(r, Math.min(g, b));
    let luminance_range = max-min;
    let total_luminance = max+min;
    let idk_what_is_this_called = 2 - total_luminance;
    let l = Math.round((total_luminance/2).toFixed(2) * 100);
    let s,h;

    if(l<50){
        s = +(Math.round(luminance_range/total_luminance + "e+2")  + "e-2") * 100;
    }else{
        try{
            s = (luminance_range/(2- total_luminance)).toFixed(2) *100;
        }catch{
            s = 0;
        }
    }

    if(max == r){
        h = (g-b)/luminance_range;
    }else if(max == g){
        h = ((b-r)/luminance_range)+2;
    }else{
        h = ((r-g)/luminance_range)+4;
    }
    h = Math.round(h*60);
    if(h<0){
        h+=360;
    }
    return [h,s,l];
}
function hsl_to_rgb(h,s,l){
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}
// RGB <--> Hsl //
