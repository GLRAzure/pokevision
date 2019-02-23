<template>
  <div>
    <v-alert v-if="error" :value="true" type="error">
      Error: {{error.message}}
    </v-alert>
    <div v-show="img">      
      <figure class="figure">
        <img :src="img" class="img-responsive">
      </figure>
    </div>
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
      predictions: null,
      error: null
    };
  },
  watch: {
    img: async function(newVal) {
      this.error = null;
      console.log("watch:img");
      if (!newVal) {
        this.predictions = null;
        this.topResponse = null;
        return;
      }
      const client = getPredictionClient(
        this.predictionUri,
        this.projectId,
        this.predictionKey
      );
      const result = await client(dataURItoBlob(newVal));
      if (result.success) {
        const response = result.data;
        console.log("got response", result);
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
      else 
      {
        this.predictions = null;
        this.topResponse = null;
        this.error = result.error;
      }
    }
  },
  props: ["img", "projectId", "predictionUri", "predictionKey"]
};
</script>

<style>
</style>
