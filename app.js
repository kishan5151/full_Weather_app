const express=require("express");
const app=express();
const PORT=process.env.PORT || 8000;
const path=require("path");
const hbs=require("hbs");
const requests=require("requests");

const viewpath=path.join(__dirname+"/view")
app.set("view engine","hbs");
app.set("views",viewpath);

//partial
hbs.registerPartials(path.join(__dirname,"partials"))

app.use(express.static(path.join(__dirname+"/public")));
app.get("/",(req,res)=>{
    res.render("index",{})
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/weather",(req,res)=>{
    res.render("weather")
});

app.get("*",(req,res)=>{
    res.render("404error")
});

app.listen(PORT,()=>{
    console.log("Your port is live.");
});