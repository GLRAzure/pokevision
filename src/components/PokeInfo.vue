<template>
  <div>
    <div v-show="img">Image received</div>
    <div>Your Pokemon is {{pokemonName}}</div>
  </div>
</template>

<script>
import { getPredictionClient } from "../azureCustomVision";

const client = getPredictionClient(
  "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/",
  "426cf8d2-6977-41a0-8752-40465286c030",
  "a504cd822ef2404f85e63a505d8d5f0f"
);

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

export default {
  data: function() {
    return {
      pokemonName: null
    };
  },
  watch: {
    img: async function(newVal) {
      console.log("watch:img");
      const response = await client(dataURItoBlob(newVal));
      console.log("got response", response);
      if (response.predictions && response.predictions.length) {
        console.log("getting top response");
        const topResponse = response.predictions.sort((a,b) => b.probability - a.probability)[0];
        console.log("Top response:", topResponse);
        this.pokemonName = topResponse.tagName;
      }
    }
  },
  props: ["img"]
};
</script>

<style>
</style>
