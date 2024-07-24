# Components

## Frontend

1. Game Canvas: The main area where the game's graphics are rendered. Styled to be the central focus, taking up the majority of the viewport with no margins and hidden overflow to ensure full-screen gameplay without scrollbars.

``` css
body {
    margin: 0;
    overflow: hidden;
}
canvas {
    display: block;
    align-content: center;
}
```

2. Scoreboard: A UI element positioned absolutely within the viewport to display the player's score. Styled to be clearly visible against the game's graphics with a contrasting color and accessible font.

``` css
#scoreboard {
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 20px;
}
```

## Data Flow
1. Initialization: The game loads, initializing the canvas and scoreboard in the user's browser.

2. Gameplay: The player interacts with the game through the canvas. Game logic is processed, rendering updates to the canvas and scoreboard in real-time.

3. Scoring and Progression: As the player progresses, scores are updated on the scoreboard. If connected to a backend, scores and progress data are sent to the server for storage and leaderboard updates.

