<template>
  <div>
    <div v-show="img">Image received</div>
    <div v-if="topResponse">
      <div>Your Pokemon is {{topResponse.tagName}} ({{topResponse.probabilityShort}}%)</div>
      <div>all predictions:</div>
      <div v-for="prediction in predictions">
        {{ prediction.tagName }} ({{prediction.probabilityShort }}%)
      </div>
      </div>
    
  </div>
</template>

<script>
import { getPredictionClient } from "../azureCustomVision";

const client = getPredictionClient(
  "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/",
  "426cf8d2-6977-41a0-8752-40465286c030",
  "e71d0537d82547179428f8a5397c4fac"
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

function toRoundedPercent(inval) {
  return Math.round(inval*10000)/100;
}

export default {
  data: function() {
    return {
      topResponse: null,
      predictions: null
    };
  },
  watch: {
    img: async function(newVal) {
      console.log("watch:img");
      const response = await client(dataURItoBlob(newVal));
      console.log("got response", response);
      if (response.predictions && response.predictions.length) {
        this.predictions = response.predictions
          .sort((a,b) => b.probability - a.probability)
          .map(p => ({ probabilityShort: toRoundedPercent(p.probability), ...p}));
        console.log("getting top response");
        const topResponse = this.predictions[0];
        console.log("Top response:", topResponse);
        this.topResponse = topResponse;
      }
    }
  },
  props: ["img"]
};
</script>

<style>
</style>
