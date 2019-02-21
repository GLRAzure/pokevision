<template>
  <div>
    <div v-show="img">Image received</div>
    <div v-show="pokemonName">Your Pokemon is {{pokemonName}}</div>
  </div>
</template>

<script>
import { getPredictionClient } from "../azureCustomVision";

const client = getPredictionClient(
  "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/",
  "a504cd822ef2404f85e63a505d8d5f0f"
);

export default {
  data: function() {
    return {
      pokemonName: null,
      img: null
    };
  },
  watch: {
    img: async function(newVal) {
      console.log("watch:img");
      const response = await client(newVal);
      console.log("got response", response);
    }
  },
  props: ["image"],
  methods: {
    async setPokemonImage(img) {
      const response = await client(img);
      console.log("got response", response);
    }
  }
};
</script>

<style>
</style>
