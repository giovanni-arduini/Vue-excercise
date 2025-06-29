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
      playerSpeed: 10,
      ether: 3,

      // Monster stats
      monsterHealth: 400,
      initialMonsterHealth: 400,
      monsterSpeed: 5,

      // Common stats
      showLog: false,
      showPlayerNameInput: true,
      playerName: "Player",
      winner: null,
      playerMessageLog: "",
      monsterMessageLog: "",
    };
  },
  mounted() {
    const savedName = localStorage.getItem("name");
    if (savedName) {
      this.playerName = savedName;
    }
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
    name(value) {
      localStorage.name = value;
    },
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

    dodgeAttack(atkSpeed, dfnSpeed) {
      return getRandomValue(1, 50) + atkSpeed - dfnSpeed < 10;
    },

    useEther() {
      this.ether -= 1;
      this.playerMana += 10;
      this.currentTurn = "monster";
      this.playerMessageLog = `You recovered 10 MP!`;
      this.monsterTurn();
    },

    useCheer() {
      this.playerSpeed++;
      this.currentTurn = "monster";
      this.playerMessageLog = `You increased your speed!`;
      this.monsterTurn();
    },

    attackMonster() {
      const attack = getRandomValue(5, 12);
      if (this.dodgeAttack(this.playerSpeed, this.monsterSpeed)) {
        this.currentTurn = "monster";
        this.playerMessageLog = `The monster dodged your attack!`;
        this.monsterTurn();
      } else {
        this.addTurbo(4);
        this.monsterHealth -= attack;
        this.currentTurn = "monster";
        this.playerMessageLog = `You dealt ${attack} damage to the monster!`;
        this.monsterTurn();
      }
    },

    turboAttackMonster() {
      const attack = getRandomValue(11, 25);
      this.monsterHealth -= attack;
      this.playerTurbo = 0;
      this.currentTurn = "monster";
      this.playerMessageLog = `You TURBO ATTACKED the monster and inflicted ${attack} damage!`;
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
      this.playerMessageLog = `You healed and recovered ${healValue} HP!`;

      this.monsterTurn();
    },

    // Monster Moves set

    attackPlayer() {
      const attack = getRandomValue(7, 15);
      if (this.dodgeAttack(this.monsterSpeed, this.playerSpeed)) {
        this.currentTurn = "player";
        this.monsterMessageLog = `Monster missed his attack!`;
      } else {
        this.addTurbo(10);
        this.playerHealth -= attack;
        this.currentTurn = "player";
        this.monsterMessageLog = `Monster attacked you and dealt ${attack} damage!`;
      }
    },

    monsterSuper() {
      const attack = getRandomValue(20, 25);
      this.addTurbo(20);
      this.playerHealth -= attack;
      this.currentTurn = "player";
      this.monsterMessageLog = `It's a super HIT! Monster attacked you and dealt ${attack} damage!`;
    },

    healMonster() {
      const healValue = getRandomValue(20, 40);
      if (this.monsterHealth + healValue > this.initialMonsterHealth) {
        this.monsterHealth = this.initialMonsterHealth;
      } else {
        this.monsterHealth += healValue;
      }
      this.monsterMessageLog = `Monster healed and recovered ${healValue} HP!`;

      this.currentTurn = "player";
    },

    monsterTurn() {
      const healingChance = getRandomValue(0, 100);
      if (this.monsterHealth < 350) {
        healingChance > 30 ? this.healMonster() : this.attackPlayer();
      } else {
        const superChance = getRandomValue(0, 100);
        superChance > 95 ? this.monsterSuper() : this.attackPlayer();
      }

      this.showLog = true;
    },

    // Common

    addTurbo(value) {
      if (this.playerTurbo + value >= 100) {
        this.playerTurbo = 100;
      } else {
        this.playerTurbo += value;
      }
    },

    next() {
      this.showLog = false;
    },

    startFight() {
      localStorage.setItem("name", this.playerName); // Save the name
      this.showPlayerNameInput = false;
    },

    surrender() {
      if (confirm("Are you sure you want to run like a coward?")) {
        this.winner = "monster";
      } else return;
    },

    newRound() {
      window.location.reload();
    },
  },
});

app.mount("#game");
