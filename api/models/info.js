const uuid = require("uuid")
const moment = require("moment")
const R = require("ramda")
const firestore = require("../helpers")
const snapshotToArray = require("../utilities/snapShotToArray")

const status = {
  PENDING: "pending",
}
class User {
  async get() {
    const snapshot = await firestore.db.collection("info").get()
    const result = snapshotToArray(snapshot)
    return result
  }
  async create({ name, contact, description }) {
    const id = uuid.v4()
    const docRef = firestore.db.collection("info").doc(id)
    await docRef.set({
      name,
      contact,
      description,
      createdAt: firestore.FieldValue.serverTimestamp(),
      status: status.PENDING,
      id,
    })
    return id
  }

  async findAccountById({ accountId }) {
    const docRef = await firestore.db.collection("info").doc(accountId).get()
    return docRef.data()
  }
  async update({ accountId, status }) {
    const accountExist = await this.findAccountById({ accountId })
    if (!accountExist) {
      const error = new Error("Can't update, accountId not found")
      error.statusCode = 400
      throw error
    }
    const docRef = firestore.db.collection("info").doc(accountId)
    await docRef.update({
      status,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    })
  }
  async sortBy({ sortKey, orderKey }) {
    const snapshot = await firestore.db
      .collection("info")
      .orderBy(sortKey, orderKey)
      .get()
    const result = snapshotToArray(snapshot)
    return result
  }
  async filter({ status, startTime, endTime, listBy = "createdAt" }) {
    const collection = firestore.db.collection("info")
    let timeResult
    let statusResult
    const start = moment(startTime).startOf("day").toString()
    const end = moment(endTime).endOf("day").toString()
    const startWithOffset = moment(start).utcOffset("+0700").toDate()
    const endWithOffset = moment(end).utcOffset("+0700").toDate()
    if (status) {
      statusResult = await collection.where("status", "in", status).get()
    } else {
      statusResult = await collection.get()
    }
    timeResult = await collection
      .where(listBy, ">=", startWithOffset)
      .where(listBy, "<=", endWithOffset)
      .get()
    const statusArr = snapshotToArray(statusResult)
    const timeArr = snapshotToArray(timeResult)
    return R.intersection(statusArr, timeArr)
  }
}

module.exports = User
