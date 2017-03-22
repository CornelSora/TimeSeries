$(document).ready(function() {
    var vector2 = [{
        x: 20,
        y: 20,
        val: 300
    }, {
        x: 30,
        y: 50,
        val: 200
    }, {
        x: 20,
        y: 30,
        val: 100
    }, {
        x: 20,
        y: 30,
        val: 400
    }, {
        x: 260,
        y: 360,
        val: 300
    }, {
        x: 100,
        y: 100,
        val: 400
    }, {
        x: 50,
        y: 50,
        val: 400
    }, {
        x: 60,
        y: 78,
        val: 400
    }, {
        x: 98,
        y: 150,
        val: 400
    }, {
        x: 110,
        y: 80,
        val: 400
    }, {
        x: 130,
        y: 90,
        val: 400
    }, {
        x: 140,
        y: 120,
        val: 400
    }, {
        x: 40,
        y: 60,
        val: 4000
    }, {
        x: 56,
        y: 65,
        val: 400
    }, {
        x: 10,
        y: 20,
        val: 400
    }]
    var vector;
    var canvas = $("#canvas")[0]
    var context = canvas.getContext("2d")

    var vector1 = [{
        x: 200,
        y: 200,
        val: 3000
    }, {
        x: 300,
        y: 500,
        val: 2000
    }, {
        x: 200,
        y: 300,
        val: 1000
    }, {
        x: 20,
        y: 30,
        val: 400
    }, {
        x: 26,
        y: 36,
        val: 300
    }, {
        x: 100,
        y: 100,
        val: 400
    }, {
        x: 50,
        y: 50,
        val: 400
    }, {
        x: 60,
        y: 78,
        val: 400
    }, {
        x: 98,
        y: 150,
        val: 400
    }, {
        x: 110,
        y: 80,
        val: 400
    }, {
        x: 130,
        y: 90,
        val: 400
    }, {
        x: 140,
        y: 120,
        val: 400
    }, {
        x: 40,
        y: 60,
        val: 400
    }, {
        x: 56,
        y: 65,
        val: 400
    }, {
        x: 10,
        y: 20,
        val: 20
    }]

    vector = vector1;

    $("#btnBubbleChart").click(function() {

            creareBubbleChart();
    

    })

    function creareBubbleChart() {
        let W = canvas.width - 10,
            H = canvas.height - 5,
            n = vector.length
        context.clearRect(0, 0, W + 20, H + 20)

        context.beginPath();

        var raze = new Array(n),
            xArray = new Array(n),
            yArray = new Array(n);

        for (var i = 0; i < n; i++) {
            raze[i] = vector[i].val / 2;
        }

        for (var i = 0; i < n; i++) {
            xArray[i] = vector[i].x;
        }

        for (var i = 0; i < n; i++) {
            yArray[i] = vector[i].y;
        }

        function SortByRadius(a, b) {
            return ((a.val > b.val) ? -1 : ((a.val < a.val) ? 1 : 0));
        }

        function sortNumber(a, b) {
            return b - a;
        }
        vector.sort(SortByRadius);
        raze.sort(sortNumber);

        for (var i = 0; i < vector.length; i++) {
            console.log(vector[i].val)
        }
        let Rmax = Math.max.apply(null, raze);
        let y = H / Math.max.apply(null, yArray) * 0.8,
            x = W / Math.max.apply(null, xArray) * 0.8,
            r = (H * 0.2) / Rmax;

        for (var i = 0; i < vector.length; i++) {
            var ri = vector[i].val / 3 * r,
                xi = vector[i].x * x + Rmax / ri,
                yi = H - vector[i].y * y - Rmax / ri;
            context.beginPath();
            context.moveTo(xi + ri, yi);
            context.arc(xi, yi, ri, 0, 2 * Math.PI);
            colorare(i);
        }

        if (vector == vector1) {
            vector = vector2;
        }
        else {
            vector = vector1;
        }
    }

    function colorare(i) {
        if (i % 4 == 0) {
            context.fillStyle = "#0000FF";
        }
        else if (i % 4 == 1) {
            context.fillStyle = "#00FF00";
        }
        else if (i % 4 == 2) {
            context.fillStyle = "#FF0000";
        }
        else {
            context.fillStyle = "#7700FF";
        }
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.fill();
        context.stroke();
    }

})
