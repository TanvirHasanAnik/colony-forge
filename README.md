Technologies used: 
    1. redux for resource & building management

Difficulties faced:
	1. Resource icrement rate based on building states.
		- building state contains production rate - each building adds different resource values
		- Resource state in store has rate property
			- rate property value can be updated using setProductionRate method from resourceSlice

--------------------------------------------------------
Resources:

Initial buildings
Townhall
Builder hut
Coins: 500
Wood: 0
Meat: 0

requirement for building new
House - 200 coin
Sawmill - 400 coin
hunter hut - 250 & 250 wood

Resource production
Coin production 
	10 per minute for 1 house
	20 per minute for 1 Sawmill & hunter hut
Wood production
	lvl1 sawmill (5*worker) per minute 
Meat production
	lvl1 hunter’s hut (5*worker) per minute
	meat reduction: 1 meat per people/builder per minutes
