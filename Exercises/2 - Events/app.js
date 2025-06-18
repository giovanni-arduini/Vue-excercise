const app = Vue.createApp({
  data() {
    return {
      name: "",
    };
  },
  methods: {
    showAlert() {
      alert("Button pressed!");
    },
  },
});

app.mount("#assignment");
