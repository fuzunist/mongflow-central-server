const {findOne}= require("../services/User")
const httpStatus = require("http-status/lib");


const verify = (req, res) => {
    findOne(req.user.uuid)
        .then(({ rows }) => {
            if (!rows[0]) return res.status(httpStatus.NOT_FOUND).send({ message: 'There is no such record.' })
            const user = { ...rows[0] }
            delete user.passwordhash
            res.status(httpStatus.OK).send(user)
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}


module.exports=verify