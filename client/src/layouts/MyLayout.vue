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

      <div class="q-pa-md">
        <q-card class="my-card">
          <q-parallax src="https://cdn.quasar.dev/img/parallax1.jpg" :height="150" />

          <q-card-section>
            <div class="text-h6">Slingshot Inc.</div>
            <div class="text-subtitle2">{{welcome_msg}}</div>
          </q-card-section>
        </q-card>
      </div>

      <div v-if="joinee_msg" class="joinee_disconnect">{{joinee_msg}}</div>
      <div v-if="disconnectionMsg" class="joinee_disconnect">{{disconnectionMsg}}</div>

      <form @submit.prevent="send_msg">
        <div class="form-group">
          <label for="exampleInputEmail1">Please type your IM</label>
          <input
            type="text"
            class="form-control main_ipt_box"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Message"
            v-model="msg_text"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      <div class="messagelist">
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px">
            <q-chat-message :label="todyDate" />

            <q-chat-message
              name="me"
              avatar="https://cdn.quasar.dev/img/avatar4.jpg"
              :text="messageList"
              sent
              stamp="7 minutes ago"
            />
            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :text="['doing fine, how r you?']"
              stamp="4 minutes ago"
            />
          </div>
        </div>
      </div>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "MyLayout",
  data() {
    return {
      disconnectionMsg: null,
      joinee_msg: null,
      messageList: [],
      msg_text: "",
      welcome_msg: null,
      socket: {},
      count: 0,
      leftDrawerOpen: false
    };
  },
  methods: {
    send_msg(e) {
      console.log(e.target);
      this.socket.emit("new_msg", this.msg_text);
      this.msg_text = "";
    },
    increment() {
      // this.count++;
      console.log("clicked");
      this.socket.emit("increment");
    }
  },
  created() {
    this.socket = io("http://localhost:3000");
    this.socket.on("countUpdated", count => {
      console.log(`the count has been updated: ${count}`);
      this.count = count;
    });

    this.socket.on("welcome_msg", msg => {
      this.welcome_msg = msg;
      console.log(this.welcome_msg);
    });

    this.socket.on("broadcast_msg", broadcast_msg => {
      this.messageList.push(broadcast_msg);
    });

    this.socket.on("new_joinee", new_joinee_msg => {
      this.joinee_msg = new_joinee_msg;
      // setTimeout(5000, () => {
      //   this.joinee_msg = null;
      // });
    });

    this.socket.on("disconnect_message", msg => {
      this.disconnectionMsg = msg;
      // setTimeout(5000, () => {
      //   this.disconnectionMsg = null;
      // });
    });
  },
  mounted() {},
  computed: {
    todyDate: function() {
      let date = new Date();
      let final = date.toDateString();
      return final;
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>