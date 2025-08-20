document.getElementById("callerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const callerid = document.getElementById("callerid").value;

  try {
    const response = await fetch(`/enrich?callerid=${encodeURIComponent(callerid)}`);
    const data = await response.json();

    document.getElementById("response").textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("response").textContent = "❌ Error: " + err.message;
  }
});
