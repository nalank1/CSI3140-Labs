window.addEventListener("load", function() { 
    var drawpad = document.getElementById('drawpad');
    Scene.init(drawpad); 
    
    window.addEventListener('keydown', function(event) {
        switch(event.code) {
            case 'ArrowLeft':
                Scene.player.x -= 10;
                break;
            case 'ArrowRight':
                Scene.player.x += 10;
                break;
            case 'Space':
                Scene.player.jump();
                break;
        }
    });

    // Example game logic to demonstrate score and health updates
    setInterval(function() {
        Scene.incrementScore();
    }, 1000);

    setInterval(function() {
        Scene.decrementHealth();
    }, 2000);
}, false);
