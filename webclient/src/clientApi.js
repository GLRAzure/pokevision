export async function getProjects(apiUri) {
  apiUri = apiUri || "https://techoapi.azurewebsites.net/"; // http://localhost:3000/

  const result = await fetch(`${apiUri}projects`, { method: "GET" });
  const body = result.json();
  return body;
}
