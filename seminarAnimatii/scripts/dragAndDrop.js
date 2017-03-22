$(function() {
    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d");
    var W = canvas.width,
        H = canvas.height;

    var model = {
        x: 20,
        y: 50,
        W: 50,
        H: 50,
        vx: 7,
        miscare: false,
        mx : 0,
        my : 0,
        dx : 0, 
        dy : 0
    };

    var desenare = function() {
        context.fillStyle = "grey";
        context.fillRect(0, 0, W, H);
        context.fillStyle = "red";
        context.fillRect(model.x, model.y, model.W, model.H);
        requestAnimationFrame(desenare);
    };
    requestAnimationFrame(desenare);

    function actualizare() {
        if (model.miscare) {
            model.x = model.mx - model.dx;
            model.y = model.my - model.dy;
        }
    }

    setInterval(actualizare, 25);

    $(canvas).on("mousemove", function(e) {
        model.mx = e.pageX - canvas.getBoundingClientRect().left;
        model.my = e.pageY - canvas.getBoundingClientRect().top;
    })
    
    $(canvas).on("mousedown", () => {
        if ((model.mx > model.x && model.mx < (model.x + model.W)) 
        && (model.my > model.y && model.my < (model.y + model.H))) {
            model.miscare = true;
        }
        model.dx = model.mx - model.x;
        model.dy = model.my - model.y;
    })    
    
    $(canvas).on("mouseup", () => {
        model.miscare = false;
    })
    
});
