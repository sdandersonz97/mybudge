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
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum = sum + cur.value;
        })
        data.totals[type] = sum;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budge: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val) {
            var newItem, id;
            if(data.allItems[type].length > 0 ){
                id = data.allItems[type][data.allItems[type].length - 1].id;
            } else {
                id = 0;
            }
            
            type === 'exp' ? newItem = new Expense(id, des, val) : newItem = new Incomes(id, des, val);
            data.allItems[type].push(newItem);
            return newItem
        },
        deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(element){
                return element.id;
            })
            index = ids.indexOf(id);
            if(index !== -1 ){
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget:function(){
            // calculate total incomes and expenses 
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budge
            data.budge = data.totals.inc - data.totals.exp;
            //calculate % of income expended 
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
        },
        getBudget: function(){
            return {
                budge: data.budge,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgeLabel: '.budget__value',
        incomeLabel:  '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp'){
                element = DOMStrings.expensesContainer;
                html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields)
            fieldsArr.forEach(function(element) {
                element.value = "";
            });
            fieldsArr[0].focus();
        },
        displayBudget: function(obj){
            document.querySelector(DOMStrings.budgeLabel).textContent = obj.budge;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;
            
            if(obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },
        getDOMString: function(){
            return DOMStrings;
        }
    };

})();
    
    
//GLOBAL CONTROLLER
var controller = (function(budgeCtrl, UICtrl){
    //Set the event listeners
    var setupEventListeners = function(){
        var DOM = UIController.getDOMString();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });


        document.querySelector(DOM.container).addEventListener('click', ctrDeleteItem);
    };
    
    var updateBudget = function(){
        //calculate budfge
        budgeCtrl.calculateBudget();
       //get total values
       var budge = budgeCtrl.getBudget();
       //display budget
       UICtrl.displayBudget(budge);
        
    };

    //excuted each time an user press enter or add button
    var ctrlAddItem  = function() {
        var input, newItem;
        input = UIController.getInput();
        if(input.description && !isNaN(input.value) && input.value > 0){
            newItem = budgeCtrl.addItem(input.type, input.description, input.value);
            UIController.addListItem(newItem, input.type);
            UIController.clearFields();
            updateBudget();
        }
    };
    
    var ctrDeleteItem = function(event){
        var itemId, splitId, type, id;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemId){
            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);

            //delete item from data structure
            budgeCtrl.deleteItem(type, id);
            //delete item from user interface

            //update and show the new budget

        }

    };
    return {
        init: function() {
            setupEventListeners();
            UICtrl.displayBudget({
                    budge: 0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
            });
        }
    };
    

})(budgeController, UIController);


controller.init();