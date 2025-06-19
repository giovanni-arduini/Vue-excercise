const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    outputFullName() {
      if (this.name === "") {
        return "";
      }
      return this.name + " " + "Arduini";
    },
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
    resetInput() {
      this.name = "";
    },
  },
});

app.mount("#events");
