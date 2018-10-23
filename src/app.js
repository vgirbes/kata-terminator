const app = {
  request: function (obj) {
    let expectedResponse = [];

    switch(obj['attack-mode']) {
      case 'closest-first':
        expectedResponse = this.closest(obj.radar)
        break

      case 'furthest-first':
        expectedResponse = this.furthest(obj.radar)
        break

      case 'avoid-crossfire':
        expectedResponse = this.avoidCrossfire(obj.radar)
        break

      case 'tx-first':
        expectedResponse = this.txFirst(obj.radar)
        break
    }

    return this.parseTargets(expectedResponse)
  },

  distance: function (point) {
    return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2))
  },

  closest: function (obj) {
    const result = obj.reduce((acc, value, index) => {
      if (acc) {
        if (this.distance(acc.position) < this.distance(value.position)) {
          return acc;
        }
      }

      return value;
    })

    return result;
  },

  furthest: function (obj) {
    const result = obj.reduce((acc, value, index) => {
      if (acc) {
        if (this.distance(acc.position) > this.distance(value.position)) {
          return acc
        }
      }

      return value
    })

    return result
  },

  txFirst: function (obj) {
    let radar = []

    for (let i = 0; i <= obj.length - 1; i++) {
      let objectives = obj[i]
      
      let onlyTX = objectives.targets.filter((value) => {
        return value.type === 'T-X'
      })
      
      if (onlyTX.length > 0) {
        objectives.targets = onlyTX
        radar.push(objectives)
      }
    }

    return radar
  },

  avoidCrossfire: function (obj) {
    let radar = []

    for (let i = 0; i <= obj.length - 1; i++) {
      let objectives = obj[i]

      let withHumans = objectives.targets.filter((value) => {
        return value.type === "Human"
      })

      if (withHumans.length <= 0) {
        radar.push(objectives)
      }
    }

    return radar
  },

  parseTargets: function (positionTargets) {
    if (positionTargets.targets.length > 0) {
      const targets = positionTargets.targets.map((value) => {
        return value.type
      })

      positionTargets.targets = targets
    }

    return positionTargets
  }
}

module.exports = app