<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Poke-Vision</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap>
          <v-flex xs12>
            <Capture @image-captured="onImageCaptured" @image-cleared="onImageCleared"/>
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

import { getProjects } from "./clientApi";

export default {
  name: "App",
  components: {
    Capture,
    PokeInfo
  },
  data() {
    return {
      img: null,
      projects: null
    };
  },
  methods: {
    onImageCaptured: function(img) {
      console.log("app onImageCaptured");
      this.img = img;
    },
    onImageCleared: function() {
      console.log("app onImageCleared");
      this.img = null;
    }
  },
  created: async function() {
    this.projects = await getProjects();
  }
};
</script>
