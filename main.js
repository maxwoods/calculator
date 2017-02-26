var calc = (function() {
    var expression = [];
    var totalContent = "0";

    var handleButton = function(event) {
        var val = event.target.getAttribute("data-val");

        switch (val) {
            case "=":
                if (!isNumber(getLastItem()))
                    break;
                var total = evaluate(expression);
                expression = [];
                updateScreenTotal(total.toString());
                updateScreenExpression();
                break;
            case "AC":
                expression = [];
                clearScreen();
                updateScreenExpression();
                break;
            case "CE":
                clearScreen();

                if (!isNumber(getLastItem())) {
                    expression.pop();
                }

                break;
            case "sign":
                if (isNumber(getLastItem()) && expression.length != 0) {
                    setLastItem("-" + getLastItem());
                    updateScreenTotal(getLastItem());
                    updateScreenExpression();
                }
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                if (expression.length == 0)
                    break;
                if (!isNumber(getLastItem())) {
                    expression.splice(-1, 1, val);
                    updateScreenExpression();
                    break;
                }
                
                expression.push(val);
                var partialExpression = expression.slice(0, -1);
                updateScreenTotal(evaluate(partialExpression).toString());
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
                    setLastItem(getLastItem() + val);
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
        var arr = [];
        
        for (var i = 0; i < contents.length; i++) {
            arr.push("<span class='char'>", contents[i], "</span>");
        }
        
        total.innerHTML = arr.join("");
        
        return;
    };

    var updateScreenExpression = function() {
        var arr = [];
        
        var screenExpression = document.getElementById('expression');
        
        var chars = expression.reduce(function(acc, cur) {
            acc.push("<span>");
            if (cur.length == 1) {
                acc.push(" ", cur, " ");
                acc.push("</span>");
                return acc;
            }
            else {
                acc = acc.concat(cur.split(""));
                acc.push("</span>");
                return acc;
            }
        }, []);
        
        screenExpression.innerHTML = chars.join("");
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
