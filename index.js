const express= require("express") ;
const users = require("./MOCK_DATA.json") ;
const fs = require("fs") ;
const port = 8000 ;
const app = express() ;


app.use((req, res, next)=>{
    fs.appendFile("logs.txt", `${Date.now()}:: ${req.method} :: ${req.ip} :: ${req.path}\n`, (err, data)=>{
        console.log("Logged ", req.method) ;
        next() ;
    }) ;
})
//routes
app.get("/", (req, res)=>{
    // The home page is showing the info about paths of the server.
    res.write("for JSON data\n")
    res.write("/api/users : to get the info about all users\n") ;
    res.write("/api/users/x : x is any integer 0<x<50 ... used to ger info about person with that id\n");
    res.write("For HTML data \n") ;
    res.write("/users  =>  returns data of all users \n") ;
    res.write("/users/id => returns data of specified id\n") ;
    res.end() ;
})
// For Returning JSON data, needed when requesting device is an android, ios phone or other than computer browsers
app.get("/api/users", (req,res)=>{
    res.send(users) ;
}) ;

app.get("/api/users/:id", (req, res)=>{

    const  id = req.params.id ;
    if(id > users.length){
        res.end("Enter valid data") ;
    }
    const current_user = users.find((a)=> a.id == id) ;
    res.json(current_user) ;

})

// For returning HTML data
app.get("/users", (req, res)=>{
    /* //using loop 
    t= users.length ;
    for(let i =0 ; i<t; i++){
        res.write(users[i].first_name + " " + users[i].last_name + "\n") ;
    }
    res.end() ;

    */  

    //using map function

    const html = `
        <ul> 
            ${users.map((i)=> `
                <li>id = ${i.id}</li>
                <li>first name = ${i.first_name}</li>
                <li>Last name = ${i.last_name}</li>
                <li>Email = ${i.email}</li>
                <li>Gender = ${i.gender}</li>
                <br/>
                `)}
        </ul>
    `
    res.send(html) ;
}) ;

app.get("/users/:id", (req,res)=>{

    const id = req.params.id ;
    if(id > users.length){
        res.end("Enter valid data") ;
    }
    const data = users.find((i)=> i.id == id) ;
    res.send(`
    id = ${data.id} <br>
    first name = ${data.first_name} <br>
    last name = ${data.last_name} <br> 
    email = ${data.email} <br> 
    gender = ${data.gender} <br>
        `)  ;
})

// For post HTTP calls 
// A post call determines creating a data , in our case we will create a user 
app.use(express.urlencoded({extended:false})) ;
app.post("/users", (req, res)=>{

    console.log(req.body) ;


    const obj = {
        "id" :  users.length +1 , 
        "first_name" :  req.body.fname ,
        "last_name" : req.body.lname ,
        "email" :  req.body.email ,
        "gender" : req.body.gender 
    } ;
    users.push(obj) ;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        res.end("User created successfully") ;
    }) ;

    //Below method creates a user using query parameters which is not used in production
    /*
    const obj = {
        "id" : users.length +1,
        "first_name" : req.query.fname,
        "last_name" : req.query.lname ,
        "email" : req.query.email,
        "gender" : req.query.gender ,
    }

    users.push(obj) ;

    res.end("User created successfully") ;

    */

}) ;

app.patch("/users", (req, res)=>{
    const id =  req.body.id -1;
    
    users[id].email = req.body.email ;
    users[id].first_name = req.body.fname ;
    users[id].last_name = req.body.lname ;
    users[id].gender = req.body.gender ;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{

        res.end(`Data of user with id ${id+1}, has been updated successfully`) ;
    })

});

app.delete("/users", (req,res)=>{
    const id = Number(req.body.id) - 1 ;
    users[id].email = undefined ;
    users[id].gender = undefined ;
    users[id].first_name = undefined ;
    users[id].last_name = undefined ;

    
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        res.end(`user with id ${id+1} has been deleted`) ; 
        
    }) ;
});

app.listen(port, ()=>{console.log(`server started at port${port}`)}) ;

