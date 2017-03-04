var calc = (function() {
    var history = []; // History of commands/values entered
    var current = "0"; // Current value displayed on the screen

    // pseudo-enumeration to represent various states of the calculator
    var calcStates = {
        EQUALS_PRESSED: "Equals Pressed",
        FUNCTION_PRESSED: "Function Pressed",
        NUMBER_ENTRY: "Number Entry",
        ERROR: "Error"
    };

    var calcState = calcStates.NUMBER_ENTRY; // start out in number entry mode


    var handleButton = function(event) {
        var val = event.target.getAttribute("data-val");
        
        if (calcState == calcStates.ERROR) {
            clearError();
            calcState = calcStates.NUMBER_ENTRY;
        }
        
        switch (val) {
            case "=":
                if (calcState == calcStates.EQUALS_PRESSED || 
                    calcState == calcStates.FUNCTION_PRESSED) {
                        break;
                    }
                
                else {
                    console.log("running this");
                    history.push(current);
                    current = evaluate(history).toString();
                    history = [];
                    
                    calcState = calcStates.EQUALS_PRESSED;
                }
                break;
            case "AC":
                history = [];
                current = "0";
                calcState = calcStates.NUMBER_ENTRY;
                break;
            case "CE":
                current = "0";
                calcState = calcStates.FUNCTION_PRESSED;
                break;
            case "sign":
                if (calcState == calcStates.NUMBER_ENTRY) {
                        if (current[0] == "-") {
                            current = current.slice(1);
                        }
                        else {
                            current = "-" + current;
                        }
                    }
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                if (calcState == calcStates.NUMBER_ENTRY) {
                    if (current.slice(-1) == ".") {
                        current = current + "0";
                    }

                    history.push(current);
                    history.push(val);

                    current = evaluate(history.slice(0, -1)).toString();
                }
                
                /* If expression was just totaled, use total as beginning of 
                history for next expression */
                else if (calcState == calcStates.EQUALS_PRESSED) {
                    history = [current];
                    history.push(val);
                }

                // Change operator if last button was a function
                else if (calcState == calcStates.FUNCTION_PRESSED) {
                    history.splice(-1, 1, val);
                }

                calcState = calcStates.FUNCTION_PRESSED;

                break;
            case ".":
                // Only one decimal point in current entry
                if (current.indexOf('.') != -1)
                    break;
                    
                // If no number entered, assume "0.0"
                else if (calcState == calcStates.FUNCTION_PRESSED) {
                    current = "0.";
                }
                
                else {
                    current = current + ".";
                }
                
                calcState = calcStates.NUMBER_ENTRY;
                break;
            default:
                if (calcState == calcStates.NUMBER_ENTRY) {
                    if (current.length == 8) // digit limit
                        break;
                    else if (current == "0") {
                        current = val;
                    }
                    else {
                        current = current + val;
                    }
                }
                else if (calcState == calcStates.FUNCTION_PRESSED ||
                    calcState == calcStates.EQUALS_PRESSED) {
                    current = val;
                    calcState = calcStates.NUMBER_ENTRY;
                }

                break;
        }
        
        if (current.length > 8) {
            digitLimitError();
        }
        
        renderTotal();
        renderHistory();
    };

    var evaluate = function(expression) {
        console.log("evaluating " + expression);
        return expression.map(function(elem) {
                var parsed = parseFloat(elem);
                return isNaN(parsed) ? elem : parsed;
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
                        
                        console.log("result is " + result);
                        //round to nearest hundredth 
                        return Math.round(result * 100) / 100;
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

    var renderTotal = function() {
        var totalDiv = document.getElementById("total");

        totalDiv.innerHTML = current;

        console.log("Updating with current: " + current);
    };

    var renderHistory = function() {
        var historyDiv = document.getElementById("history");

        console.log("updating + " + historyDiv + " with " + history);

        historyDiv.innerHTML = history.join(' ');
    }
    
    var digitLimitError = function() {
        var error = document.getElementById('error');
        
        history = [];
        current = 0;
        
        error.textContent = "DIGIT LIMIT REACHED";
        
        calcState = calcStates.ERROR;
    }
    
    var clearError = function() {
        var error = document.getElementById('error');
        
        error.textContent = "";
    }

    var init = function() {
        var buttons = document.getElementsByClassName('button');

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", handleButton);
        }
    };

    return {
        init: init
    };

})();

calc.init();