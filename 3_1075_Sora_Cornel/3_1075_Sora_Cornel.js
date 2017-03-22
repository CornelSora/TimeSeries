//histograma
$(function() {
    var values = [];

    function citireJSON(numeFisier) {
        $.getJSON(numeFisier, function(data) {
            values = data.items;
        });
    }
    citireJSON("media/date.txt");

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
            tari = values;
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
        }

        citireJSONHistograma("media/date.txt");
    });

    //bubleChart
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext("2d");
    var W = canvas.width;
    var H = canvas.height;
    var year;
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

    function apelAnimatie() {
        $('#btnAdd').trigger('click');
    }


    $("#btnAnimatie").on("click", function() {
        if (miscare) {
            interval = setInterval(apelAnimatie, 700);
        }
        if (!miscare) {
            clearInterval(interval);
        }
        miscare = !miscare;
    })


    //tabel
    var apasat = false;
    var anInceput, anFinal;
    $("#btnTabel").on("click", () => {
        anInceput = $("#anInceput").val();
        anFinal = $("#anFinal").val();
        if (apasat) {
            $("table").remove();
        }
        apasat = true;
        creareTabel(values);

    });

    var creareTabel = (values) => {
        var tabel = $("<table></table>");
        var thead = $("<thead></thead>");

        thead
            .append($("<th></th>").append("Denumire tara"))
            .append($("<th></th>").append("Perioada"))
            .append($("<th></th>").append("Exporturi"))
            .append($("<th></th>").append("Importuri de arme"))
            .append($("<th></th>").append("Suprafata")).appendTo(tabel)


        var tbody = $("<tbody></tbody>");

        for (var i = 0; i < values.length; i++) {
            console.log("an inceput:" + anInceput + " an final: " + anFinal);
            if (values[i].year >= anInceput && values[i].year <= anFinal) {
                var row = $("<tr></tr>");
                row
                    .append($("<td></td>").append(values[i].country))
                    .append($("<td></td>").append(values[i].year))
                    .append($("<td></td>").append(values[i].exports))
                    .append($("<td></td>").append(values[i].armsImports))
                    .append($("<td></td>").append(values[i].agricultureLand))
                row.appendTo(tbody);
            }
        }
        tabel.append(tbody);
        tabel.addClass("table table-bordered")
        tabel.appendTo("#tabelDate");
    }
});
