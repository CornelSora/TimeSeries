$(function() {
    var apasat = false;
    var anInceput, anFinal;
    values = [];
    $("#btnTabel").on("click", () => {
        anInceput = $("#anInceput").val();
        anFinal = $("#anFinal").val();
        if (apasat) {
            $("table").remove();
        }
        apasat = true;
        creareTabel(values);

    });

    function citireJSONTabel(numeFisier) {
        $.getJSON(numeFisier, function(data) {
            values = data.items;
        });
    }
    citireJSONTabel("date.json");
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
