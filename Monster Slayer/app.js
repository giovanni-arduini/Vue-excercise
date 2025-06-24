function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0 || this.currentRound === 0;
    },
  },
  watch: {
    // il nome dewve essere di una proprietà che
    // voglio guardare
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attack = getRandomValue(5, 12);
      this.monsterHealth -= attack;
      this.attackPlayer();
    },
    attackPlayer() {
      const attack = getRandomValue(7, 15);
      this.playerHealth -= attack;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attack = getRandomValue(11, 25);
      this.monsterHealth -= attack;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 14);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
});

app.mount("#game");
