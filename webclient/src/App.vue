<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Poke-Vision</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-subheader>project:</v-subheader>
      <v-menu v-show="projects" :nudge-width="100">
        <v-btn slot="activator">
          <span>{{ curProject ? curProject.name : "Projects"}}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile
            v-for="project in projects"
            :key="project.id"
            @click="selectProject(project)"
          >
            <v-list-tile-title v-text="project.name"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap>
          <v-flex xs12>
            <Capture @image-captured="onImageCaptured" @image-cleared="onImageCleared"/>
          </v-flex>
        </v-layout>
        <PokeInfo v-bind:img="img" 
          v-bind:projectId="curProject && curProject.id" 
          v-bind:predictionUri="config && config.CUSTOMVISION_PREDICTION_ENDPOINT"
          v-bind:predictionKey="config && config.CUSTOMVISION_PREDICTION_KEY" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Capture from "./components/Capture";
import PokeInfo from "./components/PokeInfo";

import { getProjects, getConfig } from "./clientApi";

export default {
  name: "App",
  components: {
    Capture,
    PokeInfo
  },
  data() {
    return {
      img: null,
      projects: null,
      curProject: null,
      config: null
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
    },
    selectProject: function (newProject) {
      console.log('selectProject', newProject);
      this.curProject = newProject;
    }
  },
  created: async function() {
    this.config = await getConfig();

    this.projects = await getProjects();
    if (this.projects) {
      this.curProject = this.projects[0];
    }
  }
};
</script>
