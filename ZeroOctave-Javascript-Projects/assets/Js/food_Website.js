const submit_btn=document.getElementById("submit_btn");
const mainone=document.getElementById("mainone");
const ingridient=document.getElementById("ingridient");
const nothing=document.getElementById("nothing");


const image_container=document.getElementById("image_container");
const recipe_name=document.getElementById("recipe_name");
const info=document.getElementById("info");
const full_recipe=document.getElementById("full_recipe");
const stepsone=document.getElementById("stepsone");
const cross_btn=document.getElementById("cross_btn");
const steps_img=document.getElementById("steps_img");
const thefirst_name=document.getElementById("thefirst_name");
const thefirst_step=document.getElementById("thefirst_step");
const ytvideolink=document.getElementById("ytvideolink");

const secondimage_container=document.getElementById("secondimage_container");
const secondrecipe_name=document.getElementById("secondrecipe_name");
const secondinfo=document.getElementById("secondinfo");
const secondfull_recipe=document.getElementById("secondfull_recipe");

const thirdimage_container=document.getElementById("thirdimage_container");
const thirdrecipe_name=document.getElementById("thirdrecipe_name");
const thirdinfo=document.getElementById("thirdinfo");
const thirdfull_recipe=document.getElementById("thirdfull_recipe");

const fourthimage_container=document.getElementById("fourthimage_container");
const fourthrecipe_name=document.getElementById("fourthrecipe_name");
const fourthinfo=document.getElementById("fourthinfo");
const fourthfull_recipe=document.getElementById("fourthfull_recipe");




const firstimg=document.getElementById("firstimg");
const secondimg=document.getElementById("secondimg");
const thirdimg=document.getElementById("thirdimg");
const fourthimg=document.getElementById("fourthimg");

// const getalert =(event)=>{
//     event.preventDefault();
//     mainone.classList.remove("hide");
// }


// submit_btn.addEventListener("click", getalert);


const getrecipe=async(event)=>{
    event.preventDefault();
    let ingridientval=ingridient.value;
    if(ingridientval===""){
        nothing.classList.remove("hide");
        mainone.classList.add("hide");
        stepsone.classList.add("hide");
    }else{
        mainone.classList.remove("hide");
        nothing.classList.add("hide");
        stepsone.classList.add("hide");
        let url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingridientval}`;
        console.log(url);
        const response =await fetch(url);
        const data =await response.json();
        const arrdata=[data];
        console.log(arrdata[0].meals[0].strMeal);
        recipe_name.innerHTML=arrdata[0].meals[0].strMeal;
        firstimg.src=arrdata[0].meals[0].strMealThumb;
        info.innerHTML=arrdata[0].meals[0].strArea;
        const show_recipe=()=>{
            stepsone.classList.remove("hide");
            mainone.classList.add("hide");
            thefirst_name.innerHTML=arrdata[0].meals[0].strMeal;
            thefirst_step.innerHTML=arrdata[0].meals[0].strInstructions;
            steps_img.src=arrdata[0].meals[0].strMealThumb;
            ytvideolink.src=arrdata[0].meals[0].strYoutube;
            

            const close_steps=()=>{
                mainone.classList.remove("hide");
                stepsone.classList.add("hide");
            }

            cross_btn.addEventListener("click", close_steps);

        }
        full_recipe.addEventListener("click",show_recipe);

        secondrecipe_name.innerHTML=arrdata[0].meals[1].strMeal;
        secondimg.src=arrdata[0].meals[1].strMealThumb;
        secondinfo.innerHTML=arrdata[0].meals[1].strArea;

        thirdrecipe_name.innerHTML=arrdata[0].meals[2].strMeal;
        thirdimg.src=arrdata[0].meals[2].strMealThumb;
        thirdinfo.innerHTML=arrdata[0].meals[2].strArea;

        fourthrecipe_name.innerHTML=arrdata[0].meals[3].strMeal;
        fourthimg.src=arrdata[0].meals[3].strMealThumb;
        fourthinfo.innerHTML=arrdata[0].meals[3].strArea;
        console.log(arrdata[0].meals.length);
    submit_btn.addEventListener("click",getrecipe);
    }
}
submit_btn.addEventListener("click",getrecipe);