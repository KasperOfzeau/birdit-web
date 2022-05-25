let imageResult = localStorage.getItem("imageResult")
const message = document.querySelector("#message")

window.onload = message.innerHTML = `I think it's a ${imageResult}`