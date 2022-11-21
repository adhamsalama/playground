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