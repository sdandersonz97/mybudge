//BUDGET CONTROLLER
var budgeController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Incomes = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, id;
            if(data.allItems[type].length > 0 ){
                id = data.allItems[type][data.allItems[type].length - 1].id;
            } else {
                id = 0;
            }
            
            type === 'exp' ? newItem = new Expense(id, type, des, val) : newItem = new Incomes(id, type, des, val);
            data.allItems[type].push(newItem);
            return newItem
        },
        testing: function(){
            console.log(data)
        }
    };


})();
    
    
//UI CONTROLLER
var UIController = (function(){
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            };
        },
        getDOMString: function(){
            return DOMStrings
        }
    };

})();
    
    
//GLOBAL CONTROLLER
var controller = (function(budgeCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UIController.getDOMString();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem  = function() {
        var input, newItem;
        input = UIController.getInput();
        newItem = budgeCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem + ' new item');
        budgeCtrl.testing();
    };
    
    return {
        init: function() {
            setupEventListeners();
        }
    };
    

})(budgeController, UIController);


controller.init();