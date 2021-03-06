<template>
  <div>
    <v-card v-show="inCaptureMode">
      <v-responsive >
        <web-cam
          ref="webcam"
          :device-id="deviceId"
          width="100%"          
          @started="onStarted"
          @stopped="onStopped"
          @error="onError"
          @cameras="onCameras"
          @camera-change="onCameraChange"

        />            
      </v-responsive>
      <v-card-actions class="text-xs-center">
        <v-spacer></v-spacer>
        <div v-show="this.devices.length > 0">
          <select v-model="camera">
            <option>-- Select Device --</option>
            <option
              v-for="device in devices"
              :key="device.deviceId"
              :value="device.deviceId"
            >{{ device.label }}</option>
          </select>
          <v-btn fab dark large color="purple" @click="onNextDevice">
            <v-icon dark>fa-sync-alt</v-icon>
          </v-btn>
        </div>
        <v-btn fab dark large color="info" @click="onCapture">
          <v-icon dark>fa-camera</v-icon>
        </v-btn>
    </v-card-actions>
    </v-card>
    <div v-show="!inCaptureMode">
      <v-btn color="info" @click="onClearCapture">Clear Capture</v-btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import WebCam from "vue-web-cam";
import { find, head, findIndex } from "lodash";

console.log(WebCam);
const wc = Vue.component(WebCam.WebCam.name, WebCam.WebCam);

export default {
  components: {
    WebCam: wc
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      inCaptureMode: true
    };
  },
  computed: {
    device: function() {
      return find(this.devices, n => n.deviceId == this.deviceId);
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      let first = head(this.devices);
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webcam.capture();
      this.inCaptureMode = false;
      this.$emit("image-captured", this.img);
    },
    onClearCapture() {
      this.inCaptureMode = true;
      this.$emit("image-cleared");
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    },
    onNextDevice() {
      if (this.devices && this.devices.length) {
        console.log(this);
        let thisIndex =
          findIndex(this.devices, d => d.deviceId === this.deviceId) + 1;
        if (thisIndex >= this.devices.length) thisIndex = 0;
        const { deviceId } = this.devices[thisIndex];
        this.deviceId = deviceId;
        this.camera = deviceId;
      }
    }
  }
};
</script>

<style lang="less">
</style>