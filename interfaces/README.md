# interfaces

This folder contains interfaces that implement the robot delivery module.

 See [Trying it out](../README.md#trying-it-out) for demo commands to run the interfaces.

## **Interface Details**

### [HTTP](#http)

This interface listens on port :9000 and has 1 endpoint.

***GET `/directions/{directions}/robots/{robots} `***

#### examples
```
GET localhost:9000/directions/%5E%5EVV%3c%3E
GET localhost:9000/directions/%5E%5EVV%3c%3E/robots/4
```

### [CLIENT](#client)

This interface is a web page that uses the module in browser. By using a build tool such as webpack we can use node modules in browser.