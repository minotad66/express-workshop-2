const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const fs = require("fs");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// The extensions 'html' allows us to serve file without adding .html at the end
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { extensions: ["html"] }));

app.get("/", function(req, res) {
  const filePath = __dirname + "/data/posts.json";
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render("index", {
      title: "Darwin Profile", // insert your name instead
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});

app.get("/posts", function(req, res) {
  res.sendFile(__dirname + "/data/posts.json");
});

app.get('/posts/:id', function (req, res) {
  const filePath = __dirname + '/data/posts.json';
  const callbackFunction = function (error, file) {
    const fileData = file.toString();
    const postsJson = JSON.parse(fileData);
    let post = postsJson.filter(id => id.postId === req.params.id);
    console.log(post);
    //const first = post;
    if(post != []){
      res.render(`posts/post`,
      {
        title: post[0].title,
        summary: post[0].summary,
        content: post[0].content,
      });
    }
    else{
      res.render(`post/post`,{title:'no exite esa publicacion'});
    }
  };
  fs.readFile(filePath, callbackFunction);
});

app.get("/my-cv", function(req, res) {
  res.render("my-cv", {
    title: "My cv",
    subholder: "Welcome To My Cv"
  });
});

app.get("/admin", function(req, res) {
  res.render("admin", {
    title: "admin",
    subholder: "Our Admin"
  });
});

app.get("/admin", function(req, res) {
  res.render("admin", {
    title: "admin",
    subholder: "Our Admin"
  });
});

app.get("/admin", function(req, res) {
  res.render("admin", {
    title: "admin",
    subholder: "Our Admin"
  });
});

app.post("/admin", function(req, res) {
  const fs = require("fs");
  const filePath = __dirname + "/../data/posts.json";
  
  const savePost = (newPost, callback) => {
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.error("error reading the file");
        console.error(error);
        return callback(error);
      }
  
      const posts = JSON.parse(file.toString());
      posts.splice(0, 0, newPost);
  
      fs.writeFile(filePath, JSON.stringify(posts, null, 2), error => {
        if (error) {
          console.error("error writing to the file");
          console.error(error);
          return callback(error);
        }
        callback();
      });
    });
  };
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    title: "contact",
    subholder: "Contact Us"
  });
});

// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

