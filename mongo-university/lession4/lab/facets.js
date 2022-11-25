var pipeline = [
    {
    $match: {
      'tomatoes.critic.rating': { $gte: 0 },
      'imdb.rating': { $gte: 0 }
    }
    }, {
    $project: {
      _id: 0,
      tomatoes: 1,
      imdb: 1,
      title: 1
    }
    }, {
    $facet: {
        top_tomatoes_critic: [
            {
              $sort: { "tomatoes.critic.rating": -1, title: 1 }
            }, {
              $limit: 50
            },
            {$project: {title: 1}}
          ],
      top_imdb: [
        {
          $sort: { 'imdb.rating': -1, title: 1 }
        }, {
          $limit: 50
        }, {
          $project: { title: 1 }
        }
      ]
    }
    }, {
      $project: {
        movies_in_both: {
          $setIntersection: [ '$top_tomatoes_critic', '$top_imdb' ]
        }
      }
    }
  ]