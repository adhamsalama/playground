var pipeline = [
    {
      $match: { name: "OneWorld" }
    }, {
      $graphLookup: {
        startWith: "$airlines",
        from: "air_airlines",
        connectFromField: "airlines",
        connectToField: "name",
        as: "airlines",
        maxDepth: 0,
        restrictSearchWithMatch: {
          country: { $in: ["Germany", "Spain", "Canada"] }
        }
      }
    }, {
      $graphLookup: {
        startWith: "$airlines.base",
        from: "air_routes",
        connectFromField: "dst_airport",
      connectToField: "src_airport",
        as: "connections",
        maxDepth: 1
      }
    }, {
      $project: {
        validAirlines: "$airlines.name",
        "connections.dst_airport": 1,
        "connections.airline.name": 1
      }
    },
    { $unwind: "$connections" },
    {
      $project: {
        isValid: { $in: ["$connections.airline.name", "$validAirlines"] },
        "connections.dst_airport": 1
      }
    },
    { $match: { isValid: true } },
    { $group: { _id: "$connections.dst_airport" } },
    { $sort: { _id: 1 } }
  ]

  db.air_alliances.aggregate(pipeline)



var res = [
  {
    _id: ObjectId("6329c035c2c3fcf33aa3ba2a"),
    name: 'OneWorld',
    airlines: [
      {
        _id: ObjectId("56e9b497732b6122f8790355"),
        airline: 214,
        name: 'Air Berlin',
        alias: 'AB',
        iata: 'BER',
        icao: 'AIR BERLIN',
        active: 'Y',
        country: 'Germany',
        base: 'KTE'
      },
      {
        _id: ObjectId("56e9b497732b6122f8790d83"),
        airline: 2822,
        name: 'Iberia Airlines',
        alias: 'IB',
        iata: 'IBE',
        icao: 'IBERIA',
        active: 'Y',
        country: 'Spain',
        base: 'BRN'
      },
      {
        _id: ObjectId("56e9b497732b6122f87908cd"),
        airline: 1615,
        name: 'Canadian Airlines',
        alias: 'CP',
        iata: 'CDN',
        icao: 'CANADIAN',
        active: 'Y',
        country: 'Canada',
        base: 'LVI'
      }
    ]
  }
]
var route = {
  _id: ObjectId("56e9b39b732b6122f877fa31"),
  airline: { id: 410, name: 'Aerocondor', alias: '2B', iata: 'ARD' },
  src_airport: 'CEK',
  dst_airport: 'KZN',
  codeshare: '',
  stops: 0,
  airplane: 'CR2'
}