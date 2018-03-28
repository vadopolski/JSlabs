alert('test');

function validate(id, regExp) {
    var parent = document.getElementById(id);
    var inputValue = document.getElementById(id + "Input").value;
    var childAfter = document.getElementById(id + "After");

    if (childAfter != null) {
        updateFilledElement(parent.lastChild, checkValue(inputValue, regExp));
    } else {
        var newItem = document.createElement("span");
        newItem.setAttribute("id", id + "After");
        updateFilledElement(newItem, checkValue(inputValue, regExp));
        parent.appendChild(newItem);
    }
}

function updateFilledElement(child, st) {
    if (st == false) {
        child.innerHTML = "&nbsp;&nbsp;&nbsp;InCorrect";
        child.setAttribute("style", "color: coral");
    } else {
        child.innerHTML = "&nbsp;&nbsp;&nbsp;Correct";
        child.setAttribute("style", "color: chartreuse");
        if (++count < dataJSON.length && document.getElementById(dataJSON[count].id) == null) {
            mainForm.appendChild(document.createElement("br"));
            mainForm.appendChild(document.createElement("br"));
            mainForm.appendChild(generateInput(dataJSON[count].id, dataJSON[count].type));
        }
    }
    return child;
}

function checkValue(st, regExp) {
    var patt = new RegExp(regExp);
    var res = patt.test(st);
    return res;
}

function generateInput(idName, type) {
    var parent = document.createElement("span");
    parent.setAttribute("id", idName);
    var label = document.createElement("span");
    label.setAttribute("id", idName + "Label");
    label.setAttribute("style", "width: 160px; overflow-x: hidden; float: left");
    label.innerHTML = "Enter " + idName;
    var input = document.createElement("input");
    input.setAttribute("id", idName + "Input");
    input.setAttribute("type", type);
    input.setAttribute("onblur", "validate(dataJSON[count].id, dataJSON[count].spanPattern)");
    parent.appendChild(label);
    parent.appendChild(input);
    return parent;
}
var dataJSON = [{"id": "username", "spanPattern": "^[A-Z]+[a-z]{0,10}$", "type": "text"},
    {"id": "age", "spanPattern": "^[0-9]{3,9}$", "type": "number"},
    {"id": "email", "spanPattern": "^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$", "type": "text"}];
var count = 0;
var currentID = dataJSON[count].id;
var currentSpanPattern = dataJSON[count].spanPattern;
var currentType = dataJSON[count].type;
var mainForm = document.getElementById("mainForm");
