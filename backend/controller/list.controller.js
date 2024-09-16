require("dotenv").config()
const router = require("express").Router()

const ListModel = require("../model/list.schema")

router.post("/list", async (req, res, next) => {
    const { title } = req.body;
    try {

        // const newList = await ListModel.create({ title, cardId })
        const newList = await ListModel.create({ title })
        return res.status(200).send(newList);
    } catch (error) {
        next(error);
        res.status(500).send({ message: error.message })
    }
})

router.get("/list", async (req, res, next) => {
    try {
        const newList = await ListModel.find()
        return res.status(200).send(newList);
    } catch (error) {
        next(error);
        res.status(500).send({ message: error.message })
    }
})

router.put('/list', async (req, res, next) => {
    const { title, listId, cardId } = req.body;
    try {
        const oldList = await ListModel.findById(listId);
        if (!oldList) {
            return res.status(404).json({ message: 'List not found' });
        }

        // const newListCards = list.cardId.filter(id => id !== cardId)
        // list.cardId.push(newCard._id.toString());
        // await list.save();

        oldList.title = title;
        await oldList.save();

        res.status(200).send({ message: "Succes Update List", oldList })

    } catch (error) {
        next(error)
    }
})

router.delete('/list', async (req, res, next) => {
    const { id } = req.body;

    try {
        const delList = await ListModel.findByIdAndDelete(id)
        res.status(200).send({ message: "Delete List " + id })
    } catch (error) {
        next(error)
    }
})

module.exports = router


