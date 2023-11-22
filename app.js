const lengthSlider = document.querySelector(".pass-length input");
const sliderValue = document.querySelector(".pass-length span");
const options = document.querySelectorAll(".option input");
// const copyIcon = document.querySelector(".input-box span far fa-copy");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");
const copyIndicator = document.querySelector("alert-container active");


const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@$"
}

const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let passLength = lengthSlider.value;
  
  options.forEach(option => { 
    // looping through each option's checkbox
    if(option.checked) {
      // if checkbox is checked
      console.log(option)
      // if checkbox id isn't exc-duplicate && spaces
      if(option.id !== "exc-duplicate" && option.id !== "spaces") {
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

  // excludeDuplicate's update (common)
  for (let i = 0; i < passLength; i++) {
    // getting random character from the static password
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if(excludeDuplicate) { // if excludeDuplicate is true
      // if randomPassword doesn't contain the current random character or randomChar is equal to space " ", then add randomChar to randomPassword
      if(!randomPassword.includes(randomChar) || randomChar == " ") {
        randomPassword += randomChar;
      } else { // else decrement i by 1
          i--;
      }
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword; // passing randomPassword into the input field
}

const updatePassIndicator = () => {
  // less than 8 = weak, less than 16 = medium, else = strong
  if(lengthSlider.value <= 8) {
    passIndicator.id = "weak";
  } else if(lengthSlider.value <= 16) {
    passIndicator.id = "medium";
    // add 24 = good
  } else {
    passIndicator.id = "strong";
  }
}

const updateSlider = () => {
  // passing slider value as counter text
  console.log(lengthSlider.value);
  sliderValue.innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
}

updateSlider();

const copyPassword = () => {
  // writeText writes the passed text to the system clipboard
  // copyIcon.addEventListener('click', copyNotification);

  navigator.clipboard.writeText(passwordInput.value);
  // copyIcon.innerText = "check";
}

const copyNotification = () => {
  if (copyIndicator.classList == "alert-container active"){
    // copyIndicator.className == "alert-container";
    console.log("bleh")
  }
}

// copyIcon.addEventListener("input", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
