const message = document.querySelector("#message");
const uploadButton = document.querySelector("#file");
const submitButton = document.querySelector('#submit');
const img = document.querySelector("#img");
let listCollection;
if (localStorage.getItem('listCollection') === null){
    listCollection = [];
} else {
    listCollection = JSON.parse(localStorage.getItem('listCollection'));
}
let collectionLength = 0;
if (localStorage.getItem('listCollection') !== null){
    collectionLength = listCollection.length;
}

uploadButton.addEventListener("change", event => loadFile(event));
submitButton.addEventListener("click", () => userImageUploaded());

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

function loadFile(event) {
    img.src = URL.createObjectURL(event.target.files[0]);
}

function userImageUploaded() {
    ml5.imageClassifier('MobileNet')
    .then(classifier => classifier.classify(img))
    .then(results => {
        console.log(results);
        // Get all results
        let firstGuessLabel = results[0].label;
        let firstConfidence = results[0].confidence;
        let secondGuessLabel = results[1].label;
        let secondConfidence = results[1].confidence;
        let id = collectionLength + 1;
        //Make an json object
        let data = {
            "id": id,
            "first_guess": {
                "label":  firstGuessLabel,
                "confidence": firstConfidence
            },
            "second_guess": {
                "label":  secondGuessLabel,
                "confidence": secondConfidence
            },
            "date": Date.now(),
        };

        // Add to collection in localstorage
        listCollection.push(data);
        // Update local storage
        let listFavoritesString = JSON.stringify(listCollection);
        localStorage.setItem("listCollection", listFavoritesString);
        window.location.href = "result.html?id=" + id;
    });
}

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    submitButton.innerHTML = "Verzenden";
    submitButton.removeAttribute("disabled");
}
