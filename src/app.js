const app = {
  request: function (obj) {
    let expectedResponse = [];

    switch(obj['attack-mode']) {
      case 'closest-first':
        expectedResponse = this.closest(obj)
        break

      case 'furthest-first':
        expectedResponse = this.furthest(obj)
        break

      case 'avoid-crossfire':
        expectedResponse = this.avoidCrossfire(obj)
        break

      case 'tx-first':
        expectedResponse = this.txFirst(obj)
        break
    }

    return expectedResponse
  },

  distance: function (point) {
    return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2))
  },

  closest: function (obj) {
    const result = obj.radar.reduce((acc, value, index) => {
      if (acc) {
        if (this.distance(acc.position) < this.distance(value.position)) {
          return acc;
        }
      }

      return value;
    })


    return this.selectTargets(result);
  },

  furthest: function (obj) {
    const result = obj.radar.reduce((acc, value, index) => {
      if (acc) {
        if (this.distance(acc.position) > this.distance(value.position)) {
          return acc;
        }
      }

      return value;
    })

    return this.selectTargets(result);
  },

  txFirst: function (obj) {
    let radar = []

    for (let i = 0; i <= obj.radar.length - 1; i++) {
      let objectives = this.selectTargets(obj.radar[i])
      
      let onlyTX = objectives.targets.filter((value) => {
        return value === 'T-X'
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

    for (let i = 0; i <= obj.radar.length - 1; i++) {
      let objectives = this.selectTargets(obj.radar[i])

      if (!objectives.targets.includes('Human')) {
        radar.push(objectives)
      }
    }

    return radar
  },

  selectTargets: function (positionTargets) {
    const targets = positionTargets.targets.map((value) => {
      return value.type
    })

    positionTargets.targets = targets

    return positionTargets
  }

}

module.exports = app