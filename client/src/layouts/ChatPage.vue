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
        <!-- <q-tabs align="left">
          <q-route-tab to="/" label="Chatify" />
        </q-tabs>-->

        <!-- <q-route-tab to="/" label="Chatify" /> -->

        <q-toolbar-title>
          <span>
            <router-link class="mainTitle" to="/">Chatify</router-link>
          </span>
        </q-toolbar-title>
        <q-toolbar-title />
        <div>Slingshot Inc.</div>
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab
          :to="{ path: '/', params: { userId: 123 } }"
          label="User Login"
        />
        <q-route-tab to="/chat" label="Chat Page" />
      </q-tabs>
    </q-header>

    <q-drawer
      dark
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      elevated
      content-class="bg-grey-2"
    >
      <q-list bordered padding>
        <q-item-label header>Chat Room Data</q-item-label>

        <!-- <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>-->

        <q-item clickable tag="div" v-for="(room, i) in rooms" :key="i">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>

          <q-item-section>
            <q-item-label class>Users in Chat Room: {{ room }}</q-item-label>
            <q-item-label caption v-for="(data, j) in roomData" :key="j">{{
              data.name
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="flex flex-center">
        <div class="container">
          <q-btn
            color="amber"
            glossy
            text-color="black"
            push
            label="Second"
            @click="increment"
          />
          <div>{{ count }}</div>

          <div class="q-pa-md">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Slingshot Inc.</div>
                <div class="text-subtitle2">{{ welcome_msg }}</div>
              </q-card-section>
            </q-card>
          </div>

          <div v-if="joinee_msg" class="joinee_disconnect">
            {{ joinee_msg }}
          </div>
          <div v-if="disconnectionMsg" class="joinee_disconnect">
            {{ disconnectionMsg }}
          </div>
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
                  <div
                    v-for="i in locationMsgArr"
                    :key="locationMsgArr[i.text]"
                  >
                    <span
                      v-if="
                        i.text.toString().includes('https://google.com/maps')
                      "
                    >
                      <a target="_blank" :href="i.text">This is my Location</a>
                      - {{ messageReceivedTime(i) }}
                    </span>
                    <div v-else>
                      {{ i.text }} - {{ messageReceivedTime(i) }}
                    </div>
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
          <form @submit.prevent="send_msg">
            <div class="form-group">
              <label for="exampleInputEmail1"
                >Please type in your Instant Message</label
              >
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
          <q-btn
            color="amber"
            glossy
            text-color="black"
            push
            label="Location"
            @click="send_location"
          />
        </div>

        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import io from "socket.io-client";
import moment from "moment";
import socket from "../assets/js/socket";

export default {
  name: "MyLayout",
  data() {
    return {
      rooms: [],
      roomData: [],
      moment: moment,
      locationMsgArr: [],
      locationMsg: "",
      LocationUser: {},
      disconnectionMsg: null,
      joinee_msg: null,
      messageList: [],
      msg_text: "",
      welcome_msg: null,
      socket: socket,
      count: 0,
      leftDrawerOpen: false
    };
  },
  computed: {},
  methods: {
    notificationMessages(text, type) {
      this.$notify({
        position: "bottom",
        group: "userNotification",
        type: type,
        title: "User Notification",
        text: text,
        duration: 5000
      });
    },
    messageReceivedTime(i) {
      return moment(i.createdAt)
        .startOf()
        .fromNow();
      // return "asdasa";
    },
    send_location() {
      if (!navigator.geolocation) {
        return this.$alert("Your browser does not support Location Support");
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
            } else {
              this.$alert("Something went wrong the Location is not Sent!");
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
          this.$alert("The Message was not sent");
        } else {
          console.log("message is delivered successfully");
        }
      });
      self.msg_text = "";
    },
    increment() {
      this.socket.emit("increment");
      console.log(this.count);
    }
  },
  mounted() {},
  created() {
    this.socket.on("countUpdated", count => {
      this.count = count;
    });

    this.socket.on("welcome_msg", data => {
      console.log(data);
      this.welcome_msg = data.text;
      let dum = data.createdAt;
    });

    this.socket.on("broadcast_msg", broadcast_msg => {
      this.locationMsgArr.push(broadcast_msg);
    });

    this.socket.on("new_joinee", new_joinee_msg => {
      this.joinee_msg = new_joinee_msg.text;
      this.notificationMessages(new_joinee_msg.text, "");
    });

    this.socket.on("disconnectMessage", msg => {
      this.disconnectionMsg = msg.text;
      this.notificationMessages(msg.text, "warn");
    });

    this.socket.on("LocationUser", msg => {
      this.LocationUser = msg;
      console.log(this.LocationUser);
    });

    this.socket.on("roomData", ({ room, roomData }) => {
      this.rooms.push(room);
      this.roomData = roomData;

      console.log(this.rooms, this.roomData);
    });
  },
  mounted() {
    // this.notificationMessages();
  },
  computed: {
    todyDate: function() {
      let date = new Date();
      let final = date.toDateString();
      return final;
    }
  }
};
</script>

<style>
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
</style>
