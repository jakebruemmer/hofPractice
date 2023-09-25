// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {
  var results = 0;
  _.each(numbers, function(item, index) {
    results += (item % 5 === 0) * 1;
  });
  return results;
};

// use _.each to build an array containing only tweets belonging to a specified user.
var getUserTweets = function(tweets, user) {
  var userTweets = [];
  _.each(tweets, function(tweet, index) {
    if (tweet.user === user) {
      userTweets.push(tweet);
    }
  });
  return userTweets;
};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  var targetFruits = _.filter(fruits, function(fruit) {
    if (fruit === targetFruit) {
      return fruit;
    }
  });
  return targetFruits;
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {
  var targetFruits = _.filter(fruits, function(fruit) {
    if (fruit.slice(0, 1) === letter) {
      return fruit;
    }
  });
  return targetFruits;
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {
  var cookies = _.filter(desserts, function (dessert) {
    if (dessert.type === 'cookie') {
      return dessert;
    }
  });
  return cookies;
};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {
  var userTweets = _.filter(tweets, function (tweet) {
    if (tweet.user === user) {
      return tweet;
    }
  });
  return userTweets;
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {
  var newFruits = _.map(fruits, function (fruit) {
    return fruit.toUpperCase();
  });
  return newFruits;
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  var gfDesserts = _.map(desserts, function (dessert) {
    dessert.glutenFree = !dessert.ingredients.includes('flour');
    return dessert;
  });
  return gfDesserts;
};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  var messages = _.map(tweets, function (tweet) {
    return tweet.message;
  });
  return messages;

};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {
  var groceriesWithCoupon = _.map(groceries, function (grocery) {
    price = Number.parseFloat(grocery.price.replace('$', ''));
    grocery.salePrice = '$' + Math.round((price * (1 - coupon) + Number.EPSILON) * 100) / 100;
    return grocery;
  });
  return groceriesWithCoupon;
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {
  return _.reduce(products, function (total, product) {
    return total + Number.parseFloat(product.price.replace('$', ''));
  }, 0);
};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {
  var returnObject = {};
  _.each(desserts, function(dessert, index) {
    var curDessertType = dessert.type;
    returnObject[curDessertType] = _.reduce(desserts, function(total, dessert2) {
      return (dessert2.type === curDessertType) ? total + 1 : total;
    }, 0);
  });
  return returnObject;
};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  var returnObject = {};
  _.each(tweets, function(tweet, index) {
    var curTweetUser = tweet.user;
    returnObject[curTweetUser] = _.reduce(tweets, function(total, tweet2) {
      return (tweet2.user === curTweetUser) ? total + 1 : total;
    }, 0);
  });
  return returnObject;
};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  return _.reduce(movies, function (movieResults, movie) {
    if (1990 <= movie.releaseYear && movie.releaseYear <= 2000) {
      movieResults.push(movie.title);
      return movieResults;
    } else {
      return movieResults;
    }
  }, []);
};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  return _.reduce(movies, function (isShorter, movie) {
    return isShorter || movie.runtime < timeLimit;
  }, false);
};
