const router = require("express").Router()

const CardModel = require("../model/card.schema");
const ListModel = require("../model/list.schema");

router.post("/card", async (req, res, next) => {
    const { title, listId, status } = req.body;
    try {
        // const list = await ListModel.findById(listId);
        // if (!list) {
        //     return res.status(404).json({ message: 'List not found' });
        // }

        const newCard = await CardModel.create({ title, status })
        // list.cardId.push(newCard._id.toString());
        // await list.save();
        return res.status(200).send(newCard);
    } catch (error) {
        next(error);
        res.status(500).send({ message: error.message })
    }
})

router.get("/card", async (req, res, next) => {
    const { title, listId } = req.body;
    try {
        const newCard = await CardModel.find()
        return res.status(200).send(newCard);
    } catch (error) {
        next(error);
        res.status(500).send({ message: error.message })
    }
})

router.put("/card", async (req, res, next) => {
    const { title, status, cardId, description, deadline, members } = req.body;
    try {
        if (!cardId) {
            res.status(400).send({ message: "Please enter cardId" })
        }
        const newCard = await CardModel.findById(cardId)
        newCard.status = status;
        newCard.title = title;
        newCard.description = description;
        newCard.deadline = new Date(deadline)

        const exitMembers = newCard.members.find(el => el === members)
        if (exitMembers) {
            newCard.members.filter(el => el !== members)
        } else {
            newCard.members.push(members)
        }
        await newCard.save();
        return res.status(200).send(newCard);
    } catch (error) {
        next(error);
        res.status(500).send({ message: error.message })
    }
})

router.put("/card/updatePositions", async (req, res, next) => {
    const { listId, cards } = req.body;
    try {
        // const newCard = await CardModel.findById(cardId)

        const updatePromises = cards.map(async (card) => {
            return await CardModel.findByIdAndUpdate(card._id, { position: card.position });
        });

        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Card positions updated successfully' });
    } catch (error) {
        next(error);
        res.status(500).send({ message: error.message })
    }
})

module.exports = router