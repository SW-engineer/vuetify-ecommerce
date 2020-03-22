<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          v-model="email"
          required
          :rules="emailRules"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <!-- <v-btn color="success">Register</v-btn> -->
      <v-spacer></v-spacer>
      <v-btn color="info" @click="submit" :disabled="!valid">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import Router from "../router";

export default {
  name: "LoginPage",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      showPassword: false,
      emailRules: [v => !!v || "Email is required"],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios
          .post(`${this.$store.state.apiUrl}/login`, {
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (response.data.accessToken) {
              alert("Welcome!");
              this.$store.commit("setAccessToken", response.data.accessToken);
              Router.push({ name: "ProductList" });
            } else {
              alert(response.data.message);
            }
          })
          .catch(e => {
            console.log(e);
            // this.errors.push(e);
          });
      }
    }
  }
};
</script>

<style></style>
