$(function() {
    var video1 = $("<video></video>").attr("src", "1.mp4")[0];
    video1.load();
    video1.play();
    var video2 = $("<video></video>").attr("src", "2.mp4")[0];
    video2.load();
    video2.play();

    var model = {
        videoMare: video1,
        videoMic: video2
    };

    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var W = canvas.width,
        H = canvas.height;
    var w2 = (W / 10) * 3,
        h2 = (H / 10) * 3,
        x2 = W - w2 - 10,
        y2 = 10;

    function desenare() {
        ctx.drawImage(model.videoMare, 0, 0);
        ctx.drawImage(model.videoMic, x2, y2, w2, h2);
        var id = ctx.getImageData(x2, y2, w2, h2);
        for (var i = 0; i < id.data.length; i += 4) {
            var m = (id.data[i] + id.data[i + 1] + id.data[i + 2]) / 3;
            id.data[i] = id.data[i + 1] = id.data[i + 2] = m;
        }
        ctx.putImageData(id, x2, y2);
        var text = Math.round(model.videoMare.currentTime).toString() + "/" +
            Math.round(model.videoMare.duration).toString();
        ctx.font = "50pt Arial";
        ctx.fillStyle = "rgba(200,200,200,0.4)";
        ctx.textBaseline="top";
        ctx.fillText(text,10,10);
        ctx.fillText(Math.round(model.videoMic.duration).toString(), x2 + 5, y2);
        requestAnimationFrame(desenare);
    }

    desenare();
    
    $(canvas).on("mouseup", function(e) {
        var mx = e.pageX - canvas.getBoundingClientRect().left;
        var my = e.pageY - canvas.getBoundingClientRect().top;
        if (mx > x2 && mx  < (x2 + w2) && my > y2 && my < (y2 + h2)) {
            var t = model.videoMare;
            model.videoMare = model.videoMic;
            model.videoMic = t;
        } else {
            model.videoMare.currentTime = 0;
            model.videoMare.play();
        }
    })
});
