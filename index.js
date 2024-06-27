// using html
// function saveLead() {
//     console.log("Button clicked!")
// }

// *instead of using on click in html use addEventListener in js --> leads to clearer seperation of concerns 

let myLeads = []
const inputBtn = document.getElementById("input-btn") // const cannot be reassigned, use instead of let to assign valuables
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


// get the leads from the localStorage 
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

// * truthy and falsy values 
// *- falsy values: false, 0, "" (empty string), null (how developers signals emptiness), undefined (how js signalizes emptiness), NaN (not a number)
// *- check for truthy or falsy by passing value into Boolean()
if (leadsFromLocalStorage) {  // persists when refreshed
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// const tabs = [ 
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}  // this is the format of tabs in chrome
// ]

tabBtn.addEventListener("click", function() {
    // grab the URL of the current tab, only works in chrome extension
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url) // get value of the url
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


// *- 
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


// *when to use const and let
// *- for collaboration, developers use to signal what can or cannot be reassigned/changed
// *- rule: if possible, use const. if not, use let

inputBtn.addEventListener("click", function() {  // create a function inside 
    // myLeads.push("wwww.awesomelead.com")

    // *Push the value from the inputEl into the myLeads array 
    myLeads.push(inputEl.value)
    inputEl.value = ""  // clear input field

    // * localStorage saves information to users storage in key value pairs
    // *- must be strings, use an array by turning it into a string
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)

})
function render(leads) { 
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // console.log(leads[i])
        // ulEl.textContent += leads[i] + " " 
        // *use innerHTML which recognizes html tags, creates html with js
        // ulEl.innerHTML += "<li>" + leads[i] + "</li>"
        
        // *alternative of using HTML
        // *steps: create element, set text content, append to ul
        // const li = document.createElement("li")
        // li.textContent = leads[i]
        // ulEl.append(li)
        
        // *using a mix of double and single string and js
        // listItems += "<li><a target = '_blank' href='" + leads[i] + "'>" + leads[i] + "</a></li>"
        // *template string, `, (to the left of one on your keyboard), allows us to break into different lines, use ${} to escape the string and use js
        // * make sure to put quotations around js objects if it is required in the html, not automatically considered a string unless you put it in one
        listItems += `
            <li>
                <a target = "_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>`
    }

    // dom iteration comes with a cost, it is more efficient to do it just once outside of a loop
    // - instead of multiple times in a for loop
    ulEl.innerHTML = listItems
}