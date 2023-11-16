$(document).ready(async function () {
  const isLogin = await getUser();

  console.log(isLogin);

  if (isLogin) {
    $("#root").load("/src/pages/Home.html");
  } else {
    $("#root").load("/src/pages/Login.html");
  }
});

const navigate = (path) => {
  console.log("called");

  switch (path) {
    case "/":
      $("#root").load("/src/pages/Home.html");
      break;
    case "/login":
      $("#root").load("/src/pages/Login.html");
      break;
    case "/register":
      $("#root").load("/src/pages/Register.html");
      break;
  }
};

// Handlers
const handleLogin = async (event) => {
  event.preventDefault();

  const username = $("#email").val();
  const password = $("#password").val();

  console.log(username, password);

  const res = await login(username, password);

  if (res) {
    navigate("/");
  }
};

const handleRegister = async (event) => {
  event.preventDefault();

  const username = $("#email").val();
  const name = $("#name").val();
  const password = $("#password").val();

  const res = await register(username, name, password);

  if (res) {
    navigate("/");
  } else {
    alert("Something went wrong");
  }
};

// Authentification
const login = async (email, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  const response = await fetch(
    "http://localhost:4000/api/v1/login",
    requestOptions
  );

  const data = await response.json();

  if (response.status === 200) {
    return data;
  } else {
    console.log(data);
    alert(data.msg);
    return false;
  }
};

const register = async (email, name, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email,
    name,
    password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/register",
      requestOptions
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return false;
  }
};

const logout = async () => {
  var myHeaders = new Headers();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
  };

  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/logout",
      requestOptions
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return false;
  }
};

// User
const getUser = async () => {
  var myHeaders = new Headers();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
  };

  const response = await fetch(
    "http://localhost:4000/api/v1/user",
    requestOptions
  );
  const data = await response.json();

  if (response.status === 200) {
    return data;
  } else {
    console.log(data);
    return false;
  }
};
