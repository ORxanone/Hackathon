const router = require("express").Router();

const sendInviteEmail = require("../service/invate.service");

router.post('/invite', async (req, res, next) => {
    const { email, boardId } = req.body;

    try {

        const inviteLink = `${process.env.APP_URL}/invite?boardId=${boardId}`;

        await sendInviteEmail(email, inviteLink);

        res.status(200).json({ message: 'Dəvət emaili göndərildi' });

    } catch (error) {
        next(error);
    }
})

module.exports = router;