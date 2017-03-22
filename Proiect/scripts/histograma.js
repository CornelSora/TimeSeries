
$(document).ready(function() {
    var canvas = $("#canvas")[0]
    var context = canvas.getContext("2d")

    $("#btnHistograma").click(function() {
        let vector = [20,10,30,40,50,90,100,70,80,60,20,10,30,40,50,90,100,70,80,60,20,10,30,40,50,90,100,70,80,60]
        creareHistograma(vector)
    });

    var creareHistograma = function(vector) {
        let W = canvas.width - 10,
            H = canvas.height - 5,
            n = vector.length,
            year = 1970;
        context.clearRect(0, 0, W, H)

        $.getScript("scripts/axaXOY.js", function(){
            axaXOY(canvas, context)
        });
        
        context.beginPath()
        context.textAlign = "center";
        context.font = "bold 8pt Arial";
        context.lineWidth = 2
        context.stokeStyle = "Blue"
        context.fillStyle = "Red"

        let w = W / n,
            h = (H * 0.9) / Math.max.apply(null, vector);

        for (var i = 0; i < n; i++) {
            let xi = w * (i + 0.3),
                wi = w * 0.8,
                hi = vector[i] * h,
                yi = H - hi - 5;
            context.fillStyle = "Red"
            context.rect(xi, yi, wi, hi)
            context.fill();
            context.stroke();
            context.fillStyle = "Black"
            context.fillText(vector[i].toString(), xi + wi / 2, yi - 20);
            console.log(i)
            console.log(year)
            context.fillText("(" + year + ")", xi + wi / 2, yi - 10);
            year += 1;
        }

    }
    
});
