<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Ecommerce</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-for="link in $store.getters.getLinks" :key="`${link.label}-header-link`">
        <v-btn text rounded :to="link.url">{{ link.label }}</v-btn>
      </div>
      <div>
        <v-btn v-if="$store.getters.getAccessToken" text rounded @click="logout">Log Out</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="primary lighten-1" padless>
      <v-layout justify-center wrap>
        <v-flex primary lighten-2 py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} —
          <strong>Ecommerce</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
// import store from "./data/store";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      // links: this.$store.getters.getLinks
    };
  },
  created() {
    console.log(this.$store.getters.getAccessToken);
  },
  methods: {
    logout() {
      let axiosConfig = {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`
        }
      };
      axios
        .post(`${this.$store.state.apiUrl}/logout`, axiosConfig)
        .then(response => {
          alert(response.message);
          this.$store.commit("logout");
        })
        .catch(e => {
          alert(e.response.data.message);
          // this.errors.push(e);
        });
    }
  }
};
</script>
