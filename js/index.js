console.log("js loaded");

const list = document.querySelector("ol");

const transactions = JSON.parse(localStorage.getItem("transaction")) || [];
const title = document.querySelector("#title");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");

let editMode = false;

if (!editMode) {
  document.querySelector(
    "#dynamic-buttons"
  ).innerHTML = `<button class="btn btn-success my-3" id="add">Add Transaction</button>`;
}

IncomeHandler();

function deleteThisTransaction(id) {
  transactions.splice(id, 1);
  localStorage.setItem("transaction", JSON.stringify(transactions));
  IncomeHandler();
}

function editHandler(id) {
  console.log(id);
  transactions[id] = {
    title: title.value,
    amount: amount.value,
    type: type.value,
  };
  localStorage.setItem("transaction", JSON.stringify(transactions));
  title.value = "";
  amount.value = "";
  type.value = "Select";
  IncomeHandler();
}

function editTransaction(id) {
  editMode = true;
  title.value = transactions[id].title;
  amount.value = transactions[id].amount;
  type.value = transactions[id].type;
  if (editMode) {
    document.querySelector("#dynamic-buttons").innerHTML = `<button class="btn btn-success my-3" onclick="editHandler(${id})">Edit Transaction</button>
    <button class="btn btn-danger my-3" onclick="IncomeHandler()">Cancel Edit</button>
    `;
  }
}

function IncomeHandler() {
  console.log(transactions);
  editMode = false;
  if (!editMode) {
    document.querySelector(
      "#dynamic-buttons"
    ).innerHTML = `<button class="btn btn-success my-3" id="add" onclick="addTransaction()">Add Transaction</button>`;
    title.value = "";
    amount.value = "";
    document.querySelector("#type").value = "Select";
    console.log("IncomeHandler");
  }

  let income = 0;
  let expense = 0;
  let incomeStr = "";
  let expenseStr = "";

  transactions.forEach((ele, i) => {
    const amountValue = parseInt(ele.amount) || 0; // Ensure amount is parsed correctly
    if (ele.type === "income") {
      income += parseInt(ele.amount);
      incomeStr += `
      <li class="my-1 p-2">
      <span style="color:blue;"> Title: </span> ${ele.title} 
      <svg xmlns="http://www.w3.org/2000/svg" id=${i} onclick="deleteThisTransaction(this.id)" width="16" height="25" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
      </svg> <br/> <span style="color:green;"> Amount: </span> ${ele.amount}  
      <svg xmlns="http://www.w3.org/2000/svg" id=${i} onclick="editTransaction(this.id)" width="16" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
      </svg></li>
      `;
    } else if (ele.type === "expense") {
      expense += parseInt(ele.amount);
      expenseStr += `
      <li class="my-1 p-2">
      <span style="color:blue;"> Title: </span> ${ele.title} 
      <svg xmlns="http://www.w3.org/2000/svg" id=${i} onclick="deleteThisTransaction(this.id)" width="16" height="25" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
      </svg> <br/> <span style="color:green;"> Amount: </span> ${ele.amount}  
      <svg xmlns="http://www.w3.org/2000/svg" id=${i} onclick="editTransaction(this.id)" width="16" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
      </svg></li>
      `;
    }
  });

  document.querySelector("#in").innerText = income;
  document.querySelector("#in-data ol").innerHTML = incomeStr;
  document.querySelector("#out").innerText = expense;
  document.querySelector("#out-data ol").innerHTML = expenseStr;

  // Calculate and display total expenses
  const totalExpenses = income - expense;
  document.querySelector("#total").innerText = `${totalExpenses}`;
if(totalExpenses <= 0 ){
  document.querySelector("#total").style.color = "red";
}else{
  document.querySelector("#total").style.color = "green";
}
}

function addTransaction() {
  const tt = document.querySelector("#type").value;
  if (title.value == "" || amount.value == "") {
    alert("Enter Values");
    return;
  }
  if (tt === "Select") {
    alert("Please select a transaction type");
    return;
  }
  transactions.push({
    title: title.value,
    amount: amount.value,
    type: tt,
  });
  localStorage.setItem("transaction", JSON.stringify(transactions));
  title.value = "";
  amount.value = "";
  IncomeHandler();
}
