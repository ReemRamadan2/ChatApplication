"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message,date) {
    let current_datetime = new Date()
    let formatted_date =   current_datetime.getHours() + ":" + current_datetime.getMinutes()  
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " " + ":" + " " + msg + " " + " " + " " + " "+date;
    var li = document.createElement("li");
    li.style.backgroundColor = "#f1f1f1";
    li.style.border = "2px solid #dedede";
    li.style.color = "#999";
    li.style.padding ="10px";
    li.style.margin= "10px 0";
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    let current_datetime = new Date()
    let formatted_date = current_datetime.getHours() + ":" + current_datetime.getMinutes()  
    connection.invoke("SendMessage", user, message, formatted_date).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});