// Deriv OAuth callback

const params = new URLSearchParams(window.location.search);

const token = params.get("token1");
const account = params.get("acct1");

if (token) {
    localStorage.setItem("deriv_token", token);
}

if (account) {
    localStorage.setItem("deriv_account", account);
}

// Redirect to dashboard
window.location.href = "/dashboard.html";