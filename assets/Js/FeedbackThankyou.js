var element = document.getElementsByClassName("rating-container")[0];
var sendBtn = document.getElementsByClassName('#btn');

sendBtn.addEventListener("click", reply);
function reply() {
  var elems = document.querySelector(".active");
    if(elems !=null) {
    panel.innerHTML =`
    <div id="thanks"><img src="../assets/Images/FeedbackThankyou/reply.jpg" alt=":)">
    <strong> THANK YOU !!</strong>
    <br>
    <p> your feedback is really fruitful for your website , it helps to improve our website </p>
    </div>`
    }
}



element.addEventListener("click", myFunction);
function myFunction(e) {
		var elems = document.querySelector(".active");
    if(elems !=null) {
      elems.classList.remove("active");
    }
    e.target.className = "active";
	}