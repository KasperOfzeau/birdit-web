const message = document.querySelector("#message");
const uploadButton = document.querySelector("#file");
const submitButton = document.querySelector('#submit');
const img = document.querySelector("#img");
let imgName;
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
const classifier = ml5.imageClassifier('./model/model.json', modelLoaded);

function loadFile(event) {
    imgName = event.target.files[0].name;
    img.src = URL.createObjectURL(event.target.files[0]);
}

function userImageUploaded() {
    ml5.imageClassifier('./model/model.json')
    .then(classifier => classifier.classify(img))
    .then(results => {
        console.log(results);
        if(Math.round((results[0].confidence + Number.EPSILON) * 100) / 100 > 0.8) {
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
                "imgName": imgName,
                "date": Date.now(),
            };

            sendImage();

            // Add to collection in localstorage
            listCollection.push(data);
            // Update local storage
            let listFavoritesString = JSON.stringify(listCollection);
            localStorage.setItem("listCollection", listFavoritesString);
            window.location.href = "result.html?id=" + id;
        } else {
            window.location.href = "noresult.html";
        }
    });
}

function sendImage() {
    const formData = new FormData();
    formData.append('image', uploadButton.files[0]);
    const options = {
        method: 'POST',
        body: formData,
    };
    fetch('http://localhost:3000/image', options);
}

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    submitButton.innerHTML = "Verzenden";
    submitButton.removeAttribute("disabled");
}
