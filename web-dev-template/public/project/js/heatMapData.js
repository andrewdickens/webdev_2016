/**
 *
 * @param dataObject
 * @param database
 * @returns {Array}
 */
function loadHeatMapRankings(dataObject, database) {
    var returnData = [];

    for(var i=0; i<dataObject.numberOfFeatures; i++) {

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/rest/database/chart/get/ranking" + "/" + database + "/" + dataObject.featureCategory + "/" + dataObject.features[i],
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
 * @param dataObject
 */
function loadHeatmapObject(dataObject){

    var AccumuloRankings = loadHeatMapRankings(dataObject, 'accumulo');
    var CassandraRankings = loadHeatMapRankings(dataObject, 'cassandra');
    var HBaseRankings = loadHeatMapRankings(dataObject, 'hbase');
    var MongoRankings = loadHeatMapRankings(dataObject, 'mongo');
    var CouchRankings = loadHeatMapRankings(dataObject, 'couch');
    var CouchbaseRankings = loadHeatMapRankings(dataObject, 'couchbase');
    var OrientRankings = loadHeatMapRankings(dataObject, 'orient');
    var NeoRankings = loadHeatMapRankings(dataObject, 'neo');
    var RedisRankings = loadHeatMapRankings(dataObject, 'redis');
    var RiakRankings = loadHeatMapRankings(dataObject, 'riak');
    var DynamoRankings = loadHeatMapRankings(dataObject, 'dynamo');
    var OracleRankings = loadHeatMapRankings(dataObject, 'oracle');
    var FoundationRankings = loadHeatMapRankings(dataObject, 'foundation');
    var VoltRankings = loadHeatMapRankings(dataObject, 'volt');


    var data = {
        labels: dataObject.features,
        datasets: [
            {
                label: 'Accumulo',
                data: AccumuloRankings
            },
            {
                label: 'Cassandra',
                data: CassandraRankings
            },
            {
                label: 'hBase',
                data: HBaseRankings
            },
            {
                label: 'MongoDB',
                data: MongoRankings
            },
            {
                label: 'CouchDB',
                data: CouchRankings
            },
            {
                label: 'Couchbase',
                data: CouchbaseRankings
            },
            {
                label: 'OrientDB',
                data: OrientRankings
            },
            {
                label: 'Neo4j',
                data: NeoRankings
            },
            {
                label: 'Redis',
                data: RedisRankings
            },
            {
                label: 'Riak',
                data: RiakRankings
            },
            {
                label: 'DynamoDB',
                data: DynamoRankings
            },
            //{
            //    label: 'Oracle NoSQL',
            //    data: OracleRankings
            //},
            {
                label: 'FoundationDB',
                data: FoundationRankings
            },
            {
                label: 'VoltDB',
                data: VoltRankings
            }

        ]
    };

    var options = {
        backgroundColor: '#fff',
        rounded: true,
        colorInterpolation: "gradient",
        colorHighlight: true
    };

    var ctx = document.getElementById('heatmap').getContext('2d');
    var newChart = new Chart(ctx).HeatMap(data, options);
}

/**
 *
 * @returns {boolean}
 */
function validate() {
    var selectChoose = document.getElementById('database');
    var maxOptions = 1;
    var optionCount = 0;
    for (var i = 0; i < selectChoose.length; i++) {
        if (selectChoose[i].selected) {
            optionCount++;
            if (optionCount > maxOptions) {
                alert("please choose no more than 1 values")
                return false;
            }
        }
    }
    return true;
}
