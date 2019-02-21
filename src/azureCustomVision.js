/**
 * closure that returns an async function
 * @param {string} predictionEndpointUri
 * @param {string} predictionKey
 * @returns function that takes an image binary and returns a prediction json
 */
export function getPredictionClient(predictionEndpointUri, predictionKey) {
  // set up headers for the requests
  const headers = new Headers({
    ContentType: "application/octet-stream",
    "Prediction-Key": predictionKey
  });

  return async function prediect(image) {
    const response = await fetch(
      new Request(predictionEndpointUri, {
        method: "POST",
        headers,
        body: image
      })
    );

    if (response.status == 200) {
      return JSON.parse(response.body);
    } else {
      throw new Error(response.statusText);
    }
  };
}
