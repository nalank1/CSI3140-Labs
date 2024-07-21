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
