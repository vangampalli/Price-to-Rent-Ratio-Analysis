async function main(){
    const dataResponse = await fetch("/data");
    const rentData = await dataResponse.json();
    console.log(rentData);

    // Create Empty Arrays to be Populates
    fullData = [];

    xData = [];
    yData = [];
    zData = [];

    // Create a For Loop to Append Arrays
    for (let index = 0; index < rentData.length; index++) {
        let plotData = rentData[index]

        let zPop = (plotData.population) / 1000;

        xData.push(plotData.city);
        yData.push(plotData.ratio);
        zData.push(zPop);

    };

    // Create Dictionary of the Arrays
    let dataDict = {
        "city": xData,
        "ratio": yData,
        "population": zData
    };

    fullData.push(dataDict);

    // Create Variables for Plots
    let xCities = fullData[0].city;
    let yRatios = fullData[0].ratio.sort((a,b) => b-a).reverse();
    let zPops = fullData[0].population;

    console.log(yRatios);

    // Plot Bar Graph
    let trace1 = {
        x: xCities,
        y: yRatios,
        type: "bar",
        name: "Ratio",
        text: yRatios
    };

    // Plot Bar 2 Graph
    let trace2 = {
        x: xCities,
        y: zPops,
        name: "Population",
        text: xCities,
        type: "bar"
    }

    //Ploting Plotly
    let traceData = [trace1, trace2];

    let layout = {
        title: "Population and Home to Rent Ratio",
        barmode: "group",
        yaxis: {
            visible: false,
        },
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
        },
        height: 600,
        width: 2000,
    };

    Plotly.newPlot("line", traceData, layout);
}
main();