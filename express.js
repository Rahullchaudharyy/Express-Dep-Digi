import express from 'express'

const app = express()

const port = 3000;

// app.get('/',(req,res)=>{
//     res.send('Hey I am rahul student of  hitesh chaudhary aka chai or code ')
// })


app.use(express.json())

const OrderData = [];
let nextId = 1;

app.post('/Order', (req, res) => {

    const { Product, Price } = req.body;

    OrderData.push({ id: nextId++, Product, Price })

    res.status(201).send(OrderData)


})
app.get('/Order/:id', (req, res) => {


    const data = OrderData.find(id => id.id === parseInt(req.params.id))

    if (!data) {
        res.status(404).send('Reqested data not found !!')
    }

    res.status(201).send(data)



})
app.put('/Order/:id', (req, res) => {


    const data = OrderData.find(id => id.id === parseInt(req.params.id))

    if (!data) {
        res.status(404).send('Reqested data not found !!')
    }
    const { Product, Price } = req.body;
    data.Product =Product 
      data.Price =Price
    res.status(201).send(`Data Updated Sucessfully!! Updated Data is here ${data}`)

})
app.delete('/Order/:id', (req, res) => {


    const data = OrderData.find(id => id.id === parseInt(req.params.id))
    const Index =  data.findIndex(i=>i.id === parseInt(req.params.id))
     
    if (Index < 0) {
        res.status(404).send("Not found")
    }
    data.splice(Index,1);

    res.status(201).send('Deleted Sucessfully !!!');



})

app.get('/Order', (req, res) => {
    res.status(201).send(OrderData)
})
app.listen(port, () => {
    console.log(`The port is listenig on ${port}`)
})