//Input Variables

var submit=document.querySelector(".submit");
var date=document.querySelector("#date");


var state=document.querySelector(".state");
var districtname=document.querySelector(".districtname")


//Output Variables
var content=document.querySelector(".content");
var district=document.querySelector(".districtnames");
var stateoutput=document.querySelector(".statesoutput");

function formatDate(date){
    var dArr=date.toString().split("-");
    return(dArr[2]+"-"+dArr[1]+"-"+dArr[0])
}



state.addEventListener("click",function(){
    stateoutput.innerHTML=""
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
    .then(response=>response.json())
    .then(data=>{
        var i;
        for(i=0;i<37;i++)
        {
            stateoutput.innerHTML+="<option value="+data["states"][i]["state_id"]+">"+data["states"][i]["state_name"]+"</option><br>"
        }

    })
})



districtname.addEventListener("click",function(){
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+state.value+'')
    .then(response=>response.json())
    .then(data=>{
        district.innerHTML=""
        var i;
        console.log(data["districts"].length)
        for(i=0;i<=data["districts"].length;i++)
        {
            district.innerHTML+="<option value="+data["districts"][i]["district_id"]+">"+data["districts"][i]["district_name"]+"</option><br>"
        }
        
    })
})


submit.addEventListener("click",function(){  
    district.innerHTML=""
    fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id='+districtname.value+'&date='+formatDate(date.value)+'')
    .then(response=>response.json())
    .then(data=>{
        var i,j,flag=0;
        content.innerHTML="";
        content.innerHTML+="<h1>Slots Available:</h1><hr><br>"
        for(i=0;i<data["centers"]["length"];i++)
        {
            var no_of_sessions=data["centers"][i]["sessions"]["length"];
            for(j=0;j<no_of_sessions;j++)
            {
                var slotsValue=data["centers"][i]["sessions"][j]["available_capacity"]
                var hospitalValue=data["centers"][i]["name"]
                var dateofslotValue=data["centers"][i]["sessions"][j]["date"]
                var minAgeLimit=data["centers"][i]["sessions"][j]["min_age_limit"]
                var dose1=data["centers"][i]["sessions"][j]["available_capacity_dose1"]
                var dose2=data["centers"][i]["sessions"][j]["available_capacity_dose2"]
                if(slotsValue>0&&minAgeLimit===18)
                {
                    content.innerHTML+="<h3>"+hospitalValue+"<br>"+dateofslotValue+"<br><a href='https://selfregistration.cowin.gov.in/' target='_blank'>"+slotsValue+" Slots Open</a></h3>"+"Dose 1: "+ dose1+" "+"Dose 2: "+dose2+"<br><br>";
                    flag=1;
                }

            }
        }
        if(flag==0)
            content.innerHTML="<h3>No Slots Available, Check again later.<h3>";

    })
    
    .catch(err=>alert("Please enter correct data!"))
})
