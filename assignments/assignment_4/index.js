const express = require('express');
const faker = require('faker');
const mongoose = require('mongoose');
const user = require('./model/user')
const bodyparser = require('body-parser');
const url = 'mongodb://localhost:27017/assignment_4';
var methodOverride = require('method-override');
mongoose.connect(url)
console.log("connected");
const app = express()
app.use(bodyparser());

app.use(methodOverride("_method"));

app.use(express.static('public'));
app.set('views','./views');
app.set('view engine', 'ejs');



// Craeting dummy data for the first time to display in homepage

// let dummy = []
// async function dummyInsert(){
//     for(let i = 0; i<5; i++){
//         dummy.push({
//             name: faker.name.findName(),
//             email: faker.internet.email(),
//             isPromoted: null
//         })
//     }
//     await user.create(dummy);
// }
// dummyInsert();


app.get("/", async(req, res) =>{
    // res.send("Hii from homepage");
    var data = await user.find();
    // console.log(data);
    res.render("home", { data });
})

app.get("/form", async (req, res) => {
    res.render("form");
});

app.post("/users/add", async (req, res) => {
    addnew = {
      name: req.body.name,
      email: req.body.email,
      isPromoted: null,
    };
    await user.create(addnew);
    res.redirect("/");
});

app.put("/users/:id/", async (req, res) => {
    await user.updateOne({ _id: req.params.id }, [
      { $set: { isPromoted: { $not: "$isPromoted" } } },
    ]);
    res.redirect("/");
});


app.delete("/users/:id/", async (req, res) => {
    await user.deleteOne({ _id: req.params.id });
    res.redirect("/");
});

app.listen(3000, () =>{
    console.log("listening at port 3000");
})