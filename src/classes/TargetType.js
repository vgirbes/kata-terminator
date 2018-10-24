class TargetType {
  constructor(objectiveList) {
    this.objectiveList = objectiveList
    this.filterList = []
  }

  addFilter(filter) {
    this.filterList.push(filter)
  }

  exec () {
    for(let index in this.filterList) {
      this.objectiveList = (new this.filterList[index](this.objectiveList)).getObjectives()
    }

    return this
  }

  parse () {
    const positionTargets = this.objectiveList

    if (positionTargets.length > 0) {
      for (var i = 0; i < positionTargets.length; i++) {
        const targets = positionTargets[i].targets.map((value) => {
          return value.type
        })

        positionTargets[i].targets = targets
      }
    }

    return positionTargets
  }
}

module.exports = TargetType