const app = Vue.createApp({
  data() {
    return { tasks: [], userinput: "", show: true };
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
      this.userinput = "";
    },
    hideList() {
      this.show = !this.show;
    },
  },
});

app.mount("#assignment");
