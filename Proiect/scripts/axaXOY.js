function canvas_arrow(context, fromx, fromy, tox, toy){
        var headlen = 10;   // length of head in pixels
        var angle = Math.atan2(toy-fromy,tox-fromx);
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
        context.moveTo(tox, toy);
        context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    }

function axaXOY(canvas, context) {
    context.beginPath()
    context.lineWidth = 3
    context.strokeStyle = "black"
    canvas_arrow(context, 4, canvas.height - 2, 4, 4)
    canvas_arrow(context, 4, canvas.height - 4, canvas.width - 5, canvas.height - 4)
    context.stroke()
}
