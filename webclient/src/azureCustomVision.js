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

  const predictionEndpointFullUri = `${predictionEndpointUri}${appId}/image`

  return async function predict(image) {
    const response = await fetch(
      new Request(predictionEndpointFullUri, {
        method: "POST",
        headers,
        body: image
      })
    );
    const success = response.status === 200;
    const body = await response.json();
    const result = {
      success,
      status: response.status,
      data: success && body,
      error: !success && body
    }
    return result;
  };
}
