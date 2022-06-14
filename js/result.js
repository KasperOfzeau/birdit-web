let url = new URL(window.location.href); // Get url
let search_params = url.searchParams; // Get params
const id = search_params.get('id'); // Get id from params

const title = document.querySelector('#title');
const message = document.querySelector("#message");
const description = document.querySelector("#description");
const facts = document.querySelector('#facts');
const vogel = document.querySelector('.vogel');
const helps = document.querySelector('#helps');
const image = document.getElementById('image');
const vogelzang = document.getElementById('vogelzang');
let bird;
// Get all saved predictions
let listCollection = JSON.parse(localStorage.getItem("listCollection"));

// Find the right one
for (const [key, value] of Object.entries(listCollection)) {
    // When the id is the samex
    if(value.id == id){
        bird = value.first_guess.label;
        title.innerHTML = bird;
        vogel.innerHTML = bird;
        message.innerHTML = `Je hebt een ${bird} op de foto gezet! Goed gedaan!`;
        image.src = "http://kasperofzeau.nl:3000/uploads/" + value.imgName;
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
            vogelzang.src = value.vogelzang;
            
            for (const help of value.helps) { 
                let li = document.createElement("li");
                li.innerHTML = help;
                helps.appendChild(li);
            }
            for (const voed of value.voeding) { 
                let li = document.createElement("li");
                li.innerHTML = voed;
                voeding.appendChild(li);
            }
            for (const leef of value.leefgebied) { 
                let li = document.createElement("li");
                li.innerHTML = leef;
                leefgebied.appendChild(li);
            }
            help.innerHTML = value.help;
        }
    }

}
function ReadMore() {
    
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");
    const btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }
let x = document.getElementById("myAudio"); 

function playAudio() { 
  x.play(); 
} 