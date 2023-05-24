document.addEventListener("DOMContentLoaded", function() {
    const myButton = document.getElementById("button");

    myButton.addEventListener("click",async function() {
      password = document.getElementById("password").value;
      
      hashed = await hashPassword(password);

      window.location.href = "/debt-list/" + hashed
    });
  });

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    console.log(hashHex);
    return hashHex;
  }