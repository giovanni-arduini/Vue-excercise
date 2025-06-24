function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function calculatePercentage(x, y) {
  return (x / y) * 100;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 300,
      initialPlayerHealth: 300,
      playerMana: 100,
      playerTurbo: 10,
      monsterHealth: 400,
      initialMonsterHealth: 400,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    playerHealthStyles() {
      const actualPlayerHealth = calculatePercentage(
        this.playerHealth,
        this.initialPlayerHealth
      );
      return { width: actualPlayerHealth + "%" };
    },

    playerManaStyles() {
      return { width: this.playerMana + "%" };
    },

    playerTurboStyles() {
      return { width: this.playerTurbo + "%" };
    },

    mayUseTurboAttack() {
      if (this.playerTurbo < 100) {
        return true;
      } else {
        return false;
      }
    },

    monsterBarStyles() {
      const actualMonsterHealth = calculatePercentage(
        this.monsterHealth,
        this.initialMonsterHealth
      );
      return { width: actualMonsterHealth + "%" };
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
    turboAttackMonster() {
      this.currentRound++;
      const attack = getRandomValue(11, 25);
      this.monsterHealth -= attack;
      this.attackPlayer();
    },

    healPlayer() {
      this.currentRound++;
      if (this.playerMana <= 0) return;

      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > this.initialPlayerHealth) {
        this.playerHealth = this.initialPlayerHealth;
      } else {
        this.playerHealth += healValue;
      }
      this.playerMana -= 8;
      this.attackPlayer();
    },
  },
});

app.mount("#game");
