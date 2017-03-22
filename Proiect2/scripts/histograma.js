$(function() {
    $("#btnHistograma").on("click", function() {
        var canvas = $("#canvas")[0];
        var context = canvas.getContext("2d");
        var W = canvas.width,
            H = canvas.height;
        var tara_selectata = $('#selectTara option').filter(':selected').text();
        var caract_selectata = $('input[name=caracteristica]:checked').val();
        context.beginPath();
        context.fillRect(0, 0, W, H);
        context.fillStyle = "#EEEEEE";
        context.strokeStyle = "black";
        context.font = "bold 13px Arial";
        context.rect(0, 0, W, H);
        context.fill();
        context.stroke();

        function desenareAxe(vector) {
            context.beginPath();
            context.strokeStyle = "grey";
            context.lineWidth = 3;
            var x = 6;
            context.moveTo(x, x);
            context.lineTo(x, H - x);
            context.moveTo(x, H - x);
            context.lineTo(W - x + 2, H - x + 2);
            context.moveTo(x, x);
            context.lineTo(W - x, x);
            context.moveTo(W - x, x);
            context.lineTo(W - x + 2, H - x + 2);
            context.stroke();
            context.fillStyle = "grey";
            context.fillText("Ani", x + 20, H - 20);
        }

        function desenareLimita(val, h) {
            context.textAlign = "center";
            context.fillStyle = "grey";
            var x = 20,
                y = H - 45 - h * val;
            context.beginPath();
            context.moveTo(x - 1, y);
            context.lineTo(x - 18, y);
            context.lineWidth = 1;
            context.lineTo(W - 5, y);
            context.stroke();
            if (val != 0) {
                context.fillText(val.toString().substring(0, 6), x + 10, y - 8);
            }
        }

        function desenareHistograma(vector) {
            var n = vector.length;
            var w = W / n - 3,
                h = (H - 20) / Math.max.apply(null, vector) * 0.85;

            var an = 1961;
            desenareLimita(0, h);
            var maxVal = Math.max.apply(null, vector);
            var minVal = Math.min.apply(null, vector);
            desenareLimita(maxVal, h);
            if (maxVal - minVal > 3) {
                desenareLimita(minVal, h);
            }
            else {
                var y = H - 45 - h * minVal;
                context.moveTo(19, y);
                context.lineTo(2, y);
                context.lineWidth = 1;
                context.lineTo(W - 5, y);
                context.stroke();
                context.fillText(minVal, 30, y + 12);

            }
            if (maxVal - minVal > 5) {
                var mean = (maxVal + minVal) / 2;
                desenareLimita(mean, h);
                desenareLimita((mean + maxVal) / 2, h);
                desenareLimita((mean + minVal) / 2, h);
            }
            context.textAlign = "center";
            for (var i = 0; i < n; i++) {
                var wi = w * 0.8,
                    hi = h * vector[i];
                var xi = w * i + 100,
                    yi = H - 45 - hi;
                context.beginPath();
                context.strokeStyle = "#000000";
                context.fillStyle = "grey";
                if (an % 5 == 0 || an == 1961) {
                    context.fillText(an, xi + wi / 2, H - 20);
                    context.moveTo(xi + wi / 2, H - 15);
                    context.lineTo(xi + wi / 2, H - 2);
                    context.stroke();
                }
                context.fillStyle = "#FF0000";
                context.rect(xi, yi, wi, hi);
                context.fill();
                context.stroke();
                an++;
            }

        }

        var vector = new Array();
        var tari;

        function citireJSONHistograma(numeFisier) {
            $.getJSON(numeFisier, function(data) {
                tari = data.items;
                $.each(tari, function(key, val) {
                    if (val.country === tara_selectata) {
                        if (caract_selectata === "exports") {
                            vector.push(val.exports.substring(0, 5));
                        }
                        if (caract_selectata === "agricultureLand") {
                            vector.push(val.agricultureLand.toString().substring(0, 6));
                        }
                        if (caract_selectata === "armsImports") {
                            vector.push(val.armsImports / 100000);
                        }
                    }
                });
                desenareAxe(vector);
                desenareHistograma(vector);
            });
        }

        citireJSONHistograma("date.json");
    });

});
