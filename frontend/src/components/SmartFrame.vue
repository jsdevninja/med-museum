<template>
  <v-container fill-height fluid pa-0>
    <v-snackbar
      v-model="isError"
      timeout="5000"
      color="warning"
      elevation="2"
      top
      text
    >
      API Request Failed!
      <template v-slot:action="{ attrs }">
        <v-btn color="warning" text v-bind="attrs" @click="isError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="isLoading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <div class="img-container" v-if="data" @click="toggleDetail()">
      <v-img :src="data.primaryImage" class="w-full h-full" />
    </div>
    <v-dialog
      v-model="showDetail"
      persistent
      width="50%"
      overlay-opacity="0.7"
      overlay-color="black"
    >
      <v-card v-if="data">
        <v-toolbar flat color="white">
          <v-toolbar-title class="d-flex">Museum Detail</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="dialog-content">
          <v-col>
            <v-row class="my-2 pb-2 border-light">
              Title: {{ data.title }}
            </v-row>
            <v-row class="my-2 pb-2 border-light">
              Year: {{ data.accessionYear }}
            </v-row>
            <v-row class="my-2 pb-2 border-light">
              Country: {{ data.country }}
            </v-row>
            <v-row class="my-2 pb-2 border-light">
              City: {{ data.city }}
            </v-row>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="toggleDetail()"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Api from "@/utils/Api";
// import axios from "axios";
export default {
  name: "SmartFrame",

  data: () => ({
    time: 0,
    interval: null,
    isLoading: false,
    ids: [],
    currIndex: -1,
    data: null,
    upcomingData: null,
    showDetail: false,
    isError: false,
  }),

  watch: {
    time: function (val) {
      if (val % 10 === 2) {
        this.fetchMuseum(false);
      } else if (val % 10 === 0) {
        this.data = this.upcomingData;
      }
    },
  },

  mounted() {
    this.isLoading = true;
    const self = this;
    Api.get("/museum")
      .then((res) => {
        this.isLoading = false;
        this.ids = res.data.objectIDs;
        this.fetchMuseum();
        this.interval = window.setInterval(function () {
          if (!self.showDetail) {
            self.time++;
          }
        }, 1000);
      })
      .catch(() => {
        this.isError = true;
        this.isLoading = false;
        if (this.interval) {
          window.clearInterval(this.interval);
        }
      });
  },
  methods: {
    toggleDetail() {
      this.showDetail = !this.showDetail;
    },
    fetchMuseum(isCurrent = true) {
      this.currIndex = (this.currIndex + 1) % this.ids.length;
      Api.get(`/museum/${this.ids[this.currIndex]}`)
        .then((res) => {
          if (isCurrent) {
            this.data = res.data;
          } else {
            this.upcomingData = res.data;
          }
        })
        .catch(() => {
          this.isError = true;
          if (this.interval) {
            window.clearInterval(this.interval);
          }
        });
    },
  },
};
</script>

<style scoped>
.img-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: pointer;
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
</style>
