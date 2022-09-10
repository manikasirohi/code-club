const express =require ("express");
const mongoose= require ("mongoose");
const bodyParser=require ("body-parser")
var router = express.Router();
// mongoose.connect("mongodb://0.0.0.0:27017/codeclub",{useNewUrlParser:true});
mongoose.connect("mongodb+srv://manika:manika@cluster0.z8dv2uk.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});
const app= express();
app.set('view engine','ejs');
// app.use(express.static(__dirname + '/public'));
// var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const codeSchema= new mongoose.Schema({
    fullName: String,
    email: String,
    contactNo: Number,
    trainingType: String,
    courseType: String
})

const Entry= mongoose.model("Entry", codeSchema);


app.post("/register",(req,res)=>{
    const personName= req.body.name;
    const personEmail= req.body.myemail;
    const personContact= req.body.contact;
    const trainingType= req.body.trainingType;
    const course= req.body.course;

    const entry =new Entry({
        fullName: personName,
        email: personEmail,
        contactNo: personContact,
        trainingType: trainingType,
        courseType: course
    })
entry.save(function(err){
    if (!err){
        res.redirect("/thankyou");
    }
  });
// res.redirect("/thankyou");
})

app.get("/",(req,res)=>{
    res.render('index')
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/course",(req,res)=>{
    res.render("course")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/privacy",(req,res)=>{
    res.render("privacy")
})

app.get("/thankyou",(req,res)=>{
    res.render('thankyou')
})


app.listen(process.env.PORT,function(){
    console.log('Running at Port 3000');
  
  });

module.exports = router;