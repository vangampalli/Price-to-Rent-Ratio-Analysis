async function main(){
    const dataResponse = await fetch("/data");
    const rentData = await dataResponse.json();
    console.log(rentData);

<<<<<<< HEAD
    // Create Empty Arrays to be Populates
=======
>>>>>>> 48b500627e7ff7217f9d2d34c8fa9f95071bae0e
    fullData = [];

    xData = [];
    yData = [];
    zData = [];

<<<<<<< HEAD
    // Create a For Loop to Append Arrays
    for (let index = 0; index < rentData.length; index++) {
        let plotData = rentData[index]

        let zPop = (plotData.population) / 1000;

        xData.push(plotData.city);
        yData.push(plotData.ratio);
        zData.push(zPop);

    };

    // Create Dictionary of the Arrays
=======
    for (let index = 0; index < rentData.length; index++) {
        let plotData = rentData[index]

        let yRatio = (plotData.ratio) * 5000;

        xData.push(plotData.city);
        yData.push(yRatio);
        zData.push(plotData.population);

    };

>>>>>>> 48b500627e7ff7217f9d2d34c8fa9f95071bae0e
    let dataDict = {
        "city": xData,
        "ratio": yData,
        "population": zData
    };

    fullData.push(dataDict);

<<<<<<< HEAD
    // Create Variables for Plots
    let xCities = fullData[0].city;
    let yRatios = fullData[0].ratio;
    let zPops = fullData[0].population.sort((a,b) => b-a);

    console.log(zPops);

    // Plot Bar Graph
    let trace1 = {
        x: xCities,
        y: yRatios,
        type: "bar",
        name: "Ratio",
        text: yRatios
    };

    // Scatter Plot Graph
    let trace2 = {
        x: xCities,
        y: zPops,
        name: "Population",
        text: xCities,
        type: "bar",
    }

    //Ploting Plotly
    let traceData = [trace1, trace2];

    let layout = {
        title: "Population of Home to Rent Ratio",
        yaxis: {title: "Price to Rent Ratio"},
        barmode: "group",
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
        },
        height: 600,
        width: 2000,
    };

    Plotly.newPlot("line", traceData, layout);
=======
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
>>>>>>> 48b500627e7ff7217f9d2d34c8fa9f95071bae0e
}
main();