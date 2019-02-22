export async function getProjects(apiUri) {
  apiUri = apiUri || "/api/";

  const result = await fetch(`${apiUri}projects`, { method: "GET" });
  const body = result.json();
  return body;
}
