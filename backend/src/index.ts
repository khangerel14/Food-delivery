import express from "express"
import cors from "cors"


const app = express()

app.use(cors())
app.use(express.json())

const PORT = 8000;

app.get('/', (_: any, res: any) => {
    res.status(200).send({ success: true, msg: 'Hello World'})
});

app.listen(PORT, () => {
    console.log('Server is running.');
})