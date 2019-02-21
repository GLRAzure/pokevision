/**
 * closure that returns an async function
 * @param {string} predictionEndpointUri
 * @param {string} predictionKey
 * @returns function that takes an image binary and returns a prediction json
 */
export function getPredictionClient(predictionEndpointUri, appId, predictionKey) {
  // set up headers for the requests
  const headers = new Headers({
    // ContentType: "application/octet-stream",
    "Prediction-Key": predictionKey,
    "Content-Type": "multipart/form-data"
  });

  const predictionEndpointFullUri = `${predictionEndpointUri}/${appId}/image`

  return async function predict(image) {
    const response = await fetch(
      new Request(predictionEndpointFullUri, {
        method: "POST",
        headers,
        body: image
      })
    );
    // debugger;
    if (response.status == 200) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  };
}
