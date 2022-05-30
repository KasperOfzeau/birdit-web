let url = new URL(window.location.href); // Get url
let search_params = url.searchParams; // Get params
let collectionId = search_params.get('id'); // Get id from params

let unlockedContainer = document.querySelector(".unlocked-container");
let lockedContainer = document.querySelector(".locked-container")
let listCollection = JSON.parse(localStorage.getItem("listCollection"));
let collection = [];
let lockedCollection = [];
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
        lockedCollection.push(value);
        for (const collectionBird of listCollection) { 
            let bird = collectionBird.first_guess.label;
            if(bird == value){ 
                if(collection.includes(bird) == false){
                    console.log(collectionBird.id)
                    collection.push(collectionBird.first_guess.label);
                    // Remove from locked collection
                    const index = lockedCollection.indexOf(bird);
                    if (index > -1) {
                        lockedCollection.splice(index, 1);
                    }

                    // Add score
                    collectionscore += 10;

                    // Create card
                    let id = collectionBird.id;
                    let title = bird;
                    let img = collectionBird.imgName;
                    createCard("unlocked", unlockedContainer,id, img, title);
                    // updateBar(score)
                }
            } 
        }
    }
    console.log(lockedCollection)
    for (const bird of lockedCollection) { 
        let id = bird;
        let title = bird;
        let img = bird + ".jpg";
        createCard("locked", lockedContainer, id, img, title);
    }
}

function createCard(divClass, collectionContainer, id, img, title) {
    // Create new card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add(divClass);
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
    collectionContainer.appendChild(cardDiv);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(body);
    body.appendChild(cardTitle);
    body.appendChild(readMore);
}

// Update progress bar
function updateBar(score) {
    barAllBirds.style.width = score + "%";
}