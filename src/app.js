import express from "express"
import cors from "cors"
import pollRouter from "./routes/poll.routes.js"
import choicesRouter from "./routes/choice.routes.js"
import voteRouter from "./routes/vote.routes.js"


const app = express()
app.use(cors())
app.use(express.json())
app.use(pollRouter, choicesRouter, voteRouter)

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))