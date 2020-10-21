/* 
Grammar of a simple Fractal Plant, gathered from Wikipedia: https://en.wikipedia.org/wiki/L-system.
Citation: Wikipedia contributors. "L-system." Wikipedia, The Free Encyclopedia. Wikipedia, The Free Encyclopedia, 26 Mar. 2020. Web. 28 Jul. 2020. 

    variables : X F
    constants : + − [ ]
    start : X
    rules : (X → F+[[X]-X]-F[-FX]+X), (F → FF)
    angle : 25°
*/

let colors = ["#b9dbbb", "#b6d9b8", "#b3d8b5", "#afd6b2", "#acd4af", "#a9d3ac", "#a5d1a9", "#a2cfa5", "#9fcea2", "#9ccc9f", "#98ca9c", "#95c999", "#92c796", "#8ec593", "#8bc490", "#88c28c", "#84c089", "#81bf86", "#7ebd83", "#7bbb80", "#77ba7d", "#74b87a", "#71b676", "#6db573", "#6ab370", "#67b16d", "#63b06a", "#60ae67", "#5dac64", "#5aab61"];
let n = 5;
let index = 0;
let length = 10;
let lengthA = [200, 120, 50, 20, 10, 5, 3];
let angle = 25;
let outputString = "X";
let rules = new Map();
rules.set("X", "F+[[X]-X]-F[-FX]+X");
rules.set("F","FF");


function setup(){

    canvas = createCanvas(800, 1000);
    canvas.parent("plantCanvas");
    angleMode(DEGREES);

    noLoop();
}

function draw(){

    for (i = 0; i < n*n; i++){
        step(outputString.charAt(index));
        index++;
    }

    if (index >= outputString.length - n*n) noLoop();
}

function generate(string){
    let newstring = "";

    for(i = 0; i < string.length; i++){
        if (rules.has(string[i])) {

            newstring += rules.get(string[i]);
        }
        else newstring += string[i];
    }

    return newstring;
}

function step(c){

    if (c == "X") return false;
    else if (c == "-") {
        pop();
        rotate(angle);
        push();
        return false;
    }
    else if (c == "+") {
        pop();
        rotate(-angle);
        push();
        return false;
    }
    else if (c == "[") {
        pop();
        push();
        push();
        return false;
    }
    else if (c == "]") {
        pop();
        return false;
    }
    else {
        
        pop();
        let colorI = colors[round(map(index, 0, outputString.length, 29, 0))];
        stroke(colorI);
        line(0, 0, 0, -length);
        translate(0, -length);
        push();
        return true;
    }
}

function startAnim() {
    if (isLooping()) return false;
    else {
        n = document.getElementById("slider").value;
        length = lengthA[n - 1];
        index = 0;
        outputString = "X";

        for (var i = 0; i < n; i++) {
            outputString = generate(outputString);
        }

        clear();
        resetMatrix();
        translate(width / 2.5, height);
        push();
        loop();
    }
}

function updateText(num) {

    document.getElementById('sliderText').innerHTML="Number of Iterations = " + num + "&nbsp&nbsp&nbsp"; 
}
