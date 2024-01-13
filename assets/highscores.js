function displayHighScores() {
    console.log('Displaying high scores...');
    const scoresContainer = document.getElementById('high-scores-list');
    const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];
  
    scoresContainer.innerHTML = ''; // Clear previous scores
  
    const recentScores = savedScores.slice(0, 5); // Display only the 5 most recent scores
  
    recentScores.forEach((scoreData, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${scoreData.initials} - ${scoreData.score}`;
      scoresContainer.appendChild(listItem);
    });
  
    console.log('High scores displayed:', recentScores);
  }
  