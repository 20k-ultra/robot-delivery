# robot delivery

NodeJS implementation of the [Robots](robots.md) problem with [interfaces](interfaces/README.md) available to interact with the solution.

## **Install**

```
git clone https://github.com/20k-ultra/robot-delivery
cd robot-delivery
```

You can try a quick demo with `npm run demo` or see [Trying it out](#trying-it-out-work-in-progress) for more info

## **Usage**

```
const Simulator = require('./robot-delivery').Simulation

let simulation = new Simulator('^^VV<>')

simulation.run()
```

#### Example

```
const Simulator = require('./robot-delivery').Simulation

let directions = '^^VV<>' //directions to follow

let simulation = new Simulator(directions, 3) //create Simulator with 3 robots

simulation.run(1) // perform 1 move

simulation.getPositions() // get current positions of robots

simulation.run() // run all moves (won't redo already done directions)

simulation.getHousesWithDeliveries(1)) // get all houses with 1 delivery

simulation.getDeliveriesSum() // get number of deliverys

simulation.getPositions() // get final positions

```


## **[Trying it out](#trying-it-out)** (Work in Progress)

Right now no interfaces are complete but a demo is available with:

```
npm run demo
```

Given that there are 3 interfaces to choose from, below are the instructions to run them.

#### CLI
> click [here](interfaces/README.md/#cli) for details


```
npm run cli-demo
```

#### HTTP
> click [here](interfaces/README.md/#http) for details

```
npm run http-demo
```

#### CLIENT
> click [here](interfaces/README.md/#client) for details

```
npm run client-demo
```

## **Running tests**

The tests were written only for the implementation and not the interfaces. To run them do:

```
npm run tests
```

## **Design Questions**

Questions I'd like to go over:

- Why make a CLI interface?
- Why make a HTTP interface?
- Why make a JS runtime interface?
- Why only allow GET requests ?
- Why create a module with seperate interfaces?
- What would you do differently when implementing the HTTP interface in production ?
- Why did you decide to use the map for keeping track of robot positions instead of looping through all the bots and getting their coordinates to see if any were on top of each other?