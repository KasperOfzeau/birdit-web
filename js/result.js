let url = new URL(window.location.href);
let search_params = url.searchParams; 
const id = search_params.get('id');
const message = document.querySelector("#message");

let listCollection = JSON.parse(localStorage.getItem("listCollection"));
console.log(listCollection)

for (const [key, value] of Object.entries(listCollection)) {
    console.log(id)
    if(value.id == id){
        message.innerHTML = `I think it's a ${value.first_guess.label} with a confidence of: ${value.first_guess.confidence}`
    }
  }