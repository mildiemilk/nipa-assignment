const User = require("../models/info")

const createAccount = async (req, res) => {
  const { name, contact, description } = req.body
  const user = new User()
  const accountId = await user.create({
    name,
    contact,
    description,
  })

  res.status(200).json({
    accountId,
    message: "Add account success",
  })
}

const getAllAccount = async (req, res) => {
  const user = new User()
  const result = await user.get()
  res.status(200).json({
    result,
    message: "Get data success",
  })
}

const updateAccount = async (req, res) => {
  const { accountId } = req.params
  const { status } = req.body
  const user = new User()
  await user.update({
    status,
    accountId,
  })
  res.status(200).json({
    accountId,
    message: "Update Status success",
  })
}

const sortAccountWithKey = async (req, res) => {
  const { sortKey, orderKey } = req.query
  const user = new User()
  const result = await user.sortBy({
    sortKey,
    orderKey,
  })
  res.status(200).json({
    result,
    message: "Update Status success",
  })
}

const filterAccountByKey = async (req, res) => {
  const { status, startTime, endTime } = req.query
  const user = new User()
  const result = await user.filter({
    status,
    startTime,
    endTime,
  })
  res.status(200).json({
    result,
    message: "Filter Status success",
  })
}

exports.createAccount = createAccount
exports.updateAccount = updateAccount
exports.getAllAccount = getAllAccount
exports.sortAccountWithKey = sortAccountWithKey
exports.filterAccountByKey = filterAccountByKey
