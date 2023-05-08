import { ObjectId } from "mongodb"
import { db } from "../database/database.config.js"
import dayjs from "dayjs"

export async function pollChoice(req, res) {
    const { title, pollId } = req.body

    try { 
        const pollExist = await db.collection("polls").findOne({ _id: new ObjectId(pollId) })
        if (!pollExist) return res.sendStatus(404)   
        if (!title) return res.sendStatus(422)
        const titleExist = await db.collection("choices").findOne({ title })
        if(titleExist) return res.sendStatus(409)

        const choice = { title, pollId }
        await db.collection("choices").insertOne(choice)
        return res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getPollChoices(req, res) {
    const { pollId } = req.params
    try {
        const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) })
        if (!poll) return res.sendStatus(404)
        
        const choices = await db.collection("choices").find({ _id: new ObjectId(pollId)}).toArray()
        res.send(choices)
    } catch (err) {
        res.status(500).send(err.message)
    }
}