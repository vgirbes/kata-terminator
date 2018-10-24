class Distance {
  constructor(objectiveList) {
    this.objectiveList = objectiveList
  }

  vectorMod(point) {
    return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2))
  }

  getObjectives() {
    const result = this.objectiveList.reduce((acc, value, index) => {
      if (acc) {
        if (this.isFarOrNear(acc.position, value.position)) {
          return acc
        }
      }

      return value
    })

    return [result]
  }
}

module.exports = Distance