var calc = (function() {
    var expression = [];
    var totalContent = "0";

    var handleButton = function(event) {
        // todo: handle float operations

        var val = event.target.getAttribute("data-val");

        switch (val) {
            case "=":
                if (!lastItemIsNumber())
                    break;
                var total = evaluate(expression);
                updateScreenTotal(total);
                expression = [total];
                updateScreenExpression();
                break;
            case "AC":
                expression = [];
                clearScreen();
                updateScreenExpression();
                break;
            case "CE":
                clearScreen();

                if (lastItemIsNumber()) {
                    expression.pop();
                }

                break;
            case "sign":
                // todo
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                if (!lastItemIsNumber()) {
                    expression.splice(-1, 1, val);
                    updateScreenExpression();
                    break;
                }
                
                expression.push(val);
                var partialExpression = expression.slice(0, -1);
                updateScreenTotal(evaluate(partialExpression));
                updateScreenExpression();
                break;
            case ".":
                if (isNumber(getLastItem())) {
                    if (getLastItem().slice(-1) == ".") {
                        break;
                    }
                    
                    setLastItem(getLastItem() + ".");
                }
                
                else {
                    expression.push("0.");
                }
                
                updateScreenTotal(getLastItem());
                break;
            default:
                if (isNumber(getLastItem())) {
                    expression[expression.length - 1] = getLastItem() + val;
                }

                else {
                    expression.push(val);
                }

                updateScreenTotal(getLastItem());
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
                        
                    return result;
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
    }

    var clearScreen = function() {
        updateScreenTotal("0");
    };

    var updateScreenTotal = function(contents) {
        var total = document.getElementById("total");

        total.textContent = contents;

        totalContent = contents;
    };

    var updateScreenExpression = function() {
        var screenExpression = document.getElementById("expression");
        screenExpression.textContent = expression.join(" ");
    };

    // helper function
    var lastItemIsNumber = function() {
        var lastItem = expression[expression.length - 1];

        if (!isNaN(parseFloat(lastItem))) {
            return true;
        }

        else {
            return false;
        }
    };
    
    var getLastItem = function() {
        return expression[expression.length - 1];
    };
    
    var setLastItem = function(newValue) {
        expression[expression.length - 1] = newValue;
    };
    
    var isNumber = function(val) {
        return !isNaN(parseFloat(val));
    };

    var bindFunctions = function() {
        var buttons = document.getElementsByClassName('button');

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", handleButton);
        }
    };

    var init = function() {
        bindFunctions();
    };

    return {
        init: init,
    };
})();

document.addEventListener('DOMContentLoaded', calc.init);
