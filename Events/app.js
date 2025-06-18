const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    add() {
      this.counter++;
    },
    remove() {
      this.counter--;
    },
    confirmInput() {
      this.confirmedName = this.name;
    },
    setName(event) {
      this.name = event.target.value;
    },
    submitForm(event) {
      event.preventDefault();
      alert("Submitted!");
    },
  },
});

app.mount("#events");
