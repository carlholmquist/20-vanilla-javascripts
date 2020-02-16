const form = document.getElementById("id");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("confirmed password");

assignClass = (input, classType, message) => {
  const formControl = input.parentElement;
  formControl.className = `form-control ${classType}`;
  formControl.querySelector("small").innerText = message;
};

checkLength = (input, min, max) => {
  if (input.value.length < min) {
    assignClass(
      input,
      "error",
      `${input.id} must be at least ${min} characters long`
    );
  } else if (input.value.length > max) {
    assignClass(
      input,
      "error",
      `${input.id} can be max ${max} characters long`
    );
  } else {
    assignClass(input, "success");
  }
};

checkPasswordMatch = (pass1, pass2) => {
  if (pass2.value === pass1.value) {
    assignClass(pass2, "success");
  } else {
    assignClass(pass2, "error", `password does not match`);
  }
};

checkEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(email.value)) {
    assignClass(email, "success");
  } else {
    assignClass(email, "error", `Email is not valid`);
  }
};

//Eventlistener
form.addEventListener("submit", function(event) {
  event.preventDefault();
  //Check Username length
  checkLength(username, 3, 15);
  //Check email
  checkEmail(email);
  //Check password length
  checkLength(password, 6, 25);
  //Check password match
  checkPasswordMatch(password, password2);
});
