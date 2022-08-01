function submitAnswers(){
    var total=4;
    var score=0;
    //get user input
    //document.forms is a Web API which could be used to get an element from the form.Here, we try to access the "value(a/b/c/d)" of which answer/radio btn is selected
    var q1=document.forms["quizForm"]["q1"].value;
    var q2=document.forms["quizForm"]["q2"].value;
    var q3=document.forms["quizForm"]["q3"].value;
    var q4=document.forms["quizForm"]["q4"].value;
    
    //validation
    //eval() makes the code more efficient rather than checking using q1,q2,q3,a4 4 times.
    for(let i=1;i<=total;i++){
        if(eval('q'+i)==null || eval('q'+i) == ''){
            alert("you missed question "+i);
            return false
        }
    }
    
    //set correct answers, correct answers are stored in an array
    var answers=["b","a","d","b"];
    
    
    //check answers, if the value submitted is right, score is incremented
    for(let i=1;i<=total;i++){
            if(eval('q'+i)==answers[i-1]){
                score++;
            }
        }
    
    
    //display results
    var results=document.getElementById('results');
    results.innerHTML='<h3>You scored <span>'+score+'</span> out of <span>'+total+'</span></h3>';


    //this form submitted or recorded.
    return false;

}