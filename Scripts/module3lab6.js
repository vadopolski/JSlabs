function validate(id, regExp) {
    var parent = document.getElementById(id);
    var inputValue = document.getElementById(id + "Input").value;
    var validationResultElement = document.getElementById(id + "After");

    if (validationResultElement != null) {
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
        addNextSpanSectionToMainForm();
    }
    return child;
}

function addNextSpanSectionToMainForm() {
    if (++count < dataJSON.length && document.getElementById(dataJSON[count].id) == null) {
        mainForm.appendChild(document.createElement("br"));
        mainForm.appendChild(document.createElement("br"));
        mainForm.appendChild(generateInput(dataJSON[count].id, dataJSON[count].type));
    } else {
        mainForm.appendChild(document.createElement("br"));
        mainForm.appendChild(document.createElement("br"));
        mainForm.appendChild(generateSubmit());
    }
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
    if(type == "text" && input.getAttribute("id") == dataJSON[0].id + "Input"){
        input.setAttribute("list", "myData");
    }
    input.setAttribute("onblur", "validate(dataJSON[count].id, dataJSON[count].spanPattern)");
    parent.appendChild(label);
    parent.appendChild(input);
    return parent;
}

function generateDataList() {
    var dataList = document.createElement("datalist");
    dataList.setAttribute("id", "myData");
    for(var i = 0; i < dataListJSON.length; i++){
        var option = document.createElement("option");
        option.setAttribute("label", dataListJSON[i].label);
        option.setAttribute("value", dataListJSON[i].value);
        dataList.appendChild(option);
    }
    return dataList;
}

function generateSubmit() {
    var submit = document.createElement("input");
    submit.setAttribute("type", "button");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("onclick", "deleteInput()");
    return submit;
}

function deleteInput() {
    mainForm.delet
}

var dataListJSON = [{label: "(Суперпользователь)", value: "Admin"},
                    {label: "(Посетитель)", value: "User"}, {label: "(Кот. Просто кот)", value: "Cat"}];

var dataJSON = [{id: "username", spanPattern: "^[A-Z]+[a-z]{0,10}$", type: "text"},
    {id: "age", spanPattern: "^[0-9]{3,9}$", type: "number"},
    {id: "email", spanPattern: "^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$", type: "text"}];
var count = 0;
var currentID = dataJSON[count].id;
var currentSpanPattern = dataJSON[count].spanPattern;
var currentType = dataJSON[count].type;