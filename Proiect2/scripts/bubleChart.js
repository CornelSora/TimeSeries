$(function() {
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext("2d");
    var W = canvas.width;
    var H = canvas.height;
    var year;
    var values = {};
    var miscare = true;
    var interval;
    ctx.beginPath();
    ctx.clearRect(0, 0, W, H);
    
    $("#btnAdd").click(function() {
        year = $("#SelectareAn").val();
        if (year != 1995) {
            year++;
            $("#SelectareAn").val(year);
            $('#btnBubbleChart').trigger('click');
        }
        else {
            year = 1961;
            $("#SelectareAn").val(year);
        }
    });

    $('#btnBubbleChart').click(function() {
        year = $("#SelectareAn").val();
        ctx.beginPath();
        ctx.clearRect(0, 0, W, H);

        function desenare(vector) {
            ctx.beginPath();
            ctx.clearRect(0, 0, W, H);
            var n = vector.length;

            var xValues = new Array(),
                yValues = new Array(),
                rValues = new Array();

            function SortByRadius(a, b) {
                return ((a.c3 / 2 < b.c3 / 2) ? 1 : ((a.c3 / 2 > a.c3 / 2) ? -1 : 0));
            }

            for (var i = 0; i < vector.length; i++) {
                xValues.push(vector[i].c1);
                yValues.push(vector[i].c2);
                rValues.push(vector[i].c3);
            }

            vector.sort(SortByRadius);

            var xMax = Math.max.apply(null, xValues),
                yMax = Math.max.apply(null, yValues),
                rMax = Math.max.apply(null, rValues)
            var x = (W - 60) / xMax * 0.8,
                y = (H - 60) / yMax * 0.8,
                r = H / (rMax * 3);
            for (var i = 0; i < n; i++) {
                var c1 = vector[i].c1 * x,
                    c2 = vector[i].c2 * y,
                    c3 = vector[i].c3 * r;
                console.log("y: " + c2);
                desenareLinieY(H - c2);
                desenareLinieX(c1);
                ctx.beginPath();
                ctx.moveTo(c1 + c3 / 2, H - c2);
                ctx.arc(c1, H - c2, c3 / 2, 0, 2 * Math.PI);
                ctx.strokeStyle = "black";
                if (vector[i].tara === "Romania") {
                    ctx.fillStyle = "blue";
                }
                else if (vector[i].tara === "Afghanistan") {
                    ctx.fillStyle = "red"
                }
                else {
                    ctx.fillStyle = "yellow"
                }
                ctx.fill();
                ctx.stroke();
            }

        }

        var vector = [];

        for (i = 0; i < values.length; i++) {
            if (values[i].year == year) {
                var obj = {}
                obj.tara = values[i].country;
                obj.c1 = values[i].armsImports;
                obj.c2 = values[i].exports.toString().substring(0, 6);
                obj.c3 = values[i].agricultureLand.toString().substring(0, 6);
                vector.push(obj);
                i += 34;
            }
        }

        function desenareLinieX(val) {
            ctx.textAlign = "center";
            ctx.fillStyle = "grey";
            var x = val,
                y = 0;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, H);
            ctx.lineWidth = 1;
            ctx.stroke();
            if (val != 0) {
                ctx.fillText(val.toString().substring(0, 6), x + 10, y - 8);
            }
        }

        function desenareLinieY(val) {
            ctx.textAlign = "center";
            ctx.fillStyle = "grey";
            var x = 20,
                y = val;
            ctx.beginPath();
            ctx.moveTo(x - 1, y);
            ctx.lineTo(x - 18, y);
            ctx.lineWidth = 1;
            ctx.lineTo(W - 5, y);
            ctx.stroke();
            if (val != 0) {
                ctx.fillText(val.toString().substring(0, 6), x + 10, y - 8);
            }
        }

        desenare(vector);
        desenareAxe();
    });

    function desenareAxe() {
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 3;
        var x = 6;
        ctx.moveTo(x, x);
        ctx.lineTo(x, H - x);
        ctx.moveTo(x, H - x);
        ctx.lineTo(W - x + 2, H - x + 2);
        ctx.moveTo(x, x);
        ctx.lineTo(W - x, x);
        ctx.moveTo(W - x, x);
        ctx.lineTo(W - x + 2, H - x + 2);
        ctx.stroke();
        ctx.fillStyle = "grey";
    
    }



    function citireJSONBuble(numeFisier) {
        $.getJSON(numeFisier, function(data) {
            values = data.items;
        });
    }
    citireJSONBuble("date.json");

    function apel() {
        $('#btnAdd').trigger('click');
    }


    $("#btnAnimatie").on("click", function() {
        if (miscare) {
            interval = setInterval(apel, 300);
        }
        if (!miscare) {
            clearInterval(interval);
        }
        miscare = !miscare;
    })
});
