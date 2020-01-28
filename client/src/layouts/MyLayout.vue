<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Chatify</q-toolbar-title>

        <div>Chatify v 1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
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
    </q-drawer>

    <q-page-container>
      <q-btn color="amber" glossy text-color="black" push label="Second" @click="increment" />
      <div>{{count}}</div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "MyLayout",
  methods: {
    increment() {
      // this.count++;
      console.log("clicked");
      this.socket.emit("increment");
    }
  },
  data() {
    return {
      socket: {},
      count: 0,
      leftDrawerOpen: false
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
    this.socket.on("countUpdated", count => {
      console.log(`the count has been updated: ${count}`);
      this.count = count;
    });
  }
};
</script>
