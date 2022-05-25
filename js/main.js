const message = document.querySelector("#message")
const uploadButton = document.querySelector("#file")
const img = document.querySelector("#img")

uploadButton.addEventListener("change", event => loadFile(event))
img.addEventListener("load", () => userImageUploaded())

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

function loadFile(event) {
    img.src = URL.createObjectURL(event.target.files[0])
}

function userImageUploaded() {
    message.innerHTML = "Image was loaded!"
    classifier.classify(img, (err, results) => {
        console.log(results);
        //message.innerHTML = `I think it's a ${results[0].label}!`
        let imageResult = results[0].label

        // Put the image result into the localstorage for future use
        localStorage.setItem("imageResult", imageResult)
        window.location.href = "result.html";
    });
}

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    message.innerHTML = "Please upload an image of a bird!"
}
