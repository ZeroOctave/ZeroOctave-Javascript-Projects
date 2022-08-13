        var txtNumber = document.getElementById('txtNumber');
        var txtInterval = document.getElementById('txtInterval');
        var btnGenerate = document.getElementById('btnGenerate');
        var ans = document.getElementById('ans');
        
        document.addEventListener('DOMContentLoaded', onFocus);
        btnGenerate.addEventListener('click', onClick);
        txtInterval.addEventListener('keydown', onKeyDown);
        txtNumber.addEventListener('keydown', onKeyDown);
         
        function onClick() {
            let count = 0;
            if (!validateNumber(txtNumber.value)) {
                while (count <= txtInterval.value) {
                    ans.innerHTML += parseFloat(txtNumber.value) + ' X ' + count + ' = ' + (parseFloat(txtNumber.value) * count) + '<br>';
                    count++;
                }
                validateInterval(txtInterval.value);
            }
            return count;
        }
        
        function validateNumber(number) {
            let ret = false;
            if (number == '') ret = true;
            else if (number != '' && ans != '') ans.innerHTML = '';
            return ret;
        }
        
        function validateInterval(interval) {
            let ret = false;
            if (interval > 100) {
                ans.innerHTML = '';
                ret = true;
            }
            return ret;
        }
        
        function onKeyDown(e) {
            if (e.key === 'e') e.preventDefault();
        }
        
        function onFocus() {
            txtNumber.focus();
        }