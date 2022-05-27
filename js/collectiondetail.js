let url = new URL(window.location.href); // Get url
let search_params = url.searchParams; // Get params
let collectionId = search_params.get('id'); // Get id from params

let container = document.querySelector(".container")
let listCollection = JSON.parse(localStorage.getItem("listCollection"));
let collection = [];
let collectionscore = 0;

// Get JSON of all birds collection and calculate score
getJsonFile(`./collections/${collectionId}.json`)

// Get JSON
function getJsonFile(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => calculateScore(data))
}

// Calculate score of collection
function calculateScore(JSON) {
    for (const [key, value] of Object.entries(JSON)) {
        for (const collectionBird of listCollection) { 
            let bird = collectionBird.first_guess.label;
            if(bird == value){ 
                if(collection.includes(bird) == false){
                    collection.push(collectionBird.first_guess.label);
                    collectionscore += 10;
                    console.log(bird);

                    let id = collectionBird.id;
                    let title = bird;
                    let img = collectionBird.imgName;
                    createCard(id, img, title);
                    // updateBar(score)
                }
            }
        }
    }
}

function createCard(id, img, title) {
    // Create new card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute('id', id);

    // Create image for card
    const cardImg = document.createElement("img");
    cardImg.classList.add("card-bg-img");
    cardImg.src = "http://localhost:3000/uploads/" + img;

    // Create div body
    const body = document.createElement("div");
    body.classList.add("card-body");

    // Create title card
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = title;

    // Create read more button
    const readMore = document.createElement('a');
    readMore.innerHTML = 'Lees meer...';
    readMore.className = 'btn btn-primary';
    readMore.setAttribute('href', "birddetail.html?collection=" + collectionId + "&id=" + id);

    // ADD ALL IN TO HTML
    container.appendChild(cardDiv);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(body);
    body.appendChild(cardTitle);
    body.appendChild(readMore);
}

// Update progress bar
function updateBar(score) {
    barAllBirds.style.width = score + "%";
}