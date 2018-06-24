var SERVICE = "http://localhost:3001/"
var xhttp = new XMLHttpRequest();

function showTransactions() {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("transactions").innerHTML = this.responseText;
    }
  };
  url = (SERVICE + "transactions")
  xhttp.open("GET", url, true);
  xhttp.send();
}

function createTransaction() {
  particular = document.getElementById("particular").value;
  debit = document.getElementById("debit").value;
  credit = document.getElementById("credit").value;
  closing_balance = document.getElementById("closing_balance").value

  xhttp.onreadystatechange = function() {
    if (this.status == 201) {
      alert("Transaction successfully create");
    }
  };
  url = (SERVICE + "transaction")
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("particular=" + particular + "&debit=" + debit + "&credit=" + credit + "&closing_balance=" + closing_balance);
}

function selectTransaction() {
  id = document.getElementById("transactionid").value;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var transaction = JSON.parse(this.response).transaction;

      document.getElementById("transactions").innerHTML = (
        "<input type='text' id='edit_particular' value="+ transaction.particular +">&nbsp;" +
        "<input type='text' id='edit_debit' value= "+ transaction.debit +">&nbsp;" +
        "<input type='text' id='edit_credit' value="+ transaction.credit +">&nbsp;" +
        "<button value="+transaction.id+" onclick='deleteTransaction(this)'>Delete Transaction</button>&nbsp;" +
        "<button onclick='updateTransaction()'>Update Transaction</button>");
    }
  };
  url = (SERVICE + "transaction/" +id)
  xhttp.open("GET", url, true);
  xhttp.send();
}

function updateTransaction() {
  particular = document.getElementById("edit_particular").value;
  debit = document.getElementById("edit_debit").value;
  credit = document.getElementById("edit_credit").value;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert("Record is Updated successfully");
    }
  };
  url = (SERVICE + "transaction/" + id);
  xhttp.open("PUT", url, true);
  xhttp.send("particular=" + edit_particular + "&debit=" + edit_debit + "&credit" + edit_credit);
}

function deleteTransaction(element){
  id = element.value;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert("Transaction deleted successfully");
    }
  };
  url = (SERVICE + "transaction/" +id);
  xhttp.open("DELETE", url, true);
  xhttp.send();
}
