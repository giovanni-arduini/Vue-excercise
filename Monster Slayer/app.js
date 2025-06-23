function getRandomValue(min, max) {
  return Math.floor(random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 120,
    };
  },
  methods: {
    attackMonster() {
      const attack = getRandomValue(5, 12);
      this.monsterHealth -= attack;
      this.attackPlayer();
    },
    attackPlayer() {
      const attack = getRandomValue(7, 15);
      this.playerHealth -= attack;
    },
  },
});

app.mount("game");
