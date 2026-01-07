// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");
  const submitBtn = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Read input values
    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      status.innerText = "❌ Please fill all fields.";
      status.style.color = "red";
      return;
    }

    // UI feedback
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    status.innerText = "";

    try {
      const response = await fetch("http://localhost:5169/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();

      status.innerText = "✅ Message sent successfully!";
      status.style.color = "green";
      form.reset();

    } catch (error) {
      status.innerText = "❌ Backend not reachable. Please try again later.";
      status.style.color = "red";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";
    }
  });
});
