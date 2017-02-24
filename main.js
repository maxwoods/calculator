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
            calc.clearScreen("0");

            console.log("entry cleared");
        }

        else {

            // A number was pressed
            if (!isNaN(parseInt(val))) {
                lastButton = calc.expression[calc.expression.length - 1];

                if (!isNaN(parseInt(lastButton))) {
                    calc.expression[calc.expression.length - 1] = lastButton + val;
                }

                else {
                    calc.expression.push(val);
                }

                calc.updateScreen(calc.expression[calc.expression.length - 1]);
            }

            // A function button was pressed
            else {
                calc.expression.push(val);
                calc.updateScreen(null);
            }

            console.log("pressed: " + calc.expression);
        }
    },

    evaluate: function (pressed) {
        // todo
    },

    clearScreen: function () {

    },

    updateScreen: function (contents) {
        var total = document.getElementById("total");
        var expression = document.getElementById("expression");

        if (contents != null) {
            total.textContent = contents;
        }

        expression.textContent = calc.expression.join(" ");
    }
}

document.addEventListener('DOMContentLoaded', calc.run);
