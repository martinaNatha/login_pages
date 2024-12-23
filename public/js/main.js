let profile = document.querySelector(".profile");
let menu = document.querySelector(".menu");

profile.onclick = function () {
  menu.classList.toggle("active");
};

$("#logout").on("click", async function () {
    console.log("logout");
    sessionStorage.clear();
    history.pushState(null, null, "/");
    window.location.href = "/";
  });
  