const body = document.querySelector("body");
const lengthSlider = document.querySelector(".pass-length input");
const sliderValue = document.querySelector(".pass-length span");
const options = document.querySelectorAll(".option input");
// const copyIcon = document.querySelector(".input-box span far fa-copy");
const passwordInput = document.querySelector(".input-box input");
const passLengthRange = document.querySelector("#pass-length-range");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");
const copyIndicator = document.querySelector("alert-container active");

// checkboxes
const lowercaseCheckBox = document.querySelector("#lowercase").checked;
const uppercaseCheckBox = document.querySelector("#uppercase").checked;
const numbersCheckBox = document.querySelector("#numbers").checked;
const symbolsCheckBox = document.querySelector("#symbols").checked;
const spacesCheckBox = document.querySelector("#spaces").checked;
const excDuplicateCheckBox = document.querySelector("#exc-duplicate").checked;

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@$",
};

const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = lengthSlider.value;
  console.log(passLength);

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

  passLengthRange.addEventListener("change", () => {
    if (lowercaseCheckBox && excDuplicateCheckBox) {
      passLengthRange.max = 26;
      if (passLengthRange.value > 26) {
        passLengthRange.value = 26;
      }
    }
  });

  // // the original
  // for (let i = 0; i < passLength; i++) {
  //   randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)];
  // }

  // excludeDuplicate's update (ternary)
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

  // // excludeDuplicate's update (common)
  // for (let i = 0; i < passLength; i++) {
  //   // getting random character from the static password
  //   let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
  //   if(excludeDuplicate) { // if excludeDuplicate is true
  //     // if randomPassword doesn't contain the current random character or randomChar is equal to space " ", then add randomChar to randomPassword
  //     if(!randomPassword.includes(randomChar) || randomChar == " ") {
  //       randomPassword += randomChar;
  //     } else { // else decrement i by 1
  //         i--;
  //     }
  //   } else {
  //     randomPassword += randomChar;
  //   }
  // }

  // console.log(randomPassword);
  passwordInput.value = randomPassword; // passing randomPassword into the input field
};

const updatePassIndicator = () => {
  // ternary
  // less than 8 = weak, less than 16 = medium, else = strong
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";

  //   // common
  //   // less than 8 = weak, less than 16 = medium, else = strong
  //   if(lengthSlider.value <= 8) {
  //     passIndicator.id = "weak";
  //   } else if(lengthSlider.value <= 16) {
  //     passIndicator.id = "medium";
  //     // add 24 = good
  //   } else {
  //     passIndicator.id = "strong";
  //   }
};

const updateSlider = () => {
  // passing slider value as counter text
  // console.log(lengthSlider.value);
  sliderValue.innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

updateSlider();

const copyPassword = () => {
  // writeText writes the passed text to the system clipboard

  // copyIcon.addEventListener('click', copyNotification);

  navigator.clipboard.writeText(passwordInput.value);
  // copyIcon.innerText = "check";
};

const copyNotification = () => {
  if (copyIndicator.classList == "alert-container active") {
    // copyIndicator.className == "alert-container";
    console.log("bleh");
  }
};

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
  showSavedPassword.innerHTML = passwordInput.value;
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  passwordModal.style.display = "none";
};

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == passwordModal) {
//     passwordModal.style.display = "none";
//   }
// };
