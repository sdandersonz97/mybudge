//BUDGET CONTROLLER
var budgeController = (function(){
    
    
    
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