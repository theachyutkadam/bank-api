var SERVICE = "http://localhost:3001/"

function showUsers() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("users").innerHTML = this.responseText;
    }
  };
  url = (SERVICE + "users")
  xhttp.open("GET", url, true);
  xhttp.send();
}

function createUser() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  balance = document.getElementById("balance").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      alert ("User created successfully")
    }
  };
  url = (SERVICE + "user")
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("username=" + username + "&password=" + password + "&balance=" + balance);
}

function selectUser() {
  id = document.getElementById("userid").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("users").innerHTML = (this.responseText + "<button value="+id+" onclick='deleteUser(this)'>Delete User</button>&nbsp;" + "<button value= "+id+" onclick='editUser(this)'>Edit User</button>")
    }
  };
  url = (SERVICE + "user/"+ id)
  xhttp.open("GET", url, true);
  xhttp.send();
}

function deleteUser(element) {
  id = element.value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert ("User delete successfully")
    }
  };
  url = (SERVICE + "user/" + id);
  xhttp.open("DELETE", url, true);
  xhttp.send();
}

function editUser(element) {
  id = element.value;
  console.log(id);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      document.getElementById("users").innerHTML = (this.responseText + "<br><input type='text' id='username'>&nbsp;" + "<input type='text' id='password'>"+"<button>Edit User</button>")
      console.log("this is update user");
    }
  };
  url = (SERVICE + "user/" + id);
  xhttp.open("GET", url, true);
  xhttp.send();
}

function updateUser() {
  console.log("this is update function");
  console.log(this);
}
