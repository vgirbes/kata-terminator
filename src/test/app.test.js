const app = require('../app');

const request = {
  "radar": [{
    "position": { "x": 0, "y": 40},
    "targets": [
      { "type": "T-X", "damage": 60 },
      { "type": "HK-Bomber", "damage": 90 },
      { "type": "Human" }
    ]
  },
  {
    "position": { "x": 50, "y": 80},
    "targets": [
      { "type": "HK-Bomber", "damage": 90 },
      { "type": "Human" }
    ]
  },
  {
    "position": { "x": 10, "y": 20},
    "targets": [
      { "type": "T-X", "damage": 60 },
      { "type": "HK-Bomber", "damage": 90 },
      { "type": "Human" }
    ]
  }]
}

describe('App', () => {
  it('El T-850 debe de atacar la zona más cercana', () => {
    request['attack-mode'] = 'closest-first';

    const expectedResponse = {
      "position": { "x": 10, "y": 20 },
      "targets": [ "T-X", "HK-Bomber", "Human" ]
    }

    const response = app.request(request)

    expect(response).toEqual(expectedResponse)
  })
  
  it('El T-850 debe de atacar la zona más lejana', () => {
    request['attack-mode'] = 'furthest-first';

    const expectedResponse = {
      "position": { "x": 50, "y": 80 },
      "targets": [ "HK-Bomber", "Human" ]
    }

    const response = app.request(request)

    expect(response).toEqual(expectedResponse)
  })

  it('El T-850 no debe de atacar la zona con humanos', () => {
    request['attack-mode'] = 'avoid-crossfire';

    const expectedResponse = []

    const response = app.request(request);

    expect(response).toEqual(expectedResponse);
  })

  it('El T-850 debe priorizar los objetivos T-X', () => {
    request['attack-mode'] = 'tx-first';

    const expectedResponse = [{
      "position": { "x": 0, "y": 40 },
      "targets": [ "T-X" ]
    },
    {
      "position": { "x": 10, "y": 20 },
      "targets": [ "T-X" ]
    }]

    const response = app.request(request)

    expect(response).toEqual(expectedResponse)
  })
})