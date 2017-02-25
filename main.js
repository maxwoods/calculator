var calc = (function() {
    var expression = [];
    var totalContent = "0";

    var handleButton = function(event) {
        // todo: handle float operations

        var val = event.target.getAttribute("data-val");

        switch (val) {
            case "=":
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
            case "dot":
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
            default:
                // Button was number
                var lastButton = expression[expression.length - 1];

                if (lastItemIsNumber()) {
                    expression[expression.length - 1] = lastButton + val;
                }

                else {
                    expression.push(val);
                }

                updateScreenTotal(expression[expression.length - 1]);
                break;
        }
    };

    var evaluate = function(expression) {
        return expression.map(function(elem) {
                return parseInt(elem) || elem;
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

        if (!isNaN(parseInt(lastItem))) {
            return true;
        }

        else {
            return false;
        }
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
