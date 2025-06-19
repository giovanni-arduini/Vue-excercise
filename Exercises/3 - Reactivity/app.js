const app = Vue.createApp({
  data() {
    return {
      number: 0,
      message: "",
    };
  },
  methods: {
    add(num) {
      this.number = this.number + num;
    },
  },
  computed: {},
  watch: {
    number() {
      if (this.number < 37) {
        this.message = "Not there yet";
      } else if (this.number > 37) {
        this.message = "Too much";
      } else {
        this.message = "";
      }
    },
  },
});

app.mount("#assignment");
