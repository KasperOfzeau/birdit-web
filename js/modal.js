// Get the modal
let modal = document.getElementById("tutorialodal");

// Get the <span> element that closes the modal
let closeButton = document.getElementsByClassName("close-btn")[0];

// When the user clicks on the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

openModal();