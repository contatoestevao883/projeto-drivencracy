import dayjs from "dayjs"
import { db } from "../database/database.config.js"

export async function createPoll(req, res) {
    const { title, expireAt } = req.body

    if (!title) return res.sendStatus(422)
    
    try {
        if (!expireAt || expireAt === "") {
            const expire = dayjs().add(30, "day").format('YYYY-MM-DD h:mm') 
            const poll = { title, expireAt: expire } 
            await db.collection("polls").insertOne(poll)
            res.sendStatus(201)
        }else {
            const poll = { title, expireAt }
            await db.collection("polls").insertOne(poll)
            res.sendStatus(201)
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getPolls(req, res) {
    try {
        const polls = await db.collection("polls").find().toArray()
        res.send(polls)
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}
