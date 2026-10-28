const express = require("express")
const app = express()
app.use(express.json())
const dados = {
    nome: "Gerardo Castro",
    cargo: "Desenvolvedor Fullstack",
    contato: "+55 (85) 98774-4745"
}

let produtos = [
    {
        id: 1,
        nome: "Mouse",
        preco: 80,
        desc: "Mouse gamer RGB"
    },
    {
        id: 2,
        nome: "Teclado",
        preco: 100,
        desc: "Teclado gamer RGB"
    },
    {
        id: 3,
        nome: "Monitor",
        preco: 399,
        desc: "Monitor portátil"
    },
    {
        id: 4,
        nome: "Headphone",
        preco: 25,
        desc: "Fone de ouvido básico"
    },
    {
        id: 5,
        nome: "Tablet",
        preco: 700,
        desc: "Cintiq Tablet"
    },
    {
        id: 6,
        nome: "Suporte de Headset",
        preco: 150,
        desc: "Suporte com leds"
    },
]

app.get("/produtos", (req, res) => {
    res.json(produtos)
})

app.get("/produtos/:id", (req, res) => {
    res.json(produtos[req.params.id-1])
})

app.get("/usuario", (req, res) => {
    res.json(dados)
})

app.get("/contato", (req, res) => {
    res.send(`<h1 style="color: Red">${dados.nome}</h1>
        <h4>${dados.cargo}</h4>
        <p>Contato: ${dados.contato} whatsapp</p>`)
})

app.post("/produtos", (req, res) => {
    produtos.push({
        id: produtos.length+1,
        nome: req.body.nome,
        preco: req.body.preco,
        desc: req.body.desc
    })
    res.send(req.body)
})

app.delete("/produtos/:id", (req, res) => {
    produtos.
    existe = produtos.filter((produto) => produto.id == req.params.id)
    if (existe.length > 0) {
        let listanova = produtos.filter((produto) => produto.id != req.params.id)
        produtos = listanova
    } else {
        res.status(404).send("Não achei!")
    }
    res.send("Apaguei!")
})

app.patch("/produtos/:id", (req, res) => {
    let encontrado = produtos.find( (produto) => produto.id == req.params.id)
    if (encontrado) {
        encontrado.nome = req.query.nome
        encontrado.preco = Number(req.query.preco)
        encontrado.desc = req.query.desc
        }
    res.json(encontrado)
})

app.listen(3000, () => {
    console.log("Servidor iniciado em http://localhost:3000");
})



// Rotas /contato e /curriculo.	
// Devem retornar uma página estruturada e estilizada em HTML e CSS INLINE

// npm init
// npm install express