# interfaces

This folder contains interfaces that implement the robot delivery module.

 See [Trying it out](../README.md#trying-it-out) for demo commands to run the interfaces.

## **Interface Details**

### [CLI](#cli-details)

This interface allows for a system to execute the simulation via command line and outputs the results to STDOUT. A cache file can be used for storing previous simulations which can be disabled.

#### options

***`-d`, `--directions` = DIRECTIONS***
> ***`directions`*** value **is required**. It must be a string and represents the directions for deliveries. e.g., '--directions ^^<V>'

***`-r`, `--robots` = NUMBER_OF_ROBOTS***
> ***`robots`*** value **is optional** and set to **1** by default. It is an integer value representing the number of robots performing the deliveries. e.g., '--robots 4'

#### flags

***`-nc`, `--no-cache`***
> ***`no-cache`*** value **is optional**. It is a boolean value indicating if the simulation can store results for later access which by default it will. e.g., '--no-cache'


#### examples

```
robotdelivery -d ^^VV<>
robotdelivery -d ^^VV<> -n 5
robotdelivery -d ^^VV<> --no-cache
robotdelivery -d ^^VV<> -n 3 --no-cache
```

### [HTTP](#http-details)

This interface listens on port :9000 and has 1 endpoint.

***GET `/directions/{directions}/robots/{robots} `***

#### examples
```
GET localhost:9000/directions/%5E%5EVV%3c%3E
GET localhost:9000/directions/%5E%5EVV%3c%3E/robots/4
```

### [CLIENT](#client-details)

This interface is a web page that uses the module in browser. By using a build tool such as webpack we can use node modules in browser.