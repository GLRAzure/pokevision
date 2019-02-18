<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Poke-Vision</span>        
      </v-toolbar-title>
      <v-spacer></v-spacer>     
    </v-toolbar>
    <v-content>
      <Capture />
    </v-content>
  </v-app>
</template>

<script>
import Capture from './components/Capture'

export default {
  name: 'App',
  components: {
    Capture
  },
  data () {
    return {
      //
    }
  }
}
</script>
