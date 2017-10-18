//BUDGET CONTROLLER
var budgeController = (function(){
    
    
    
})();
    
    
//UI CONTROLLER
var UIController = (function(){



})();
    
    
//GLOBAL CONTROLLER
var controller = (function(budgeCtrl, UICtrl){

    var ctrlAddItem  = function() {
        console.log('record')
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });

})(budgeController, UIController);