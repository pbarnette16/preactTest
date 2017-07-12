Feature: Bundle Test

Background: 
	Given I have included the util library

Scenario: Flower Inputs
	Given <input> <flower> <type> are entered
	Then <bundle> bundle of <bundleItems> will be returned <cost>
	And the total cost will be <total> 
	| input | type | bundle | bundleItems |  cost | total |
	|    10 | R12  |   1    |     10      | 12.99 | 12.99 |
	|    15 | L09  |   1    |     9       | 24.95 | 41.90 |
	|    15 | L09  |   1    |     6       | 16.95 | 41.90 |
	|    13 | T58  |   2    |     5       | 9.95  | 25.85 |
	|    13 | T58  |   1    |     3       | 5.95  | 25.85 |

