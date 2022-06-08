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
    uploadButton.classList.add('uploaded');
}

function userImageUploaded() {
    submitButton.innerHTML = "<i class='fa fa-spinner fa-spin'></i> Laden"
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

            sendImage(data, id);
        } else {
            window.location.href = "noresult.html";
        }
    });
}

function sendImage(data, id) {
    const formData = new FormData();
    formData.append('image', uploadButton.files[0]);
    const options = {
        method: 'POST',
        body: formData,
    };
    fetch('http://kasperofzeau.nl:3000/image', options);

    addToLocalStorage(data, id);
}

function addToLocalStorage(data, id) {
    // Add to collection in localstorage
    listCollection.push(data);
    // Update local storage
    let listCollectionString = JSON.stringify(listCollection);
    localStorage.setItem("listCollection", listCollectionString);

    // Go to result page
    window.location.href = "result.html?id=" + id;
}

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    submitButton.innerHTML = "Verzenden";
    submitButton.removeAttribute("disabled");
}
