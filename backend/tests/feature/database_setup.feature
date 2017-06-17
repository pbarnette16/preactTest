Feature: Database Setup

Background: 
	Given CouchDB is running
	And the setup has been run

Scenario: Web Push Setup
	When you query the push db
	Then a single row should be returned 

Scenario: Users have been prepopulated
	Then you will find the users table