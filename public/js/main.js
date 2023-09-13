const today=document.getElementById("day");
const todate=document.getElementById("todate");

const currentDate=new Date();
// console.log(currentDate.getMonth());
const nowday=(x)=>{
    let arr=["Sunday","Monday","Tuesday","Wednesday","Thursday"," Friday","Saturday"]
    return arr[x];
}
const dateform=(x)=>{
    let d=currentDate.getDate();
    if(d=="1"||d=="2"||d=="3"||d=="4"||d=="5"||d=="6"||d=="7"||d=="8"||d=="9"){
        d="0"+d;
    }
    let arr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return `${d}-${arr[x]}`;
}
let day=nowday(currentDate.getDay());
// console.log(currentDate.getDay());
let datemon=dateform(currentDate.getMonth());
// console.log(datemon);
today.innerHTML=day;
todate.innerHTML=datemon;

//API data
let searchbtn=document.getElementById("searchbtn");
let textbox=document.getElementById("textbox");
let emptymess=document.getElementById("emptymess");
let celci=document.getElementById("celci");
let inner=document.getElementById("inner");
const getSymbol=(x)=>{
    if(x=="Sunny")
    {
        inner.innerHTML=`<i class="fa-solid fa-sun fa-beat-fade effect" id="csize" style="color:  #e6de00;"></i>`
    }
    else if(x=="Clouds"){
        inner.innerHTML=`<i class="fa-solid fa-cloud effect" style="color: white;" id="csize"></i>`
    }
    else if(x=="Rain"){
        inner.innerHTML=`<i class="fa-solid fa-cloud-bolt effect" id="csize"></i>`
    }
    else{
        inner.innerHTML=`<i class="fa-solid fa-cloud effect" style="color: white;" id="csize"></i>`
    }
}


const getInfo=async(event)=>{
    // event.preventDefault();
    if(textbox.value=="")
    {
        emptymess.outerHTML='<p id="textbig">Please write a City Name before the search.<p>';
    }
    else{
        try{
            let valur=textbox.value;
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${valur}&units=metric&appid=e866fd44bcf3f84b2dc4f86c22388bbe`
            let respo=await fetch(url);
            let data=await respo.json();
            // console.log(data);
            let arrdata=await [data];
            // await console.log(arrdata);
            let tem=await arrdata[0].main.temp;
            // await console.log(x);
            let status=await arrdata[0].weather[0].main;
            // let status="Sunny"
            // console.log(status);
            let city=await arrdata[0].name;
            // await console.log(city);
            let country=await arrdata[0].sys.country;
            // await console.log(country);

            let sympass=getSymbol(status);
            await document.getElementById("remove").removeAttribute("hidden");
            emptymess.innerHTML=`${city},${country}`
            celci.innerText=`${tem}`
            textbox.value="";
        }
        catch(err){
            // alert("Add Valid city name");
            document.getElementById("remove").setAttribute("hidden","true");
            emptymess.innerHTML='<p id="textbig">Please Enter City Name Properly.<p>';
        }
        
        
    }
}
searchbtn.addEventListener("click",getInfo)
