<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Username"
          prepend-icon="mdi-account-circle"
          v-model="name"
          :counter="10"
          required
          :rules="nameRules"
        />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          prepend-icon="mdi-email"
          required
        ></v-text-field>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="edu_start_date"
              label="Education Start Date"
              :rules="[v => !!v || 'The education start date field is required.']"
              prepend-icon="mdi-calendar-blank"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="edu_start_date" @input="menu1 = false"></v-date-picker>
        </v-menu>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="edu_end_date"
              label="Education End Date"
              :rules="[v => !!v || 'The education end date field is required.']"
              prepend-icon="mdi-calendar-blank"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="edu_end_date" @input="menu2 = false"></v-date-picker>
        </v-menu>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Confirm Password"
          :rules="confirmpasswordRules"
          v-model="password_confirmation"
          prepend-icon="mdi-lock"
        />
        <v-checkbox
          v-model="terms"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="I agree to the terms of conditions"
          required
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info" @click="submit" :disabled="!valid">Get Started</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import axios from "axios";
import Router from "../router";

export default {
  name: "RegisterPage",
  data() {
    return {
      valid: false,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      edu_start_date: "",
      edu_end_date: "",
      nameRules: [v => !!v || "Name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Pasword is required",
        v =>
          (v && v.length >= 6) || "The password must be at least 6 characters."
      ],
      confirmpasswordRules: [
        v =>
          (v && v == this.password) ||
          "The password confirmation does not match."
      ],
      showPassword: false,
      terms: false,
      menu1: false,
      menu2: false
    };
  },

  methods: {
    submit() {
      if (this.edu_start_date > this.edu_end_date) {
        alert(
          "Education start date should be greater than education start date"
        );
        return;
      } else if (this.$refs.form.validate()) {
        axios
          .post(`${this.$store.state.apiUrl}/register`, {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            education_start_date: this.edu_start_date,
            education_end_date: this.edu_end_date,
            terms: this.terms
          })
          .then(response => {
            console.log(response.data);
            if (response.data.accessToken) {
              alert("Saved successfully");
              Router.push({ name: "Login" });
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
