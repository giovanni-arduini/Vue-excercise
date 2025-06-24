function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function calculatePercentage(x, y) {
  return (x / y) * 100;
}

const app = Vue.createApp({
  data() {
    return {
      // Player stats
      playerHealth: 300,
      initialPlayerHealth: 300,
      playerMana: 100,
      playerTurbo: 0,

      // Monster stats
      monsterHealth: 400,
      initialMonsterHealth: 400,

      // Common stats
      currentTurn: 0,
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
      if (this.playerTurbo === 100) {
        return false;
      }
      return true;
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
    // Player moves set

    attackMonster() {
      const attack = getRandomValue(5, 12);
      this.addTurbo(4);
      this.monsterHealth -= attack;
      this.currentTurn = "monster";

      this.monsterTurn();
    },

    turboAttackMonster() {
      const attack = getRandomValue(11, 25);
      this.monsterHealth -= attack;
      this.playerTurbo = 0;
      this.currentTurn = "monster";

      this.monsterTurn();
    },

    healPlayer() {
      if (this.playerMana <= 0) return;

      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > this.initialPlayerHealth) {
        this.playerHealth = this.initialPlayerHealth;
      } else {
        this.playerHealth += healValue;
      }
      this.playerMana -= 8;
      this.currentTurn = "monster";

      this.monsterTurn();
    },

    // Monster Moves set

    attackPlayer() {
      const attack = getRandomValue(7, 15);
      this.addTurbo(10);
      this.playerHealth -= attack;
      this.currentTurn = "player";
    },

    healMonster() {
      const healValue = getRandomValue(20, 50);
      if (this.monsterHealth + healValue > this.initialMonsterHealth) {
        this.monsterHealth = this.initialMonsterHealth;
      } else {
        this.monsterHealth += healValue;
      }

      this.currentTurn = "player";
    },

    monsterTurn() {
      const healingChance = getRandomValue(0, 100);
      if (calculatePercentage(this.monsterHealth, this.initialMonsterHealth)) {
        healingChance > 90 ? this.healMonster() : this.attackPlayer();
      } else {
        this.attackPlayer();
      }
    },

    // Common

    addTurbo(value) {
      if (this.playerTurbo + value >= 100) {
        this.playerTurbo = 100;
      } else {
        this.playerTurbo += value;
      }
    },
  },
});

app.mount("#game");
