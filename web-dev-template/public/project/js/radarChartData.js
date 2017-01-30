
/**
 *
 * @param dataObject
 */
function loadRadarDataObject(dataObject) {

    if (dataObject.numberOfDatabases == 1) {
        return loadRadarDataObjectOne(dataObject);
    } else if (dataObject.numberOfDatabases == 2) {
        return loadRadarDataObjectTwo(dataObject);
    } else if (dataObject.numberOfDatabases == 3) {
        return loadRadarDataObjectThree(dataObject)
    } else if (dataObject.numberOfDatabases > 3) {
        alert('Please choose no more than 3 databases');
    }
}

/**
 *
 * @param dataObject
 */
function loadRadarDataObjectOne(dataObject) {
    var databaseName = dataObject.databases[0];
    var accumuloValues = loadRadarChartData(dataObject, 0);

    var ctx = document.getElementById("radarChart");
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dataObject.features,
            datasets: [
                {
                    label: capitalizeFirstLetter(databaseName),
                    data: accumuloValues,
                    backgroundColor: "rgba(220,65,65,0.1)",
                    borderColor: "rgba(220,65,65,.3)",
                    pointBackgroundColor: "rgba(220,65,65,.7)",
                    pointBorderColor: "rgba(220,65,65,.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,65,65,.7)"
//                                            borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 *
 * @param dataObject
 */
function loadRadarDataObjectTwo(dataObject) {
    var databaseName1 = dataObject.databases[0];
    var databaseName2 = dataObject.databases[1];
    var accumuloValues1 = loadRadarChartData(dataObject, 0);
    var accumuloValues2 = loadRadarChartData(dataObject, 1);

    var ctx = document.getElementById("radarChart");
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dataObject.features,
            datasets: [
                {
                    label: capitalizeFirstLetter(databaseName1),
                    data: accumuloValues1,
                    backgroundColor: "rgba(220,65,65,0.1)",
                    borderColor: "rgba(220,65,65,.3)",
                    pointBackgroundColor: "rgba(220,65,65,.7)",
                    pointBorderColor: "rgba(220,65,65,.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,65,65,.7)"
                },
                {
                    label: capitalizeFirstLetter(databaseName2),
                    data: accumuloValues2,
                    backgroundColor: "rgba(230, 230, 0,0.2)",
                    borderColor: "rgba(230, 230, 0,.3)",
                    pointBackgroundColor: "rgba(230, 230, 0,.7)",
                    pointBorderColor: "rgba(230, 230, 0,.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(230, 230, 0,.7)"
                }
            ]
        },
        options: {
            scales: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 *
 * @param dataObject
 */
function loadRadarDataObjectThree(dataObject) {
    var databaseName1 = dataObject.databases[0];
    var databaseName2 = dataObject.databases[1];
    var databaseName3 = dataObject.databases[2];
    var databaseValues1 = loadRadarChartData(dataObject, 0);
    var databaseValues2 = loadRadarChartData(dataObject, 1);
    var databaseValues3 = loadRadarChartData(dataObject, 2);

    var ctx = document.getElementById("radarChart");
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dataObject.features,
            datasets: [
                {
                    label: capitalizeFirstLetter(databaseName1),
                    data: databaseValues1,
                    backgroundColor: "rgba(220,65,65,0.1)",
                    borderColor: "rgba(220,65,65,.3)",
                    pointBackgroundColor: "rgba(220,65,65,.7)",
                    pointBorderColor: "rgba(220,65,65,.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,65,65,.7)"
                },
                {
                    label: capitalizeFirstLetter(databaseName2),
                    data: databaseValues2,
                    backgroundColor: "rgba(230, 230, 0,0.2)",
                    borderColor: "rgba(230, 230, 0,.3)",
                    pointBackgroundColor: "rgba(230, 230, 0,.7)",
                    pointBorderColor: "rgba(230, 230, 0,.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(230, 230, 0,.7)"
                },
                {
                    label: capitalizeFirstLetter(databaseName3),
                    data: databaseValues3,
                    backgroundColor: "rgba(63, 127, 191,0.3)",
                    borderColor: "rgba(63, 127, 191,.3)",
                    pointBackgroundColor: "rgba(63, 127, 191,.7)",
                    pointBorderColor: "rgba(63, 127, 191,.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(63, 127, 191,.7)"
                }
            ]
        },
        options: {
            scales: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });
}

function loadRadarChartData(dataObject, index) {
    var json;
    var returnData = [];
    var featureCount = dataObject.numberOfFeatures;

    for(var i=0; i<featureCount; i++) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/rest/database/chart/get/ranking" + "/" + dataObject.databases[index] + "/" + dataObject.featureCategory + "/" + dataObject.features[i],
            async: false,
            dataType: "json",
            success: function (data) {
                returnData[i] = data;
            }
        });
    }

    return returnData;
}


/**
 *
 * @param string
 * @returns {string}
 */
function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param select
 * @returns {*}
 */
function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    var count = 0;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            count++;
            if (count > 3) {
                return 'accumulo';
            }
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

/**
 *
 * @param select
 * @returns {Array}
 */
function getSelectFeatures(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    var count = 0;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            count++;
            if (count > 7) {
                alert("Please select no more than 7 features to compare");
                return;
            }
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

/**
 *
 * @param select
 * @returns {number}
 */
function getSelectValuesCount(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    var count = 0;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            count++;

            result.push(opt.value || opt.text);
        }
    }
    return count;
}
