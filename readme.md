## My Budge App

Javascript app centralize all the incomes and expenses with a description about it, allows the user see the total budget and the percentage that hava exepended

### Pattern

This app use the module pattern that allows to centralize the UI logic into UI controller, and the budget logic into the budge controller.
These controller are pass down as parameter of the main controller that is reponsible to initialize the app, and execute the function of both controllers.

### Problem

The data is not persistence, this means only live in memory.  