const app = Vue.createApp({
  data() {
    return {
      input: "",
      goals: [],
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.input);
    },
  },
});

app.mount("#user-goals");
