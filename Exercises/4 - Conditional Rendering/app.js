const app = Vue.createApp({
  data() {
    return { tasks: [], userinput: "", show: true };
  },
  computed: {
    buttonCaption() {
      return this.show ? "Hide list" : "Show list";
    },
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
      this.userinput = "";
    },
    toggleList() {
      this.show = !this.show;
    },
  },
});

app.mount("#assignment");
