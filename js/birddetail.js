let url = new URL(window.location.href); // Get url
let search_params = url.searchParams; // Get params
const id = search_params.get('id'); // Get id from params
const collection = search_params.get('collection'); // Get collection from params

const title = document.querySelector('#title');
const message = document.querySelector("#message");
const description = document.querySelector("#description");
const facts = document.querySelector('#facts');
const vogel = document.querySelector('.vogel');
const help = document.querySelector('#help');
const image = document.getElementById('image');
const backButton = document.getElementById('goback').setAttribute('href', "collectiondetail.html?id=" + collection);
let bird;
// Get all saved predictions
let listCollection = JSON.parse(localStorage.getItem("listCollection"));

// Find the right one
for (const [key, value] of Object.entries(listCollection)) {
    // When the id is the same
    if(value.id == id){
        console.log(value)
        bird = value.first_guess.label;
        title.innerHTML = bird;
        vogel.innerHTML = bird;
        message.innerHTML = `Je hebt een ${bird} op de foto gezet! Goed gedaan!`;
        image.src = "http://localhost:3000/uploads/" + value.imgName;
        getJsonFile();
    }
}

function getJsonFile() {
    fetch("./info.json")
    .then(res => res.json())
    .then(data => getBirdInfo(data))
}

function getBirdInfo(infoJSON) {
    for (const [key, value] of Object.entries(infoJSON)) {
        if(value.bird == bird) {
            description.innerHTML = value.description
            for (const fact of value.facts) { 
                let li = document.createElement("li");
                li.innerHTML = fact;
                facts.appendChild(li);
            }
            help.innerHTML = value.help;
        }
    }
}