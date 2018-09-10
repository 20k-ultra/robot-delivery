'use strict'

module.exports = (() => {
  class Robot {
    constructor (id, x = 0, y = 0) {
      this.id = id
      this.posX = x
      this.posY = y
      this.deliveries = []
    }

    move (direction) {
      switch (direction) {
        case '<':
          this.posX--
          break
        case '>':
          this.posX++
          break
        case '^':
          this.posY++
          break
        case 'v':
          this.posY--
          break
        default:
          throw Error('Invalid move: ' + direction)
      }
    }

    deliver (house) {
      this.deliveries.push(
        {
          posX: this.posX,
          posY: this.posY
        }
      )
      house.deliveries++
    }
  }

  class Simulation {
    constructor (directions, NumOfRobots = 1) {
      this.directions = directions.toLowerCase()
      this.robots = this._createRobots(NumOfRobots)
      this.map = this._createMap()
      this.stepsCompleted = 0
      this.initiated = false
    }

    run (steps = -1) {
      if (!this.initiated) this._putBotsOnMap()
      let _directions = this._getDirections(this.stepsCompleted, steps)
      _directions.forEach((direction, index) => { // iterate threw each direction
        let bot = this._getNextRobot(this.robots, this.stepsCompleted) // get robot up for a delivery
        let previousSpot = { x: bot.posX, y: bot.posY } // store previous position
        bot.move(direction) // move robot in direction
        this.map = this._updateMap(this.map, bot, previousSpot) // update map of occupied spaces
        if (this.map[bot.posX + ',' + bot.posY].bots.length === 1) { // check if a bot is here
          bot.deliver(this.map[bot.posX + ',' + bot.posY]) // this is the only bot here so deliver
        }
        this.stepsCompleted++
      })
    }

    getPositions () {
      return this.robots.map(robot => {
        return [robot.posX, robot.posY]
      })
    }

    getHousesWithDeliveries (numberOfDeliveries) {
      return Object.keys(this.map).filter((visitedHouse) => {
        return numberOfDeliveries === this.map[visitedHouse].deliveries
      })
    }

    getDeliveriesSum () {
      let sum = 0
      this.robots.forEach(robot => {
        sum += robot.deliveries.length
      })
      return sum
    }

    getStepsCompleted () {
      return this.stepsCompleted
    }

    _createMap () {
      return {
        '0,0': {
          bots: [],
          deliveries: 0
        }
      }
    }

    _createRobots (size) {
      let _robots = []
      let names = ['robbie', 'jane', 'bob']
      for (let index = 0; index < size; index++) {
        let bot = new Robot(names[index])
        _robots.push(bot)
      }
      return _robots
    }

    _putBotsOnMap () {
      this.map['0,0'].bots = this.robots
      this.initiated = true
    }

    _updateMap (map, bot, movedFrom) {
      let positionHash = bot.posX + ',' + bot.posY
      let movedFromHash = movedFrom.x + ',' + movedFrom.y
      this._leaveHouse(map[movedFromHash], bot)
      if (map[positionHash]) {
        this._goToHouse(map[positionHash], bot)
      } else {
        map[positionHash] = {
          bots: [bot],
          deliveries: 0
        }
      }
      return map
    }

    _getDirections (lastDirectionCompleted, num) {
      let start = lastDirectionCompleted
      let length = num > -1 ? lastDirectionCompleted + num : this.directions.length - 1
      return this.directions.substring(start, length).split('')
    }

    _goToHouse (house, bot) {
      house.bots.push(bot)
    }

    _leaveHouse (house, bot) {
      house.bots = house.bots.filter(_bot => _bot.id !== bot.id)
    }

    _getNextRobot (robots, requesting) {
      const NUM_OF_ROBOTS = robots.length
      if (NUM_OF_ROBOTS === 1) {
        return robots[0] // only one robot so return that one
      } else if (requesting < NUM_OF_ROBOTS) {
        return robots[requesting] // return robot at index there is one at this index
      } else {
        return robots[(requesting % NUM_OF_ROBOTS)] // compute which robot to return again
      }
    }
  }

  return {
    Simulation: Simulation
  }
})()
