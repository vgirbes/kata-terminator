class TxFirst {
  constructor(objectiveList) {
    this.objectiveList = objectiveList
  }

  getObjectives() {
    let radarObjectives = []

    for (let i = 0; i <= this.objectiveList.length - 1; i++) {
      let objectives = this.objectiveList[i]

      let onlyTX = objectives.targets.filter((value) => {
        return value.type === 'T-X'
      })

      if (onlyTX.length > 0) {
        objectives.targets = onlyTX
        radarObjectives.push(objectives)
      }
    }

    return radarObjectives
  }
}

module.exports = TxFirst