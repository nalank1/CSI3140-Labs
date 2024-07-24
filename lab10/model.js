var Scene = (function() {
    var entity = {};
    entity.score = 0;
    entity.health = 100;

    class Player {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = "red";
            this.velocityY = 0;
            this.gravity = 0.8;
            this.jumpStrength = -12;
            this.grounded = false;
        }

        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            this.velocityY += this.gravity;
            this.y += this.velocityY;
            if (this.y + this.size > entity.y * 0.9) {
                this.y = entity.y * 0.9 - this.size;
                this.velocityY = 0;
                this.grounded = true;
            }
        }

        jump() {
            if (this.grounded) {
                this.velocityY = this.jumpStrength;
                this.grounded = false;
            }
        }
    }

    class Coin {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = "gold";
        }

        draw(context) {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();
        }

        update() {}

        checkCollision(player) {
            if(!this.collected &&
                player.x < this.x + this.size &&
                player.x + player.size > this.x &&
                player.y < this.y + this.size &&
                player.y + player.size > this.y) {
                this.collected = true;
                entity.incrementScore();
            }
        }
    }

    class Cloud {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = "white";
            this.speed = 1; // Cloud movement speed
        }

        draw(context) {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.width / 2, Math.PI * 0.5, Math.PI * 1.5);
            context.arc(this.x + this.width / 2, this.y - this.height / 2, this.height / 2, Math.PI * 1, Math.PI * 0);
            context.arc(this.x + this.width, this.y, this.width / 2, Math.PI * 1.5, Math.PI * 0.5);
            context.closePath();
            context.fill();
        }

        update() {
            this.x -= this.speed;
            if (this.x + this.width < 0) {
                this.x = entity.x; // Reset cloud position when it goes off screen
            }
        }
    }

    function fullScreenProperties() {
        var ratio = 1;
        return {
            x: window.innerWidth * ratio,
            y: window.innerHeight * ratio
        };
    }

    function drawGrass() {
        entity.context.fillStyle = "#2ecc71";
        entity.context.fillRect(0, entity.y * 0.9, entity.x, entity.y * 0.1);
    }

    function drawSky() {
        entity.context.fillStyle = "#3498db";
        entity.context.fillRect(0, 0, entity.x, entity.y * 0.9);
    }

    function updateScore() {
        document.getElementById('score').textContent = entity.score;
    }

    function updateHealth() {
        document.getElementById('health').textContent = entity.health;
    }

    function drawTree(x) {
        var y = entity.y * 0.9;
        var context = entity.context;
        context.beginPath();
        context.moveTo(x, y);
        context.fillStyle = "#A17917";
        context.lineTo(x + 4, y - 20);
        context.lineTo(x + 8, y - 20);
        context.lineTo(x + 12, y);
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(x + 6, y - 25, 10, 0, Math.PI * 2);
        context.fillStyle = "green";
        context.fill();
    }

    entity.init = function(drawpad) {
        var dim = fullScreenProperties();
        this.drawpad = drawpad;
        this.context = drawpad.getContext("2d");
        this.x = dim.x;
        this.y = dim.y;
        this.drawpad.width = dim.x;
        this.drawpad.height = dim.y;
        drawGrass();
        drawSky();
        updateScore();
        updateHealth();

        // Create player
        this.player = new Player(50, this.y * 0.9 - 50, 50);

        // Create coins
        this.coins = [];
        var coinPositions = [
            {x: 200, y: this.y * 0.8},
            {x: 400, y: this.y * 0.7},
            {x: 600, y: this.y * 0.8}
        ];
        coinPositions.forEach(pos => {
            this.coins.push(new Coin(pos.x, pos.y, 10));
        });

        // Create clouds
        this.clouds = [];
        var cloudPositions = [
            {x: 100, y: 100},
            {x: 300, y: 150},
            {x: 500, y: 100}
        ];
        cloudPositions.forEach(pos => {
            this.clouds.push(new Cloud(pos.x, pos.y, 80, 50));
        });

        // Draw multiple trees
        var treePositions = [150, 300, 450, 600, 750];
        treePositions.forEach(function(pos) {
            drawTree(pos);
        });

        // Start game loop
        this.gameLoop();
    }

    entity.gameLoop = function() {
        entity.context.clearRect(0, 0, entity.x, entity.y);
        drawSky();
        drawGrass();

        // Draw multiple trees
        var treePositions = [150, 300, 450, 600, 750];
        treePositions.forEach(function(pos) {
            drawTree(pos);
        });

        this.coins.forEach(coin => {
            coin.update();
            coin.draw(this.context);
        });

        // Draw and update clouds
        this.clouds.forEach(cloud => {
            cloud.update();
            cloud.draw(this.context);
        });

        // Update and draw player
        this.player.update();
        this.player.draw(this.context);

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    entity.incrementScore = function() {
        this.score += 10;
        updateScore();
    }

    entity.decrementHealth = function() {
        this.health -= 10;
        if (this.health < 0) this.health = 0;
        updateHealth();

        if (this.health === 0) {
            alert("Game Over!");
            this.score = 0;
            this.health = 100;
            updateScore();
            updateHealth();
        }
    }

    return entity;
}());
