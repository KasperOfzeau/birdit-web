let listCollection = JSON.parse(localStorage.getItem("listCollection"));
let allBirdsCollection = [];
let allBirdsCollectionScore = 0;
const barAllBirds = document.getElementById('allBirds');

// Get JSON of all birds collection and calculate score
getJsonFile("./collections/allbirds.json", allBirdsCollection, allBirdsCollectionScore)

// Get JSON
function getJsonFile(url, collection, score) {
    fetch(url)
    .then(res => res.json())
    .then(data => calculateScore(data, collection, score))
}

// Calculate score of collection
function calculateScore(JSON, collection, score) {
    for (const [key, value] of Object.entries(JSON)) {
        for (const collectionBird of listCollection) { 
            if(collectionBird.first_guess.label == value){ 
                if(collection.includes(collectionBird.first_guess.label) == false){
                    collection.push(collectionBird.first_guess.label);
                    score += 10;
                    console.log(score)
                    updateBar(score)
                }
            }
        }
    }
}

// Update progress bar
function updateBar(score) {
    barAllBirds.style.width = score + "%";
}