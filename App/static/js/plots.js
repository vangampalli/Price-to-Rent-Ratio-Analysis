async function main(){
    const dataResponse = await fetch("/data");
    const rentData = await dataResponse.json();
    console.log(rentData);

    fullData = [];

    xData = [];
    yData = [];
    zData = [];

    for (let index = 0; index < rentData.length; index++) {
        let plotData = rentData[index]

        let yRatio = (plotData.ratio) * 5000;

        xData.push(plotData.city);
        yData.push(yRatio);
        zData.push(plotData.population);

    };

    let dataDict = {
        "city": xData,
        "ratio": yData,
        "population": zData
    };

    fullData.push(dataDict);

    console.log(fullData);

    

    // Plot Bar Graph
    let trace1 = {
        x: xData,
        y: yData,
        type: "bar",
        text: xData
    };

    let trace2 = {
        x: xData,
        y: zData,
        mode: 'lines',
        text: xData
    }

    let traceData = [trace1, trace2];

    Plotly.newPlot("line", traceData);
}
main();