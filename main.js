
var calc = (function() {
    var expression = [];
    var screenContents = "0";
    
    var handleButton = function (event) {
        // todo: handle float operations

        var val = event.target.getAttribute("data-val");

        switch (val) {
            case "=":
                evaluate(calc.expression);
                console.log("equals pressed");
                break;
            case "AC":
                expression = [];
                clearScreen();
                updateScreenExpression();
                console.log("expression cleared");
                break;
            case "CE":
                clearScreen();

                if (lastItemIsNumber()) {
                    expression.pop();
                }

                console.log("entry cleared");
                break;
            case "sign":
                // todo
                break;
            case "dot":
                // todo
                break;
            case "/": case "x": case "-": case "+":
                expression.push(val);
                var partialExpression = expression.slice(0, -1).join("");
                updateScreenTotal(eval(partialExpression).toString());
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

    var evaluate = function (pressed) {
        // todo
    };

    var clearScreen = function () {
        updateScreenTotal("0");
    };

    var updateScreenTotal = function (contents) {
        var total = document.getElementById("total");

        total.textContent = contents;
    };

    var updateScreenExpression = function () {
        var screenExpression = document.getElementById("expression");
        screenExpression.textContent = expression.join(" ");
    };

    // helper function
    var lastItemIsNumber = function () {
        var lastItem = expression[expression.length - 1];

        if (!isNaN(parseInt(lastItem))) {
            return true;
        }

        else {
            return false;
        }
    };
    
    var bindFunctions = function () {
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