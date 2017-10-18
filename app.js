//BUDGET CONTROLLER
var budgeController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Incomes = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    
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
        var input = UIController.getInput();
    };
    
    return {
        init: function() {
            setupEventListeners();
        }
    };
    

})(budgeController, UIController);


controller.init();