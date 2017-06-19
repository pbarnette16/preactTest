Feature: Database Setup

Background: 
	Given CouchDB is running
	And the setup has been run

Scenario: Web Push Setup
	Then a single row should be returned from the Push DB table

Scenario: Users have been prepopulated
	Then you will find the users table

Scenario: Inventory have been prepopulated
	Then you will find the inventory table	