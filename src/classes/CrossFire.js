class Crossfire {
  constructor(objectiveList) {
    this.objectiveList = objectiveList
    this.targetToAvoid = "Human"
  }

  setTargetToAvoid(target) {
    this.targetToAvoid = target
  }

  getObjectives() {
    let radarObjectives = []

    for (let i = 0; i <= this.objectiveList.length - 1; i++) {
      let objectives = this.objectiveList[i]

      let withHumans = objectives.targets.filter((value) => {
        return value.type === this.targetToAvoid
      })

      if (withHumans.length <= 0) {
        radarObjectives.push(objectives)
      }
    }

    return radarObjectives
  }
}

module.exports = Crossfire