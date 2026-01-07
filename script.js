// Step 1: Find the form by ID
document.getElementById("contactForm").addEventListener("submit", async function (e) {

  // Step 2: Stop page refresh
  e.preventDefault();

  // Step 3: Read values from form inputs
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    // Step 4: Send data to ASP.NET Web API
    const response = await fetch("http://localhost:5169/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // Step 5: Read API response
    const result = await response.json();

    // Step 6: Show success message
    document.getElementById("status").innerText = result.message;

  } catch (error) {
    // Step 7: Show error message
    document.getElementById("status").innerText = "Error sending message";
  }
});
