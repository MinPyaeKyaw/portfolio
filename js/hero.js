const role = document.getElementById("role");

const roleTypingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      type("A Software Engineer", entry.target);
    }
  });
});

roleTypingObserver.observe(role);
