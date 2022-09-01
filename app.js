const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const delBtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const checks = document.getElementsByClassName("checks")
let myLeads = []
let counter = 0;
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){
    let listItems = "";
    for (let i = 0; i < leads.length; i++){
        listItems += 
        `<li>
            <div class="li-div"><input type="radio" name="rd" id="chk" value="${counter}" class = "checks"><a href="${leads[i]}" target="_blank">${leads[i]}</a><div/> 
        </li>`
        counter += 1;
        
    }
    ulEl.innerHTML = listItems;
    listItems = "";
    counter = 0;
}

inputBtn.addEventListener("click", function() {
    if (inputEl.value !== ""){
        myLeads.push(inputEl.value)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        inputEl.value= ""
        render(myLeads)
    }
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
    })
    
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

function renderSlctd(chck){
    for (let i = 0; i < chck.length; i++){
        myLeads.splice(chck[i], 1);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
    }
    ulEl.innerHTML = listItems;
    listItems = "";
}

delBtn.addEventListener("dblclick", function() {
    let selected = [];
    for (let i = 0; i < myLeads.length; i++){
        if (checks[i].checked === true){
            selected.push(checks[i].value)
        }
    }
    renderSlctd(selected)
})
