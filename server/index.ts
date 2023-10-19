import express , {Express,Request,Response} from 'express'
import { GetKnowledge } from './service/service'
import bodyParser from 'body-parser'
import cors from 'cors';
import { Savefile } from './database/file';

const app:Express = express()
app.use(bodyParser.json())
app.use(cors())

app.get("/",(req:Request,res:Response) => {
    console.log(GetKnowledge())
    res.send(GetKnowledge())
}) 

app.put("/save",(req:Request,res:Response) => {
    Savefile(req.body)
    res.send("success")
})


const PORT:number|string = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Connect to port => ${PORT} \n`))