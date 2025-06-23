function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
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
      currentRound++;
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
