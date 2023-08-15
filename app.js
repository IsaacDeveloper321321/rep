import express from "express";
import sequelize from "sequelize"
import Data from "ejs";
import e from "express";

const app = express();

app.set('views', "views")

let array = [{nome:"Junior", email:"Junior@gmail.com", matricula:2003, dataNasc: "2005-09-21", status: "ATIVO"},
             {nome:"Maria", email:"Maria@gmail.com", matricula:2004, dataNasc: "2005-06-20", status: "ATIVO"}    

]

app.listen(3000);

app.get('/', (req, res) => {
    res.render("index.ejs", { array:array })
})
app.get('/delete/:id', (req, res) => {
    const { matricula } = req.params;
    let newArray = [];
    for (let i = 0; i < array.length; i++){
        if (array[i].matricula == matricula){
            console.log(array[i]);
        } else {
            newArray.push(array[i])
        }
    }
    array = newArray
});
app.get('/update/:matricula', (req, res) => {
    const { matricula } = req.params;
    for (let i = 0; i < array.length; i++){
        if (array[i].matricula == matricula){
            const User = array[i];
            res.render("update.ejs", { User:User }) 
        } 
    }
});
app.post('/update', (req, res) => {
    const { matricula, nome, email, status, dataNasc } = req.body
    for (let i = 0; i < array.length; i++){
        if (array[i].matricula == matricula){
            array[i].nome = nome;
            array[i].email = email;
            array[i].status = status;
            array[i].dataNasc = dataNasc;
        }
    }
    res.redirect('/')
})
app.get('/create', (req, res) => {
    res.render("create.ejs")
})
app.post('/create', (req, res) => {
    const { matricula, nome, email, status, dataNasc } = req.body
    const novoUsuario = {nome:nome, matricula:matricula, email:email, status:status, dataNasc: dataNasc}
    array.push(novoUsuario);
    res.redirect('/')
})