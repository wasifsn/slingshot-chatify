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
      <div>{{ count }}</div>

      <q-btn color="red" glossy text-color="black" push label="Location" @click="send_location" />

      <div class="q-pa-md">
        <q-card class="my-card">
          <q-parallax src="https://cdn.quasar.dev/img/parallax1.jpg" :height="150" />

          <q-card-section>
            <div class="text-h6">Slingshot Inc.</div>
            <div class="text-subtitle2">{{ welcome_msg }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div v-if="joinee_msg" class="joinee_disconnect">{{ joinee_msg }}</div>
      <div v-if="disconnectionMsg" class="joinee_disconnect">{{ disconnectionMsg }}</div>

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

            <!-- <q-chat-message
              name="me"
              avatar="https://cdn.quasar.dev/img/avatar4.jpg"
              :text="messageList"
              sent
              stamp="7 minutes ago"
            />-->
            <div v-if="locationMsgArr.length > 0">
              <div v-for="i in locationMsgArr" :key="locationMsgArr[i]">
                <a
                  target="_blank"
                  v-if="i.toString().includes('https://google.com/maps')"
                  :href="i"
                >This is my Location</a>
                <div v-else>{{ i }}</div>
              </div>
            </div>
            <!-- <q-chat-message
              v-if="locationMsgArr.length > 0"
              name="me"
              avatar="https://cdn.quasar.dev/img/avatar4.jpg"
              :text="locationMsgArr"
              sent
              stamp="7 minutes ago"
            />-->
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
import VueSimpleAlert from "vue-simple-alert";

export default {
  name: "MyLayout",
  data() {
    return {
      locationMsgArr: [],
      locationMsg: "",
      LocationUser: {},
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
    send_location() {
      if (!navigator.geolocation) {
        return alert("Your browser does not support Location Support");
      }
      navigator.geolocation.getCurrentPosition(position => {
        let preData = position.coords;
        let { longitude, latitude } = preData;
        let data = { longitude, latitude };
        // this.socket.emit("sendLocation", data);
        this.socket.emit(
          "sendLocation",
          `https://google.com/maps?q=${data.latitude},${data.longitude}`,
          response => {
            if (response) {
              this.locationMsg = response;
              this.locationMsgArr.push(response);
            }
          }
        );
      });
    },
    send_msg(e) {
      var self = this;
      console.log(e.target);
      self.socket.emit("new_msg", this.msg_text, error => {
        if (error) {
          // return;
          self.$alert("The Message was not sent");
        } else {
          console.log("message is delivered successfully");
        }
      });
      self.msg_text = "";
    },
    increment() {
      this.socket.emit("increment");
    }
  },
  created() {
    this.socket = io("http://localhost:3000");
    this.socket.on("countUpdated", count => {
      this.count = count;
    });

    this.socket.on("welcome_msg", msg => {
      this.welcome_msg = msg;
    });

    this.socket.on("broadcast_msg", broadcast_msg => {
      this.locationMsgArr.push(broadcast_msg);
    });

    this.socket.on("new_joinee", new_joinee_msg => {
      this.joinee_msg = new_joinee_msg;
    });

    this.socket.on("disconnectMessage", msg => {
      this.disconnectionMsg = msg;
    });

    this.socket.on("LocationUser", msg => {
      this.LocationUser = msg;
      console.log(this.LocationUser);
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
