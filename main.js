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

        switch (val) {
            case "=":
                calc.evaluate(calc.expression);
                console.log("equals pressed");
                break;
            case "AC":
                calc.expression = [];
                calc.clearScreen();
                calc.updateScreenExpression();
                console.log("expression cleared");
                break;
            case "CE":
                calc.clearScreen();

                if (calc.lastItemIsNumber()) {
                    calc.expression.pop();
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
                calc.expression.push(val);
                var partialExpression = calc.expression.slice(0, -1).join("");
                calc.updateScreenTotal(eval(partialExpression).toString());
                calc.updateScreenExpression();
                break;
            default:
                // Button was number
                var lastButton = calc.expression[calc.expression.length - 1];

                if (calc.lastItemIsNumber()) {
                    calc.expression[calc.expression.length - 1] = lastButton + val;
                }

                else {
                    calc.expression.push(val);
                }

                calc.updateScreenTotal(calc.expression[calc.expression.length - 1]);
                break;
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

    updateScreenExpression: function () {
        var expression = document.getElementById("expression");
        expression.textContent = calc.expression.join(" ");
    },

    // helper function
    lastItemIsNumber: function () {
        var lastItem = calc.expression[calc.expression.length - 1];

        if (!isNaN(parseInt(lastItem))) {
            return true;
        }

        else {
            return false;
        }
    }
}

document.addEventListener('DOMContentLoaded', calc.run);
