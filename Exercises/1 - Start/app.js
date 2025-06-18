const app = Vue.createApp({
  data() {
    return {
      yourAge: 33,
      yourName: "Gio",
      imageUrl:
        "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
    };
  },
  methods: {
    favoriteNumber() {
      return Math.floor(Math.random() * 10 + 1);
    },
    agePlusFive() {
      return this.yourAge + 5;
    },
  },
});

app.mount("#assignment");
