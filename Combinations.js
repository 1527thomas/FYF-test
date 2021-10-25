module.exports = {
  findCombinations: () => {
    //immutable variables, pennies, nickels, dimes, quarters
    const PENNIES = 1;
    const NICKELS = 5;
    const DIMES = 10;
    const QUARTERS = 25;

    const coins = [1, 5, 10, 25];
    const target = 100;

    //   global result
    const res = [];

    //   dfs recursive
    const dfs = (i, coins, target, temp_arr) => {
      // backtracking - we've added too much, don't go down this path
      if (target < 0) return;
      // base case - we've added just the right number of elements starting at the first number and can push to the global result array
      if (target === 0) {
        //   read the value of each individual element in temp_arr, and store it into an object

        const layout = {
          pennies: 0,
          nickels: 0,
          dimes: 0,
          quarters: 0,
        };
        for (let k = 0; k < temp_arr.length; k++) {
          if (temp_arr[k] === PENNIES) {
            layout.pennies += 1;
          } else if (temp_arr[k] === NICKELS) {
            layout.nickels += 1;
          } else if (temp_arr[k] === DIMES) {
            layout.dimes += 1;
          } else if (temp_arr[k] === QUARTERS) {
            layout.quarters += 1;
          }
        }

        res.push(layout);

        return;
      }
      // dfs recursive
      for (let j = i; j < coins.length; j++) {
        temp_arr.push(coins[j]);
        dfs(j, coins, target - coins[j], temp_arr);
        temp_arr.pop();
      }
    };

    dfs(0, coins, target, []);

    //   example return value:
    //   [ { pennies: 5, nickels: 0, dimes: 0, quarters: 0 },
    //   { pennies: 3, nickels: 1, dimes: 0, quarters: 0 },
    //   { pennies: 1, nickels: 2, dimes: 0, quarters: 0 },
    //   { pennies: 0, nickels: 0, dimes: 1, quarters: 0 } ]
    return res;
  },
  findArbitraryCombinations: (newCurrency) => {
    // q: 4 (100/25 cents)
    // d: 10 (100/10 cents)
    // n: 20 (100/5 cents)
    // p: 100 (100/1 cent)

    //   coins: 1.5
    // arrowhead: 3
    // button: 150

    // coins: 100 (150/1.5 value= 1.5)
    // arrowhead: 50 (150/3 value)
    // button: 1 (150/150 value)

    // figure out coin values:
    // assumption: the last value is always a denominator of 1 because the value will be X / 1 giving X as the amount to the smallest value
    // from there we can calculate the middle value where we take smallestValueCoin / x = middleValue. x will be the middle currency value
    // same procedure for the last value, smallestValueCoin / x = largestValue. x will be largest currency value.

    /**
     * the VALUE in newCurrency is how many of that coin it takes to reach that "sum"
     */

    if (Object.keys(newCurrency).length === 0) {
      throw new Error("The currency object is empty");
    }

    // create a coins array and fill it with values from the req.body
    const coins = [];

    // sort the newcurrency based off largest value so we always store the largest value in the first element
    const sortable = [];

    for (const currencyName in newCurrency) {
      sortable.push([currencyName, newCurrency[currencyName]]);
    }

    sortable.sort((a, b) => {
      return b[1] - a[1];
    });

    const sortedCurrency = {};

    sortable.forEach((item) => {
      sortedCurrency[item[0]] = item[1];
    });

    for (const key in sortedCurrency) {
      coins.push(newCurrency[key]);
    }

    // since we sorted descending, the first value is the smallestValueCoin
    // 150, 3, 1.5
    const smallestValueCoin = coins[0];
    //   calculate the actual coin values from itself and create an object to hold those values
    for (let index = 0; index < coins.length; index++) {
      coins[index] = smallestValueCoin / coins[index];
    }

    const coinValueObject = {};
    for (let index = 0, j = 0; index < coins.length; index++) {
      const newCurrencyNameKey = Object.keys(sortedCurrency)[index];
      coinValueObject[newCurrencyNameKey] = coins[index];
    }

    // target will be the smallestValueCoin as it holds the largest denomination in the parameter object
    const target = smallestValueCoin;

    //   global result
    const res = [];

    //   dfs recursive
    const dfs = (i, coins, target, temp_arr) => {
      // backtracking - we've added too much, don't go down this path
      if (target < 0) return;
      // base case - we've added just the right number of elements starting at the first number and can push to the global result array
      if (target === 0) {
        //   read the value of each individual element in temp_arr, and store it into an object

        const layout = {};
        const valuesObject = {};
        /**
         *
         * {
         *    Coin: 0,
         *    Arrowhead: 0
         *    Button: 0
         * }
         * Values Object
         * {
         *    100: coin
         *    50: arrowhead
         *    1: button
         * }
         *
         * sets the layout elements value to 0
         * Create a values object where each
         */
        for (const name in coinValueObject) {
          const coinValue = coinValueObject[name];

          layout[name] = 0;
          valuesObject[coinValue] = name;
        }

        // have the layout for the returned combinations, however we don't know the type of coin / price in here
        //   [1, 1, 1, 1, 1, 1 ......] [1, 1, 1, 1, 1. . . . 50]
        /**
         * Increments the coin name that we see in a unique combination
         * Layout returns back the combination of coins
         */
        for (let k = 0; k < temp_arr.length; k++) {
          const curCoinName = valuesObject[temp_arr[k]];
          if (layout[curCoinName] !== undefined) {
            layout[curCoinName] += 1;
          }
        }

        res.push(layout);

        return;
      }
      // dfs recursive
      for (let j = i; j < coins.length; j++) {
        temp_arr.push(coins[j]);
        dfs(j, coins, target - coins[j], temp_arr);
        temp_arr.pop();
      }
    };

    dfs(0, coins, target, []);
    return res;
  },
};
