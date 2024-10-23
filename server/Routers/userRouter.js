const express = require('express')
const { createuser, loguser } = require('../controllers/usercontroller')

const router = express.Router()

router.route('/createuser').post(createuser)
router.route('/loggin').post(loguser)

module.exports = router