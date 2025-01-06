const express = require("express")
const app = express()
const PORT = 3000;
const runFlow = require("./langflow")
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.post("/",async (req,res)=>{
  const query = req.body.query;
  const message = await runFlow(query);
  res.json({"message":message})
})

app.listen(PORT,()=>{
  console.log("listening on port ",PORT)
})