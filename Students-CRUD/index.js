const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());

let data = require("./MOCK_DATA.json");
// console.log('data:', data)

app.get("/", (req, res) => {
    res.send("Welcome to Home page");
});

app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "MOCK_DATA.json"));
});

app.post("/users", (req, res) => {
    let user = req.body;
    data.push(user);
    fs.writeFile("MOCK_DATA.json", JSON.stringify(data), (err) => {
        console.log('err:', err)

    })
    res.send("User added Successfully");
    
});

app.patch("/users", (req, res) => {
    let user = req.body;
    console.log('user:', user.id)
    let patchUser = data[user.id-1];
    
    res.send(
        `User is Successfully Patced form \n ${JSON.stringify(
            patchUser
        )}\n to \n${JSON.stringify(user)} `
    );
})

app.delete("/users/:id", (req, res) => {
    
    console.log('req.params.id:', req.params.id)
    let deletedUser = data.filter(({id}) => {
        return id == req.params.id;
    } )
    res.send(`${JSON.stringify(deletedUser)}\n User is Successfully Deleted`)
})

let PORT = 2323;
app.listen(PORT, (req, res) => {
    console.log(`Server is using port ${PORT}`);
});
