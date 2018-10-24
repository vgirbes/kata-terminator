const Distance = require('./Distance')

class ClosestFirst extends Distance {
  constructor(objectivesList) {
    super(objectivesList)
  }

  isFarOrNear(accPosition, currentPosition) {
    return this.vectorMod(accPosition) < this.vectorMod(currentPosition)
  }
}

module.exports = ClosestFirst