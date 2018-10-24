const ClosestFirst = require('./classes/ClosestFirst')
const CrossFire = require('./classes/CrossFire')
const Distance = require('./classes/Distance')
const FurthestFirst = require('./classes/FurthestFirst')
const TargetType = require('./classes/TargetType')
const TxFirst = require('./classes/TxFirst')

const attackType = {
  'closest-first': ClosestFirst,
  'furthest-first': FurthestFirst,
  'tx-first': TxFirst,
  'avoid-crossfire': CrossFire,
}

const app = {
  request: function (objectiveList) {
    const targetType = new TargetType(objectiveList.radar)

    for (let index in objectiveList['attack-mode']) {
      let mode = objectiveList['attack-mode'][index]
      targetType.addFilter(attackType[mode])
    }

    return targetType.exec().parse()
  },
}

module.exports = app