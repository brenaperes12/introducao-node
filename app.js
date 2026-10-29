const express = require("express")
const app = express()
const path = require("path")
const fs = require('fs')
const { error } = require("console")
app.use(express.json())


const eu = {
    nome: "Gerardo Castro",
    curso: "Fullstack",
    contato: "+55 (11) 4002-8922"
}

let produtos = [
    {
        id: 1,
        nome: "Mouse",
        preco: 120,
        desc: "Mouse caro dms"
    },
    {
        id: 2,
        nome: "Teclado",
        preco: 20,
        desc: "Presta não"
    },
    {
        id: 8,
        nome: "Fone de ouvido",
        preco: 100,
        desc: "TWS Headphone frush frush"
    },
    {
        id: 4,
        nome: "Mousepad",
        preco: 12,
        desc: "Bem finin"
    },
    {
        id: 1,
        nome: "Tela Arzopa",
        preco: 600,
        desc: "Full HD"
    },
]

function salvar() {
    const dadosjson = JSON.stringify(produtos, null, 2)
    fs.writeFile("usuarios.json", dadosjson, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Arquivo Salvo')
        }
    })
}

function ler() {
    // fs.readFileSync("usuraios.json", (err, dados) => {
        // if(err) throw error
        // produtos = JSON.parse(dados)
        // console.log("Arquivo lido com sucesso");
    // })
    let dados = fs.readFileSync("usuarios.json")
    produtos = JSON.parse(dados)
}


app.get("/", (req, res) => {
    res.send(`
        <h1 style='color: red'>${eu.nome}</h1>
        <p>${eu.curso}</p>
        <p>Contato: ${eu.contato}</p>
        `)
})

app.get("/sobre", (req, res) => {
    let caminho = path.join(__dirname, "curriculo.html")
    res.sendFile(caminho)
})

app.get("/usuario", (req, res) => {
    res.json(eu)
})

app.get("/produtos", (req, res) => {
    ler()
    res.json(produtos)
})

// Formatação para procurar por id o produto, caso não ache ele vai deixar uma mensagem dizendo que não achou! 

app.get("/produtos/:id", (req, res) => {
    ler()
    let encontrado = produtos.find((produto) => produto.id == req.params.id)
    if (encontrado) res.json(encontrado)
    else res.send("Não encontrei!")
})

app.post("/produtos", (req, res) => {
    // produtos.push(req.body)
    if (req.body.nome && req.body.preco && req.body.desc) {
        produtos.push({
            id: req.body.id,
            nome: req.body.nome,
            preco: req.body.preco,
            desc: req.body.desc
        })
        salvar()
        res.status(201).send(req.body)
    } else {
        res.status(400).send("Digite todos os campos")
    }

})

app.delete("/produtos/:id", (req, res) => {
    existe = produtos.filter((produto) => produto.id == req.params.id)

    if (existe.length > 0) {
        let listanova = produtos.filter((produto) => produto.id != req.params.id)
        produtos = listanova
        salvar()
    } else {
        res.status(404).send("Não achei!")
    }
    res.send("Apaguei!")
})


app.patch("/produtos/:id", (req, res) => {
    let encontrado = produtos.find((produto) => produto.id == req.params.id)
    if(encontrado) {
    let novoproduto = {}
        if (req.query.nome) novoproduto.nome = req.query.nome
        if (req.query.preco) novoproduto.preco = Number(req.query.preco)
        if (req.query.desc) novoproduto.desc = req.query.desc
        Object.assign(encontrado, novoproduto)
        salvar()
        res.json(encontrado)
} else {
         res.status(404).send("Não achei!")
    }
    
})


app.listen(3000, () => {
    console.log("Servidor iniciado em http://localhost:3000");
})

// Rotas /contato e /curriculo.	
// Devem retornar uma página estruturada e estilizada em HTML e CSS INLINE

// npm init
// npm install express