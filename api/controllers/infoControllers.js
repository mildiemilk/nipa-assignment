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

const updateAccount = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

const sortAccountWithKey = async (req, res, next) => {
  try {
    const { sortKey, orderKey } = req.query
    if (!sortKey || !orderKey) {
      const error = new Error("Can't sort, query params does not match")
      error.statusCode = 400
      throw error
    }
    const user = new User()
    const result = await user.sortBy({
      sortKey,
      orderKey,
    })
    res.status(200).json({
      result,
      message: "Update Status success",
    })
  } catch (error) {
    next(error)
  }
}

const filterAccountByKey = async (req, res) => {
  try {
    const { status, startTime, endTime } = req.query
    if (!status || !startTime || !endTime) {
      const error = new Error("Can't filter, query params does not match")
      error.statusCode = 400
      throw error
    }
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
  } catch (error) {
    next(error)
  }
}

exports.createAccount = createAccount
exports.updateAccount = updateAccount
exports.getAllAccount = getAllAccount
exports.sortAccountWithKey = sortAccountWithKey
exports.filterAccountByKey = filterAccountByKey
