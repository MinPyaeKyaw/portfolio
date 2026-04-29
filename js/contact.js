const email = document.getElementById("email");
const phone = document.getElementById("phone");

const emailTypingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      type("saiminpyaekyaw@gmail.com", entry.target);
    } else {
      entry.target.textContent = "";
    }
  });
});
const phoneTypingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      type("+95 9 409 291 144", entry.target);
    } else {
      entry.target.textContent = "";
    }
  });
});

emailTypingObserver.observe(email);
phoneTypingObserver.observe(phone);
