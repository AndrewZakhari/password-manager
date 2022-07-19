import mongoose from "mongoose"

export default async function handler(req, res) {
    console.log(req.body) 

    res.json(req.body)
}