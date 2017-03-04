var calc = (function() {
    var history = []; // History of commands/values entered
    var current = ""; // Current value displayed on the screen
    
    // pseudo-enumeration to represent various states of the calculator
    var calcStates = {
        EQUALS_PRESSED: "Equals Pressed",
        FUNCTION_PRESSED: "Function Pressed",
        NUMBER_ENTRY_REG: "Number Entry Regular",
        NUMBER_ENTRY_DECIMAL: "Number Entry Decimal"
    }
    
    var calcState = calcStates.NUMBER_ENTRY; // start out in number entry mode
    
    
    var handleButton = function(event) {
        var val = event.target.getAttribute("data-val");
        
        switch (val) {
            case "=":
                break;
            case "AC":
                break;
            case "CE":
                break;
            case "sign":
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                break;
            case ".":
                break;
            default:
                break;
        }
    };
    
    var evaluate = function(expression) {
        return expression.map(function(elem) {
                return parseFloat(elem) || elem;
            })
            .reduce(function(result, current, idx, arr) {
                if (!isNaN(current)) {
                    if (idx != 0) {
                        switch (arr[idx - 1]) {
                            case "+":
                                result += current;
                                break;
                            case "-":
                                result -= current;
                                break;
                            case "/":
                                result /= current;
                                break;
                            case "x":
                                result *= current;
                                break;
                        }
                        
                        //round to nearest hundredth 
                        return Math.round(result*100)/100;
                    }
                    
                    else {
                        return current;
                    }
                }
                else if (idx == arr.length - 1) {
                    return undefined;
                }
                else
                    return result;
            }, 0);
    };
    
    var init = function() {
        var buttons = document.getElementsByClassName('button');
        
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", handleButton);
        }
    }
    
    return {
      init: init  
    };
    
})();