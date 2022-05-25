var addEvent = (document.addEventListener) ? 
    function (elm,ev,cb) {elm.addEventListener(ev,cb,false);} : 
function (elm,ev,cb) {elm.attachEvent("on"+ev, function(e){cb.call(elm, e);});};

addEvent(window, "load", function init() {
    var formField = document.getElementById("encdecForm");
    var inputs = formField.getElementsByTagName("input");
    addEvent(formField, "submit", function (evt) {
        (evt.preventDefault) ? evt.preventDefault() : evt.returnValue=false;
        var values = DomController.getValues(inputs);
        if (!values.flg) {DomController.setResult("( N/A )"); return false;}
        var isEncrypt = DomController.checkRadio(inputs);
        var ipLength = values.ip.length;
        var keyLength = values.key.length;
        while (ipLength > keyLength) {
            values.key += values.key;
            keyLength = values.key.length;
        }
        for (var s=0, _1=_2=_3=result=""; s<ipLength; s++) {
            _1 = VigenereAlgorithm.assign(values.ip.charAt(s));
            _2 = VigenereAlgorithm.assign(values.key.charAt(s));
            _3 = VigenereAlgorithm[isEncrypt](_1, _2);

            result += VigenereAlgorithm.assign(_3);
        }
        if (result == -1) {DomController.setResult("Error Occur"); return false;}
        DomController.setResult(result);
    });
});

var DomController = {
    getValues : function (inputs) {
        var values = {};
        values.flg = true;
        for (var i=0, l=inputs.length; i<l; i++) {
            switch (inputs[i].id) {
                case "ip" : values.ip = inputs[i].value.toLowerCase(); break;
                case "key": values.key= inputs[i].value.toLowerCase(); break;
            }
        }
        for (target in values) {
            if (values[target] !== values.flg) {
                if (values[target].match(/[^A-Z]/i) || values[target] == "") {
                    values.flg = false;
                }
            }
        }
        return values;
    },
    checkRadio : function (inputs) {
        for (var i=0, l=inputs.length; i<l; i++) {
            if (inputs[i].type === "radio" && inputs[i].checked) {
                return inputs[i].value;
            }
        }
    },
    setResult : function (str) {
        document.getElementById("result").value = str;
    }
}

var VigenereAlgorithm = {
    encrypt : function (source, key){
        return (source + key) % 26;
    },
    decrypt : function (cipher, key){
        return (cipher - key + 26) % 26;
    },
    assign : function (value) {
        var abc = "abcdefghijklmnopqrstuvwxyz";
        return (isFinite(value)) ? abc.charAt(+value) : abc.indexOf(value);
    }
}
