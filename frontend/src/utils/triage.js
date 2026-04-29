const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export async function callTriage(symptoms, location = null) {
  console.log("Calling backend at:", BACKEND_URL);

  try {
    const response = await fetch(`${BACKEND_URL}/api/triage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms, location }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      throw new Error("Backend error: " + response.status);
    }

    const data = await response.json();
    console.log("Triage result:", data);
    return data;

  } catch (err) {
    console.error("Fetch failed:", err.message);
    throw err;
  }
}