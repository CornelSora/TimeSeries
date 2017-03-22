/*global $*/
$(function() {
    var model = {
        lista: ["songs/a.mp3", "songs/b.mp3", "songs/c.mp3"],
        poz: 0,
        audio: $("#audioId")[0],
        move: function(delta) {
            this.poz += delta;
            if (this.poz >= this.lista.length) {
                this.poz = 0;
            }
            else if (this.poz < 0) {
                this.poz = this.lista.length - 1;
            }
            this.audio.src = this.lista[this.poz];
            this.audio.load();
            this.audio.play();
        }
    };

    var mousePos = {
        mx: 0,
        my: 0
    }

    var canvas = $("#canvasId")[0];
    var ctx = canvas.getContext("2d");
    var W = ctx.width,
        H = ctx.height;
    model.move(-1);

    var progressbar = {
        x: 10,
        y: 10,
        W: 10,
        H: 10
    };

    function desenare() {
        function btnLeft() {
            ctx.fillStyle = "blue";
            ctx.fillRect(20, 20, 10, 10);
        }

        function btnRight() {
            ctx.beginPath();
            ctx.fillSytle = "green";
            ctx.fillRect(50, 20, 10, 10);
        }

        btnLeft();
        btnRight();
    }

    function progressBar() {
        ctx.fillStyle = "red";
        ctx.fillRect(progressbar.x, progressbar.y, progressbar.W, progressBar.H);
        requestAnimationFrame(progressBar);
    }
    requestAnimationFrame(progressBar);
    
    setInterval(progressBar, 1000);

    function actualizare() {
        progressbar.W += 2;
        console.log(progressbar.W);
        if (progressbar.W == ctx.W) {
            progressbar.W = 0;
            model.move(1);
        }
    }

    $(canvas).on("mousemove", function(e) {
        mousePos.mx = e.pageX - canvas.getBoundingClientRect().left;
        mousePos.my = e.pageY - canvas.getBoundingClientRect().top;
    });

    $(canvas).on("mousedown", function() {
        if (mousePos.mx >= 20 && mousePos.mx <= 30 &&
            mousePos.my >= 20 && mousePos.my <= 30) {
            model.move(-1);
        }
    });

    $(canvas).on("mousedown", function() {
        if (mousePos.mx >= 50 && mousePos.mx <= 60 &&
            mousePos.my >= 20 && mousePos.my <= 30) {
            model.move(1);
        }
    });

});
