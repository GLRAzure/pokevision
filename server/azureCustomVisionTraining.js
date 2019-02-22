const {Headers} = require('node-fetch');
const fetch = require('node-fetch');

module.exports.getTrainingClient = (trainingEndpointUri, trainingKey) => {
  const headers = new Headers({
    "Training-Key": trainingKey
  });

  console.log(headers, Headers);

  async function makeReq(uri, method, body) {
    method = method || "GET";
    const response = await fetch(uri, {method, body, headers});
    return response.json();
  }
 
  return {
    GetProjects: async () => {
      return await makeReq(`${trainingEndpointUri}projects`);
    },
    GetTags: async (projectId) => {
      return await makeReq(`${trainingEndpointUri}projects/${projectId}/tags`);
    }
  };
}