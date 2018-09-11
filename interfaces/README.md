# interfaces

This folder contains interfaces that implement the robot delivery module.

 See [Trying it out](../README.md#trying-it-out) for demo commands to run the interfaces.
 
## **Interface Details**

### [HTTP](#http)

This interface listens on port :8080 which can be changed via the config.json file. These endpoints allow for you to create a simulation, run all or n number of steps, check positions, query for houses with n deliveries, and more.

#### Setup

```
cd interfaces/http
npm install
node http.js
```

#### Endpoints


```
GET    /simulation/:id/positions
GET    /simulation/:id/steps
GET    /simulation/:id/deliveries
GET    /simulation/:id/houses/:with
POST   /simulation
PUT    /simulation/:id/run
PUT    /simulation/:id/run/:steps
DELETE /simulation/:id
```

### [CLIENT](#client)

Work in progress...

This interface is a web page that uses the module in browser. By using a build tool such as webpack we can use node modules in browser.