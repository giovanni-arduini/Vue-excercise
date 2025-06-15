const app = Vue.createApp({
  data() {
    return {
      message: "Learn Vue.js!",
      courseGoalA: "Finish the course and learn Vue!",
      courseGoalB: "Finish the course and master Vue!",
      vueLink: "https://vuejs.org/",
    };
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return this.courseGoalA;
      } else {
        return this.courseGoalB;
      }
    },
  },
});

app.mount("#user-goal");
