var calc = (function() {
    var history = []; // History of commands/values entered
    var current = "0"; // Current value displayed on the screen

    // pseudo-enumeration to represent various states of the calculator
    var calcStates = {
        INIT: "Init",
        EQUALS_PRESSED: "Equals Pressed",
        FUNCTION_PRESSED: "Function Pressed",
        NUMBER_ENTRY: "Number Entry"
    };

    var calcState = calcStates.INIT; // start out in number entry mode


    var handleButton = function(event) {
        var val = event.target.getAttribute("data-val");

        switch (val) {
            case "=":
                break;
            case "AC":
                history = [];
                current = "0";
                calcState = calcStates.INIT;
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
                    console.log("HERE");
                }
                
                else {
                    current = current + ".";
                }
                
                calcState = calcStates.NUMBER_ENTRY;
                break;
            default:
                if (current.length == 8) // digit limit
                    break;
                else if (calcState == calcStates.NUMBER_ENTRY) {
                    current = current + val;
                }
                else if (calcState == calcStates.FUNCTION_PRESSED ||
                    calcState == calcStates.INIT) {
                    current = val;
                    calcState = calcStates.NUMBER_ENTRY;
                }

                break;
        }
        
        renderTotal();
        renderHistory();
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

    // Utility function to check if a given string is a number
    var isNumber = function(string) {
        return !isNaN(parseFloat(string));
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
