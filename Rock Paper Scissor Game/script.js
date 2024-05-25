document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const gameContainer = document.querySelector('.game');
    const resultDisplay = document.getElementById('result');
    const statsDisplay = document.getElementById('stats');
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const tieSound = document.getElementById('tie-sound');
  
    // Show signup form
    document.getElementById('show-signup').addEventListener('click', function(e) {
      e.preventDefault();
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    });
  
    // Show login form
    document.getElementById('show-login').addEventListener('click', function(e) {
      e.preventDefault();
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
    });
  
    // Login function
    function loginUser() {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      const userData = JSON.parse(localStorage.getItem(username));
  
      if (userData && userData.password === password) {
        alert('Login successful!');
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        gameContainer.style.display = 'block';
        updateStatsDisplay(username);
      } else {
        alert('Invalid username or password');
      }
    }
  
    // Signup function
    function signupUser() {
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;
  
      if (localStorage.getItem(username)) {
        alert('Username already exists. Please choose a different one.');
      } else {
        const userData = {
          password: password,
          stats: { wins: 0, losses: 0 }
        };
        localStorage.setItem(username, JSON.stringify(userData));
        alert('Sign up successful. You can now login.');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
      }
    }
  
    // Event listeners for forms
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      loginUser();
    });
  
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      signupUser();
    });
  
    // Logout function
    document.getElementById('logout').addEventListener('click', function() {
      gameContainer.style.display = 'none';
      loginForm.style.display = 'block';
    });
  
    // Update stats display
    function updateStatsDisplay(username) {
      const userData = JSON.parse(localStorage.getItem(username));
      if (userData) {
        statsDisplay.innerHTML = `Wins: ${userData.stats.wins} | Losses: ${userData.stats.losses}`;
      }
    }
  
    // Game functionality
    function playGame(choice) {
      const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = getResult(choice, computerChoice);
      displayResult(choice, computerChoice, result);
      updateUserStats(result);
    }
  
    function getResult(playerChoice, computerChoice) {
      const winningCases = {
        rock: ['scissors', 'lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['paper', 'spock'],
        spock: ['rock', 'scissors']
      };
  
      if (playerChoice === computerChoice) {
        return 'tie';
      } else if (winningCases[playerChoice].includes(computerChoice)) {
        return 'win';
      } else {
        return 'lose';
      }
    }
  
    function displayResult(playerChoice, computerChoice, result) {
      resultDisplay.innerHTML = `You chose ${playerChoice}. Computer chose ${computerChoice}. You ${result}!`;
      if (result === 'win') {
        winSound.play();
      } else if (result === 'lose') {
        loseSound.play();
      } else {
        tieSound.play();
      }
    }
  
    function updateUserStats(result) {
      const username = document.getElementById('login-username').value;
      const userData = JSON.parse(localStorage.getItem(username));
      if (result === 'win') {
        userData.stats.wins += 1;
      } else if (result === 'lose') {
        userData.stats.losses += 1;
      }
      localStorage.setItem(username, JSON.stringify(userData));
      updateStatsDisplay(username);
    }
  
    // Event listeners for game choices
    document.querySelectorAll('.choice').forEach(button => {
      button.addEventListener('click', function() {
        playGame(this.id);
      });
    });
  });
  