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
  template: `
       <li>
          <h2>{{ friend.name }}</h2>
          <button @click="toggleDetails">
            {{ detailsAreVisible ? "Hide" : "Show"}} details
          </button>
          <ul v-if="detailsAreVisible">
            <li><strong>Phone:</strong>{{ friend.phone }}</li>
            <li><strong>Email:</strong>{{ friend.email }}</li>
          </ul>
        </li>`,
  data() {
    return {
      friend: {
        id: "manuel",
        name: "Manuel Lorenz",
        phone: "0123 3456",
        email: "ml@localhost.com",
      },
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
