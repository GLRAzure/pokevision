<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Poke-Vision</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout text-xs-center wrap>
          <v-flex xs12>
            <Capture @image-captured="onImageCaptured"/>
          </v-flex>
        </v-layout>
        <PokeInfo v-bind:img="img"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Capture from "./components/Capture";
import PokeInfo from "./components/PokeInfo";

export default {
  name: "App",
  components: {
    Capture,
    PokeInfo
  },
  data() {
    return {
      img: null
    };
  },
  methods: {
    onImageCaptured: function(img) {
      console.log("app onImageCaptured");
      this.img = img;
    }
  }
};
</script>
