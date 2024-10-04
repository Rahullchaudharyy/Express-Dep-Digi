import express from 'express'
// import { config } from 'dotenv';
import 'dotenv/config'
import logger from './utils/logger.js'
import morgan from 'morgan'

const app = express()

const port = process.env.PORT

// app.get('/',(req,res)=>{
//     res.send('Hey I am rahul student of  hitesh chaudhary aka chai or code ')
// })


app.use(express.json())
const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );
const OrderData = [];
let nextId = 1;

app.post('/Order', (req, res) => {
   logger.info('Created Sucessfully')
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