let url = new URL(window.location.href); // Get url
let search_params = url.searchParams; // Get params
const id = search_params.get('id'); // Get id from params
const message = document.querySelector("#message");
const image = document.getElementById('image');

// Get all saved predictions
let listCollection = JSON.parse(localStorage.getItem("listCollection"));

// Find the right one
for (const [key, value] of Object.entries(listCollection)) {
    // When the id is the same
    if(value.id == id){
        message.innerHTML = `I think it's a ${value.first_guess.label} with a confidence of: ${value.first_guess.confidence}`
        image.src = "http://localhost:3000/uploads/" + value.imgName;
    }
}