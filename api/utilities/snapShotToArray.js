const snapshotToArray = (snapshot) => {
  let returnArr = []

  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.data()
    returnArr.push(item)
  })
  return returnArr
}

module.exports = snapshotToArray
