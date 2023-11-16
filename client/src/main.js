$(document).ready(async function () {
  const isLogin = await getUser();

  if (isLogin) {
    navigate("/");
  } else {
    navigate("/login");
  }
});

const navigate = async (path, props) => {
  console.log("navigating..");

  switch (path) {
    case "/":
      await $("#root").load("/src/pages/Home.html");
      populateNotes();
      break;
    case "/login":
      await $("#root").load("/src/pages/Login.html");
      break;
    case "/register":
      await $("#root").load("/src/pages/Register.html");
      break;
    case "/write":
      await $("#root").load("/src/pages/Write.html");
      break;
    case "/view":
      await $("#root").load("/src/pages/View.html");
      populateView(props.note_id);
      break;
  }
};

// utils
const populateNotes = async () => {
  const res = await getNotes();
  console.log(res);

  const cardContainer = $("#cardContainer");

  console.log(cardContainer);

  res.forEach((note) => {
    console.log(note);

    const card = `<div
    onclick="navigate('/view',{note_id: '${note.note_id}'})"
  class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  <h5
    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
  >
    ${note.title}
  </h5>
  <p class="font-normal text-gray-700 dark:text-gray-400">
    ${note.content.slice(0, 100)}
  </p>
</div>`;
    cardContainer.append(card);
  });
};

const populateView = async (note_id) => {
  const res = await getNote(note_id);

  const content = $("#content");
  const title = $("#title");

  title.text(res.title);
  content.text(res.content);
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

const handleSave = async (event) => {
  event.preventDefault();

  const title = $("#title").val();
  const content = $("#content").val();

  const res = await createNote(title, content);

  if (res) {
    navigate("/");
  } else {
    alert("Something went wrong");
  }
};

const handleLogout = async (event) => {
  const res = await logout();

  if (res) {
    navigate("/login");
  }
};

// Authentification
const login = async (email, password) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    email: email,
    password: password,
  });

  let requestOptions = {
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
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    email,
    name,
    password,
  });

  let requestOptions = {
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
  let myHeaders = new Headers();

  let requestOptions = {
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
  let myHeaders = new Headers();

  let requestOptions = {
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

// Notes
const getNotes = async () => {
  console.log("getting notes");
  let myHeaders = new Headers();

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
  };

  const response = await fetch(
    "http://localhost:4000/api/v1/notes",
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

const createNote = async (title, content) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    title,
    content,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  const response = await fetch(
    "http://localhost:4000/api/v1/note",
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

const getNote = async (note_id) => {
  let myHeaders = new Headers();

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
  };

  const response = await fetch(
    `http://localhost:4000/api/v1/note/${note_id}`,
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
