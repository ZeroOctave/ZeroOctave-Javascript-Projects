const rgb_pattern = /rgb\(\s*(\d{0,3})\s*,\s*(\d{0,3})\s*,\s*(\d{0,3})\s*\)/
const hex_pattern = /#[0-9a-fA-F]{6}/
const cmyk_pattern = /cmyk\(\s*(\d{0,3})\%\s*,\s*(\d{0,3})\%\s*,\s*(\d{0,3})\%\s*,\s*(\d{0,3})\%\s*\)/
const hsl_pattern = /hsl\(\s*(\d{0,3})\s*,\s*(\d{0,3})\%\s*,\s*(\d{0,3})\%\s*\)/

const color_with_names = {'aliceblue': 'f0f8ff', 'antiquewhite': 'faebd7', 'aqua': '00ffff', 'aquamarine': '7fffd4', 'azure': 'f0ffff', 'beige': 'f5f5dc', 'bisque': 'ffe4c4', 'black': '000000', 'blanchedalmond': 'ffebcd', 'blue': '0000ff', 'blueviolet': '8a2be2', 'brown': 'a52a2a', 'burlywood': 'deb887', 'cadetblue': '5f9ea0', 'chartreuse': '7fff00', 'chocolate': 'd2691e', 'coral': 'ff7f50', 'cornflowerblue': '6495ed', 'cornsilk': 'fff8dc', 'crimson': 'dc143c', 'cyan': '00ffff', 'darkblue': '00008b', 'darkcyan': '008b8b', 'darkgoldenrod': 'b8860b', 'darkgray': 'a9a9a9', 'darkgrey': 'a9a9a9', 'darkgreen': '006400', 'darkkhaki': 'bdb76b', 'darkmagenta': '8b008b', 'darkolivegreen': '556b2f', 'darkorange': 'ff8c00', 'darkorchid': '9932cc', 'darkred': '8b0000', 'darksalmon': 'e9967a', 'darkseagreen': '8fbc8f', 'darkslateblue': '483d8b', 'darkslategray': '2f4f4f', 'darkslategrey': '2f4f4f', 'darkturquoise': '00ced1', 'darkviolet': '9400d3', 'deeppink': 'ff1493', 'deepskyblue': '00bfff', 'dimgray': '696969', 'dimgrey': '696969', 'dodgerblue': '1e90ff', 'firebrick': 'b22222', 'floralwhite': 'fffaf0', 'forestgreen': '228b22', 'fuchsia': 'ff00ff', 'gainsboro': 'dcdcdc', 'ghostwhite': 'f8f8ff', 'gold': 'ffd700', 'goldenrod': 'daa520', 'gray': '808080', 'grey': '808080', 'green': '008000', 'greenyellow': 'adff2f', 'honeydew': 'f0fff0', 'hotpink': 'ff69b4', 'indianred': 'cd5c5c', 'indigo': '4b0082', 'ivory': 'fffff0', 'khaki': 'f0e68c', 'lavender': 'e6e6fa', 'lavenderblush': 'fff0f5', 'lawngreen': '7cfc00', 'lemonchiffon': 'fffacd', 'lightblue': 'add8e6', 'lightcoral': 'f08080', 'lightcyan': 'e0ffff', 'lightgoldenrodyellow': 'fafad2', 'lightgray': 'd3d3d3', 'lightgrey': 'd3d3d3', 'lightgreen': '90ee90', 'lightpink': 'ffb6c1', 'lightsalmon': 'ffa07a', 'lightseagreen': '20b2aa', 'lightskyblue': '87cefa', 'lightslategray': '778899', 'lightslategrey': '778899', 'lightsteelblue': 'b0c4de', 'lightyellow': 'ffffe0', 'lime': '00ff00', 'limegreen': '32cd32', 'linen': 'faf0e6', 'magenta': 'ff00ff', 'maroon': '800000', 'mediumaquamarine': '66cdaa', 'mediumblue': '0000cd', 'mediumorchid': 'ba55d3', 'mediumpurple': '9370db', 'mediumseagreen': '3cb371', 'mediumslateblue': '7b68ee', 'mediumspringgreen': '00fa9a', 'mediumturquoise': '48d1cc', 'mediumvioletred': 'c71585', 'midnightblue': '191970', 'mintcream': 'f5fffa', 'mistyrose': 'ffe4e1', 'moccasin': 'ffe4b5', 'navajowhite': 'ffdead', 'navy': '000080', 'oldlace': 'fdf5e6', 'olive': '808000', 'olivedrab': '6b8e23', 'orange': 'ffa500', 'orangered': 'ff4500', 'orchid': 'da70d6', 'palegoldenrod': 'eee8aa', 'palegreen': '98fb98', 'paleturquoise': 'afeeee', 'palevioletred': 'db7093', 'papayawhip': 'ffefd5', 'peachpuff': 'ffdab9', 'peru': 'cd853f', 'pink': 'ffc0cb', 'plum': 'dda0dd', 'powderblue': 'b0e0e6', 'purple': '800080', 'rebeccapurple': '663399', 'red': 'ff0000', 'rosybrown': 'bc8f8f', 'royalblue': '4169e1', 'saddlebrown': '8b4513', 'salmon': 'fa8072', 'sandybrown': 'f4a460', 'seagreen': '2e8b57', 'seashell': 'fff5ee', 'sienna': 'a0522d', 'silver': 'c0c0c0', 'skyblue': '87ceeb', 'slateblue': '6a5acd', 'slategray': '708090', 'slategrey': '708090', 'snow': 'fffafa', 'springgreen': '00ff7f', 'steelblue': '4682b4', 'tan': 'd2b48c', 'teal': '008080', 'thistle': 'd8bfd8', 'tomato': 'ff6347', 'turquoise': '40e0d0', 'violet': 'ee82ee', 'wheat': 'f5deb3', 'white': 'ffffff', 'whitesmoke': 'f5f5f5', 'yellow': 'ffff00', 'yellowgreen': '9acd32'};

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
    }else{
        if(to_convert.toLowerCase() in color_with_names){
            let name = to_convert.toLowerCase();
            conv_rgb = Con_hex_to_rgb(color_with_names[name]);
            let main_rgb = conv_rgb;
            conv_rgb = `rgb(${conv_rgb[0]}, ${conv_rgb[1]}, ${conv_rgb[2]})`;
            conv_hex = "#"+ color_with_names[name];
            conv_cmyk = rgb_to_cmyk(...main_rgb);
            conv_cmyk = `cmyk(${conv_cmyk[0]}%, ${conv_cmyk[1]}%, ${conv_cmyk[2]}%, ${conv_cmyk[3]}%)`;
            conv_hsl = rgb_to_hsl(...main_rgb);
            conv_hsl = `hsl(${conv_hsl[0]}, ${conv_hsl[1]}%, ${conv_hsl[2]}%)`;
        }
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
    if(hex[0] == "#"){
        hex = hex.substring(1).match(/.{1,2}/g);
    }else{
        hex = hex.match(/.{1,2}/g);
    }
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
        return [0,0,0,100];
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
