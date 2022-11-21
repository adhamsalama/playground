var favorites = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney",
  ];
  
  var pipeline = [
    {
      $match: {
        "tomatoes.viewer.rating": { $gte: 3 },
        countries: "USA",
        cast: {
          $in: [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        tomatoes_rating: "$tomatoes.viewer.rating",
        num_favs: {
          $size: {
            $setIntersection: [
              "$cast",
              [
                "Sandra Bullock",
                "Tom Hanks",
                "Julia Roberts",
                "Kevin Spacey",
                "George Clooney",
              ],
            ],
          },
        },
      },
    },
    {
      $sort: {
        num_favs: -1,
        tomatoes_rating: -1,
        title: -1,
      },
    },
    {
      $skip: 24,
    },
    {
      $limit: 1,
    },
  ];
  db.movies.aggregate(pipeline);
  
  
  
  var pipeline = [
      {
        $match: {
          year: { $gte: 1990 },
          languages: { $in: ["English"] },
          "imdb.votes": { $gte: 1 },
          "imdb.rating": { $gte: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          title: 1,
          "imdb.rating": 1,
          "imdb.votes": 1,
          normalized_rating: {
            $avg: [
              "$imdb.rating",
              {
                $add: [
                  min,
                  {
                    $multiply: [
                      max,
                      {
                        $divide: [
                          { $subtract: ["$imdb.rating", 5] },
                          { $subtract: [1521105, 5] }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      { $sort: { normalized_rating: -1 } },
      { $limit: 1 }
    ]