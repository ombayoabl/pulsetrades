console.log(window.location.href);
console.log(window.location.search);

const params = new URLSearchParams(window.location.search);

for (const [key, value] of params.entries()) {
    console.log(key, value);
}