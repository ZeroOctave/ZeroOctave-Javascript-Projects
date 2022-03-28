data = {
    target: "#plotter",
    data: [{fn: "x", color: "black"}],
    grid: true,
    xAxis: {domain: [0,10]},
    yAxis: {domain: [0,10]}
};

function plot(){
    data.data[0].fn = document.getElementById("function").value;
    data.xAxis.domain = [document.getElementById("min_X").value, document.getElementById("max_X").value];
    data.yAxis.domain = [document.getElementById("min_Y").value, document.getElementById("max_Y").value];

    functionPlot(data);
}