const app = Vue.createApp({
  data() {
    return {
      friends: [
        {
          id: "manuel",
          name: "Manuel Lorenz",
          phone: "0123 3456",
          email: "ml@localhost.com",
        },
        {
          id: "julie",
          name: "Julie Jones",
          phone: "0123 3456",
          email: "jj@localhost.com",
        },
      ],
    };
  },
});

app.component("friend-contact", {
  data() {
    return {
      detailsAreVisible: false,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
});

app.mount("#app");
