<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />-->
        <q-toolbar-title class="ml-5">
          <span>
            <router-link class="mainTitle" to="/">Chatify</router-link>
          </span>
        </q-toolbar-title>
        <div>Chatify v 1.0.0</div>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/" label="User Login" />
        <q-route-tab to="/chat" label="Chat Page" />
      </q-tabs>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered elevated content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>

        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>-->

    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-pa-md form_comp" style="max-width: 400px">
          <q-card-section>
            <div class="text-h6">Lets JOIN!!</div>
          </q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Your ChatRoom name *"
              hint="For Example - lastJedi, naruto, quentin"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              v-model="chatRoom"
              label="ChatRoom *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import io from "socket.io-client";
import VueSimpleAlert from "vue-simple-alert";
import moment from "moment";
import socket from "../assets/js/socket";

export default {
  name: "userLoginPage",
  data() {
    return {
      users: [],
      socket: socket,
      accept: "",
      name: "",
      chatRoom: "",
      leftDrawerOpen: false
    };
  },
  methods: {
    onSubmit() {
      let self = this;
      let name = this.name;
      let room = this.chatRoom;
      this.socket.emit("join", { name, room }, error => {
        if (error) {
          alert(error);
        } else {
          this.$router.push("/");
        }
      });
    },
    onReset() {
      this.name = "";
      this.chatRoom = "";
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,600&display=swap");

.my-card,
button,
p,
div,
span,
input {
  font-family: "Josefin Sans", sans-serif;
  font-weight: bold;
}
.my-card {
  width: 100%;
  max-width: 500px;
}

.mainTitle {
  text-decoration: none;
  color: white;
}

.form_comp {
  border: 1px solid lightgrey;
}
</style>

