# Flower Shop
 
The Flower Shop is changing how it does business with its customers. Previously the Shop would charge the customers per flower that would get delivered. Currently they are moving towards a system where orders are bundled. The problem that they will have with the way orders are ordered with the new system they want to implement is that there is potential for orders not to be completed based on inventory. 
 
The system the Flower Shop is proposing is more inline with doing batch processes leaving many orders to be incomplete because the Shop will not always have the inventory. This type of system is not great for customer relations because it essentially becomes a lotto to see if your order will get processed or if there will be flowers to ship. To avoid the issues that come with a batch processed system the proposal is to change to a real time inventory for the Shop preventing fewer batch jobs that are incomplete. 
 
With this system change, comes changes in the infrastructure of the Flower Shop's systems. Switching to a database that allows for real time updates is necessary. In making this change you would want a database that will also allow the information to be easily replicated to any of the nodes in the AWS cloud that the data would live in. Using a DB such as Couch DB, creates a system that can be synced to the tablets or phones devices where the orders are most likely created. If the customers are also using these devices there is no guarantee that the store/warehouse has the proper wireless to show the current flowershop inventory, this however can be updated in the background so that the customer has the most recent numbers. Creating a progressive web app (PWA) is the most effective choice for this project. This allows for offline viewing of inventory and order creation to be completed when a network is available again. Leading to a better user experience. Once the order has been place a push notification to the PWA can alert the customer that their order has shipped allowing for better customer interactions and expectation setting.  

A simple system diagram is included under the docs. [System Diagram and Wires](docs/system_diagram.pdf) This solution doesn't include
an identity management solution. Though the solution calls for OAuth it is not implimented in this coding challenge. Additionally, a proper solution would include analytics so that you could track what path the user is going through the site with and also find out what they're doing while online/offline so that you can use tha tinformation to better inform new stories for the backlog. 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To get started you'll need to install couchdb.

```
brew install couchdb
```


Finally we need to install a CORS library for couch to allow for request to be made from possible other domains.
```
npm install -g add-cors-to-couchdb
```


And all of the Prerequesits for the DB are installed. If you run [into issues](https://pouchdb.com/guides/setup-couchdb.html)


### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
