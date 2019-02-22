const defaultApiUri = "http://localhost:3000/"; // "https://techoapi.azurewebsites.net/"; /

export async function getProjects() {
  const result = await fetch(`${defaultApiUri}projects`, { method: "GET" });
  const body = result.json();
  return body;
}

export async function getConfig() {
  const result = await fetch(`${defaultApiUri}config`, { method: "GET" });
  const body = result.json();
  return body;
}