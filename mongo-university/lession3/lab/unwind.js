var pipeline = [
  {
    $match: {
      languages: "English",
    },
  },
  {
    $project: { _id: 0, cast: 1, "imdb.rating": 1 },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numFilms: { $sum: 1 },
      average: { $avg: "$imdb.rating" },
    },
  },
  {
    $addFields: {
      average: { $trunc: ["$average", 1] },
    },
  },
  {
    $sort: { numFilms: -1 },
  },

  {
    $limit: 1,
  },
];

db.movies_sample.aggregate(pipeline);
