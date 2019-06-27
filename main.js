// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

  const errorModal = document.getElementById('modal')
  const errorMessage = document.getElementById('modal-message')

 function hideError() {
   errorModal.classList.add('hidden')
   errorMessage.textContent = ''
 }

 function showError(specificError) {
   console.error("inside showError: ", specificError)
   errorModal.classList.remove('hidden')
   errorMessage.textContent = specificError
 }

 function likeListener() {
   // An array of all of the hearts on the page.
   const hearts = document.getElementsByClassName('like-glyph')

   // Iterating over the array to have access to a listener for each like
   for (heart of hearts) {
     clickLike(heart)
   }
 }

 function clickLike(like) {
   // Adding event listener for each like.
   like.addEventListener("click", () => {
     // Server call is replacing a fetch in this example
     mimicServerCall()
     // if the request goes through we want to update the likes
     .then((response) => {
       updateLikes(like)
     })
     // if there is an error we want to display it for 5 seconds
     .catch((error) => {
       showError(error);
       setTimeout(hideError, 5000);
     })
   })
 }

 // This function checks the classList for the like to see if it has been activated
 function updateLikes(specificLike) {
   if (specificLike.classList[1] === "activated-heart") {
     specificLike.classList.remove('activated-heart')
   }
   else {
     specificLike.classList.add('activated-heart')
   }
 }

 // Here is our main function where we call hideError first and then add our listener
 function main() {
   hideError()
   likeListener()
 }

 main()

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
