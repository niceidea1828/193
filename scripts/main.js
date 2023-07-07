if (!localStorage.getItem("balance_g193")) {
  localStorage.setItem("balance_g193", 5000);
}

document.querySelector(".balance").innerHTML =
  localStorage.getItem("balance_g193");

window.onload = () => {
  document.querySelector(".wrapper").classList.remove("hidden");
};
