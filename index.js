// function saveInput() {
//     console.log('Button Clicked!');
// }

const inputBtn = document.getElementById('input-btn');
let myLeads = [];
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const delBtn = document.getElementById('delete-btn');
const saveTabBtn = document.getElementById('savetab-btn'); 

// localStorage.setItem("myLeads", "www.egLoeadd.com");
// console.log(localStorage.getItem('myLeads'));
// localStorage.clear();

// For storing something in LocalStorage it has to be of type String only 

// myLeads = JSON.stringify(myLeads);
// console.log(typeof myLeads);
// myLeads = JSON.parse(myLeads)
// console.log(typeof myLeads);
// myLeads.push('wwwwww')

const render = (myLeads) => {
    let listItems = '';
    for(let i = 0; i < myLeads.length; i++) {
        // ulEl.innerHTML += '<li>' + myLeads[i] + '</li>';
        // const li = document.createElement('li');
        // li.textContent = myLeads[i];
        // ulEl.append(li);
        // DOM manipulation comes with a cost so it would be better to use it once (outside th loop) instead of using it 'n' times in for loop;
        listItems += `<li> 
                        <a href =  "${myLeads[i]}" target = "_blank"> ${myLeads[i]} </a> 
                      </li>`;
    }
    ulEl.innerHTML = listItems;
}

delBtn.addEventListener('dblclick', () => {
    myLeads = [];
    localStorage.clear();
    // ulEl.innerHTML = "";
    render(myLeads);
});

const leadsFromLS = JSON.parse(localStorage.getItem(('myLeads')));
if(leadsFromLS) {
    myLeads = leadsFromLS;
    render(myLeads);
}
inputBtn.addEventListener('click', () => {
    let inputLeads = inputEl.value;
    myLeads.push(inputLeads);
    inputEl.value = "";
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    // console.log(myLeads);
    // myLeads.push(inputEl.value);
    render(myLeads);
    // console.log(localStorage.getItem(myLeads));
    
});

saveTabBtn.addEventListener('click', () => {
    // let currentWindow = window.location.href;
    // myLeads.push(currentWindow);
    chrome.tabs.query({active : true, currentWindow : true}, (tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    })
});





