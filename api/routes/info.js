const express = require("express")
const router = express.Router()
const infoControllers = require("../controllers/infoControllers")

router.post("/", infoControllers.createAccount)
router.put("/:accountId", infoControllers.updateAccount)
router.get("/all", infoControllers.getAllAccount)
router.get("/sort/", infoControllers.sortAccountWithKey)
router.get("/filter", infoControllers.filterAccountByKey)

module.exports = router
