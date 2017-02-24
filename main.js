var calc = {
    expression: [],

    run: function () {
        var buttons = document.getElementsByClassName('button');
        var expression = "";

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", calc.handleButton);
        }
    },

    handleButton: function (event) {
        // todo: handle float operations

        var val = event.target.getAttribute("data-val");

        if (val == "=") {
            calc.evaluate(calc.expression);
            console.log("equals pressed");
        }

        else if (val == "AC") {
            calc.expression = [];
            calc.clearScreen();
            console.log("expression cleared");
        }

        else if (val == "CE") {
            // CE means clear the display, but don't wipe out the expression
            calc.clearScreen();

            if (calc.lastItemIsNumber()) {
                calc.expression.pop();
            }

            console.log("entry cleared");
        }

        else {

            // A number was pressed
            if (!isNaN(parseInt(val))) {
                lastButton = calc.expression[calc.expression.length - 1];

                if (calc.lastItemIsNumber()) {
                    calc.expression[calc.expression.length - 1] = lastButton + val;
                }

                else {
                    calc.expression.push(val);
                }

                calc.updateScreenTotal(calc.expression[calc.expression.length - 1]);
            }

            // A function button was pressed
            else {
                calc.expression.push(val);
                partialExpression = calc.expression.slice(0, -1).join("");
                calc.updateScreenTotal(eval(partialExpression).toString());
                calc.updateScreenExpression();
            }

            console.log("expression: " + calc.expression);
        }
    },

    evaluate: function (pressed) {
        // todo
    },

    clearScreen: function () {
        calc.updateScreenTotal("0");
    },

    updateScreenTotal: function (contents) {
        var total = document.getElementById("total");

        total.textContent = contents;      
    },

    updateScreenExpression: function() {
        var expression = document.getElementById("expression");
        expression.textContent = calc.expression.join(" ");
    },

    // helper function
    lastItemIsNumber: function() {
        lastItem = calc.expression[calc.expression.length - 1];

        if (!isNaN(parseInt(lastItem))) {
            return true;
        }

        else {
            return false;
        }
    }
}

document.addEventListener('DOMContentLoaded', calc.run);
