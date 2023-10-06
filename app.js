const submitButton = document.getElementById("submit-btn");
const toastMessage = document.getElementById("toast");
const card = document.getElementById("main-card");
const emailField = document.getElementById("email-field");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function openToast(type) {
  switch (type) {
    case "success":
      toastMessage.classList.remove("border-success");
      toastMessage.classList.add("border-danger");
      break;
    case "danger":
      toastMessage.classList.remove("border-danger");
      toastMessage.classList.add("border-success");
      break;
    default:
      toastMessage.classList.remove("border-danger");
      toastMessage.classList.remove("border-success");
      toastMessage.classList.add("border-primary");
      break;
  }
  card.style.marginBottom = "0rem";
  toastMessage.classList.add("is-shown");
}
function closeToast() {
  card.style.marginBottom = "-3rem";
  card.style.transitionDelay = "0.3s";
  toastMessage.classList.remove("is-shown");
  card.style.transitionDelay = "0s";
}

submitButton.addEventListener("click", () => {
  if (!emailField.value.match(emailRegex)) {
    toastMessage.innerHTML = `
        <span class="text-danger">
            <i class="bi bi-exclamation-circle-fill"></i>
            Invalid Email
        </span>
    `;
    openToast("danger");
    setTimeout(() => {
      closeToast();
    }, 5000);
    return;
  }
  fetch("https://formspree.io/f/mdoragvb", {
    method: "POST",
    body: JSON.stringify({
      email: emailField.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      toastMessage.innerHTML = `
        <span class="text-success">
            <i class="bi bi-check-circle"></i>
            Request sent successfully
        </span>
        `;
      openToast("success");
    })
    .catch(() => {
      toastMessage.innerHTML = `
        <span class="text-danger">
            <i class="bi bi-exclamation-circle-fill"></i>
            Something went wrong, please try again later
        </span>
        `;
      openToast("danger");
    })
    .finally(() => {
      setTimeout(() => {
        closeToast();
      }, 5000);
    });
});
