// chrome://extensions/

let myLeads = []
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}


tabBtn.addEventListener("click", function(){
    // chrome API to get tabs
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url) // we're pushing the url that is read from the API into the myLeads array
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) // saving it into localstorage which needs to be a string (JSON.stringify does the job)
        render(myLeads) // rendering it into the page.
    })

})



function render(leads) {
    let listItems = ""

    for (let i = 0; i < leads.length; i++) {
        // template string/literal

        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"


        // create element
        // set text content
        // append to ul
    }   
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads) // since this renders out the array (which is empty)

})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) ) 
    // saves the myLead array to localStorage. JSON.stringify will turn it into a string since localStorage reads strings
    render(myLeads)

})


