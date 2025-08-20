document.getElementById("apiForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const callerid = document.getElementById("callerid").value;

  try {
    const response = await fetch(`http://localhost:3000/enrich?callerid=${encodeURIComponent(callerid)}`);
    const data = await response.json();

    document.getElementById("responseBox").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("responseBox").textContent = "❌ Error: " + error.message;
  }
});
