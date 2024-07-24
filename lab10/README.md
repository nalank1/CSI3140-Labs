# Jump Game

## Overview
The Jump Game is a web-based platformer featuring dynamic entity behavior and rendering, including clouds and a player character, within a lively game environment.


## Game Entity Module

This module defines the behavior and rendering of entities within a game environment, including clouds and the player character. It is part of a larger game application, designed to run in a web browser environment.

## Features

- **Dynamic Rendering**: Entities such as clouds and the player are continuously drawn and updated on the canvas to create a lively game scene.
- **Game Loop**: Utilizes the `requestAnimationFrame` method to create a smooth and continuous game loop, ensuring consistent updates and rendering.
- **Score Management**: Provides functionality to increment the player's score, updating the game's UI to reflect changes.
- **Health Management**: Manages the player's health, including decrementing health upon taking damage and resetting the game state upon health depletion.

## Methods

### `draw(context)`
Draws the entity on the canvas using the provided context.

### `update()`
Updates the entity's state, including position and other properties based on game logic.

### `incrementScore()`
Increases the player's score by 10 points and updates the score display.

### `decrementHealth()`
Decreases the player's health by 10 points. If health falls below zero, it triggers a game over state, resetting the player's score and health, and updates the health display.

## Game Loop
The game loop is initiated through `requestAnimationFrame`, calling the `gameLoop` method to continuously update and render all entities in the game.

## Game Over
When the player's health reaches zero, the game displays a "Game Over!" alert, resets the score and health to their initial states, and updates the respective displays.

## Usage
To integrate this module into your game, include `model.js` in your project and ensure it is loaded into your game's HTML file. Instantiate entities as needed and call the game loop to start the game.


[!image](docs/assets/secondpage.PNG)
[!image](docs/assets/thirdpage.PNG)