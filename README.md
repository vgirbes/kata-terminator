<a href="https://codeclimate.com/github/vgirbes/kata-terminator/maintainability"><img src="https://api.codeclimate.com/v1/badges/8386982dff811246fa04/maintainability" /></a>

# kata-terminator
Estimada Kate Brewster,

Lamentamos mucho la muerte de John y comprendemos su dolor, pero la necesitamos en la 
resistencia. Hemos capturado al T-850 que lo abatió, es por ello que precisamos de su ayuda 
para su reprogramación.

Su misión consistirá en crear un nuevo módulo de selección de objetivos que sustituya al 
actual. Este módulo se encarga de seleccionar la siguiente posición a atacar. La unidad de 
control del terminator se comunica mediante peticiones HTTP POST con este módulo, 
proporcionándole los datos que el escáner de visión ha recogido.

Le facilitamos un ejemplo de petición que la unidad de control podría hacer a su módulo:
```json
 {
  "attack-mode": "closest-first",
   "radar": [{
    "position": { "x": 0, "y": 40 },
    "targets": [
     { "type": "T-X", "damage": 60 },
     { "type": "HK-Bomber", "damage": 90 }, 
     { "type": "Human" }
    ]
  }
```
Y la respuesta que debería devolver dada la petición anterior:
```json
 {
  "position": { "x": 0, "y": 40 },
  "targets": [ "HK-Bomber", "T-X" ] 
 }
```
Los tipos de objetivos que el sistema de visión proporcionará son:

  - Human
  - T-X
  - T-900
  - HK-Airstrike
  - HK-Bomber

Y los modos de ataque que tenemos que implementar:
  - closest-first: Atacar las zonas más cercanas.
  - furthest-first: Atacar las zonas más lejanas.
  - avoid-crossfire: No se debe atacar ninguna zona donde se encuentre algún humano.
  - tx-first: Se debe priorizar siempre el ataque sobre los objetivos de tipo T-X.

No debe olvidar que Skynet está construyendo un nuevo ejército de cyborgs, el sistema 
deberá estar preparado para añadir nuevos modos de ataque.

Buena suerte, la resistencia.
