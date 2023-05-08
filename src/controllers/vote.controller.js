import { ObjectId } from "mongodb"
import dayjs from "dayjs"
import { db } from "../database/database.config.js"


export async function pollVote(req, res) {
    const { id } = req.params
    try {
        const choices = await db.collections("choices").findOne({ _id: new ObjectId(id) })
        if (!choices) return res.sendStatus(404)
        const dateOfVote = dayjs().format("YYYY-MM-DD")
        await db.collection("votes").insertOne({ date: dateOfVote, choiceId: id })
        res.sendStatus(201)
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function pollResult(req, res) {
    const { id }  = req.params
    
    try {
        const poll = await db.collection("polls").findOne({ _id: new ObjectId(id) })
        if (!poll) return res.sendStatus(404)
        const choice = await db.collection("choices").findOne( { _id: new ObjectId(id) })
        const vote = await db. collection("votes").find( { _id: new ObjectId(id) }).toArray().length
        const resultOfVotes = { title: poll.title, expiredAt: poll.expiredAt, 
                                result: { title: choice.title, votes: vote }
                              }
        await db.collection("result").insertOne(resultOfVotes)

    } catch (err) {
        res.status(500).send(err.message)
    }
}