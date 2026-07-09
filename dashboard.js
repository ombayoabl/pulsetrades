const APP_ID = "33MqJooG5CpHcSnVy04Pb";

const balanceBox = document.getElementById("balance");

// Read token from URL or localStorage
const params = new URLSearchParams(window.location.search);

let token =
    params.get("token") ||
    localStorage.getItem("deriv_token");

if (params.get("token")) {
    localStorage.setItem("deriv_token", token);
}

// No token? Send user back to login
if (!token) {
    alert("Please login with Deriv first.");
    window.location.href = "login.html";
}

const ws = new WebSocket(
    `wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`
);

ws.onopen = () => {

    ws.send(JSON.stringify({
        authorize: token
    }));

};

ws.onmessage = (msg) => {

    const data = JSON.parse(msg.data);

    console.log(data);

    // Authorization successful
    if (data.msg_type === "authorize") {

        balanceBox.innerHTML =
            `Balance: ${data.authorize.currency} ${data.authorize.balance}`;

        // Request live balance updates
        ws.send(JSON.stringify({
            balance: 1,
            subscribe: 1
        }));
    }

    // Live balance updates
    if (data.msg_type === "balance") {

        balanceBox.innerHTML =
            `Balance: ${data.balance.currency} ${data.balance.balance}`;
    }

    // Error
    if (data.error) {

        alert(data.error.message);

    }

};