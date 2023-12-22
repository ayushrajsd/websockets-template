const socket = io();
socket.on("message", (data) => {
  console.log("receiving message", data);
});

const btn = document.getElementById("send");
const input = document.getElementById("message");
const ul = document.querySelector("ul");
const grpBtn = document.getElementById("createGrp");
const joinGrp = document.getElementById("joinGrp");
const stg = document.querySelector("#stg");

btn.addEventListener("click", () => {
  const value = input.value;
  const div = document.createElement("div");
  div.setAttribute("class","sender");
  const li = document.createElement("li");
  li.innerText = value;
  const para = document.createElement("p");
  para.innerText = "sender";
  div.appendChild(para);
  div.appendChild(li);
  ul.appendChild(div);
  input.value = "";
  socket.emit("message",value);
});

grpBtn.addEventListener("click", () => {
  console.log("group created req")
  socket.emit("create_grp", Math.random(0, 1) * 1000);
});

joinGrp.addEventListener("click", () => {
  console.log("grp join req");
  socket.emit("join_room");
});

stg.addEventListener("click", function () {
  let value = input.value;
  if (value) {
    socket.emit("grp message", value);
  }
});

// Listening for messages in the room

socket.on("new message", (message) => {
  console.log(message);
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
});

// brodcasted messages
socket.on("broadcast", (data) => {
  console.log("broadcasted message", data);
  const div = document.createElement("div");
  div.setAttribute("class", "receiver");
  const li = document.createElement("li");
  li.innerText = data;
  const para = document.createElement("p");
  para.innerText = "receiver";
  div.appendChild(para);
  div.appendChild(li);
  ul.appendChild(div);
});

socket.on("serv_grp_message", function (data) {
  console.log("grp message", data);
});
