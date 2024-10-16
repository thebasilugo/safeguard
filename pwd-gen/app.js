// Selecting necessary DOM elements
const body = document.querySelector("body");
const lengthSlider = document.querySelector(".pass-length input");
const sliderValue = document.querySelector(".pass-length span");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector("#copy-icon");
const passwordInput = document.querySelector(".input-box input");
const passLengthRange = document.querySelector("#pass-length-range");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");
const messageAlertIndicator = document.querySelector(".alert-container");
const addBtn = document.querySelector(".add-btn");

// Selecting checkboxes
const lowercaseCheckBox = document.querySelector("#lowercase").checked;
const uppercaseCheckBox = document.querySelector("#uppercase").checked;
const numbersCheckBox = document.querySelector("#numbers").checked;
const symbolsCheckBox = document.querySelector("#symbols").checked;
const spacesCheckBox = document.querySelector("#spaces").checked;
const excDuplicateCheckBox = document.querySelector("#exc-duplicate").checked;

// Character sets for password generation
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@$",
};

// Function to generate password
const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = lengthSlider.value;
  console.log(passLength);

  // Loop through each option's checkbox
  options.forEach((option) => {
    // looping through each option's checkbox
    if (option.checked) {
      // if checkbox is checked
      // lowercase + excDup = 26
      // lowercase + symbols + excDup = 29
      if (option.id === "lowercase" && option.id === "exc-duplicate") {
        passLengthRange.setAttribute("max", "26");
      }
      // else if (
      //   option.id === "lowercase" &&
      //   option.id === "symbols" &&
      //   option.id === "exc-duplicate"
      // ) {
      //   if (passLength >= 29) {
      //     passLength = 29;
      //   }
      //   passLength = Math.min(passLength, 26);
      // }
      else if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        // if checkbox id isn't exc-duplicate && spaces
        // adding particular key value from character object to staticPassword
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        // if checkbox id is spaces
        staticPassword += ` ${staticPassword} `; // adding space to beginning and end of staticPassword
      } else {
        // else pass 'true' value to excludeDuplicate
        excludeDuplicate = true;
      }
    }
  });

  // Event listener for range change
  passLengthRange.addEventListener("change", () => {
    if (lowercaseCheckBox && excDuplicateCheckBox) {
      passLengthRange.max = 26;
      if (passLengthRange.value > 26) {
        passLengthRange.value = 26;
      }
    }
  });

  // Generate password
  for (let i = 0; i < passLength; i++) {
    // getting random character from the static password
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      // if excludeDuplicate is true
      // if randomPassword doesn't contain the current random character or randomChar is equal to space " ", then add randomChar to randomPassword or else decrement i by 1
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }

  // Set generated password to input field
  passwordInput.value = randomPassword; // passing randomPassword into the input field
};

// Function to update password strength indicator
const updatePassIndicator = () => {
  // less than 8 = weak, less than 16 = medium, else = strong
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

// Function to update slider value
const updateSlider = () => {
  // passing slider value as counter text
  sliderValue.innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

// Initial slider update
updateSlider();

// Function to copy password to clipboard
const copyPassword = () => {
  // writeText writes the passed text to the system clipboard
  navigator.clipboard.writeText(passwordInput.value);
  showAlert("Password Copied!", true);
};

// Event listener for copy icon click
copyIcon.addEventListener("click", () => {
  let iElement = copyIcon.querySelector("i");
  iElement.classList.remove("copy");
  iElement.classList.remove("outline");
  iElement.classList.add("check");
  // change the icon back to copy after 1 second
  setTimeout(() => {
    iElement.classList.remove("check");
    iElement.classList.add("copy");
    iElement.classList.add("outline");
  }, 1000);
  copyPassword();
});

// addBtn title (onHover) and Event listener for addBtn's adding password to password book
addBtn.title = `add to password book`;
addBtn.addEventListener("click", () => {
  // showAlert(`${passwordInput.value} added`, true);
  showAlert(`internal error.`, false);
});

// Function to show alert
function showAlert(message, code) {
  // Update the text in the alert container
  messageAlertIndicator.textContent = message;
  messageAlertIndicator.style.backgroundColor = code
    ? "var(--success)"
    : "var(--failure)";

  // remove the 'remove' class to show the alert
  messageAlertIndicator.classList.remove("remove");

  // add the 'remove' class after 1.5 seconds to hide the alert
  setTimeout(() => {
    messageAlertIndicator.classList.add("remove");
  }, 1500);
}

// // Function to add password to password book
// function addPasswordToPasswordBook() {
//   // let passwordList = {}; // object to store passwords (password, tag) in an array

//   // Show alert
//   // showAlert(`${passwordInput.value} Added to Password Book!`, true);
// }

// copyIcon.addEventListener("input", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

// future updates:
// breaks with excludeDuplicate involved! fix it.
// lowercase + excDup = 26
// lowercase + symbols + excDup = 29
// lowercase + numbers + excDup = 36
// lowercase + uppercase + excDup = 52
// check strength of password
// save passwords to password book
// login to password book to view password
// recover main password through mail

// show the saved info & passwords
const showSavedPassword = document.querySelector(".show-saved-password");

// Get the modal
const passwordModal = document.querySelector("#password-modal");

// Get the button that opens the modal
const modalBtn = document.querySelector(".modal-btn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
modalBtn.onclick = function () {
  passwordModal.style.display = "block";
  showSavedPassword.innerHTML =
    // ${passwordInput.value} <br/> <br/>
    `<br/> <br/>
    'saved passwords' feature isn't available yet. <br/> please copy a password if you would like to use it.`;
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  passwordModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == passwordModal) {
    passwordModal.style.display = "none";
  }
};
