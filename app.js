//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "You don’t have to work in the technology industry or offer image moderation software or video moderation API  like we do to benefit from the best tech blogs today.In hopes of lighting your content marketing strategy on fire, we created this technology blogs list to help you find the most influential tech bloggers to follow for your business. You may also find some of these information technology blogs interesting from a personal perspective, so dig in and learn something new today."
const aboutContent = "We are a bunch of Tech Geeks who are in a mission to deep dive into the sea of technology.We post Daily Tech Updates in this WebApp to share what we are learning everyday and give back to those enthusiasts who want to unleash their tech passion.If you consider yourself a tech maniac, come join us in this beautiful journey because this is the den of all Tech Bloggers.";
const contactContent = "Feel Free to Reach us at: akash19.ms00@gmail.com or give a missed call to: +91-6290902391";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shamindra:test123@cluster0.rmmzh.mongodb.net/blogDB", {useNewUrlParser: true,useUnifiedTopology:true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/admin",(req,res)=>{
  res.render("admin")
});

app.post("/admin",(req,res)=>{
  let loginInfo={
    username : req.body.username,
    password : req.body.password
  }
  const username="Shamindra19"
  const password="13000318056"
  if(username===loginInfo.username && password===loginInfo.password)
  {
    res.redirect("/compose")
  }
  else{
      res.redirect("/admin")
  }
});
let port=process.env.PORT;
if(port == null || port == "")
{
  port = 3000;
}
//app.listen(port)
app.listen(port, function() {
  console.log("Server started Successfully");
});
