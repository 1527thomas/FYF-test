function dpCombinations() {
  coins = [1, 5, 10, 25];
  target = 100;
  let dp = new Array(coins.length + 1)
    .fill(0)
    .map(() => new Array(target + 1).fill(0));

  // Idea: at each row we introduce a new coin, starting with no coins. (example: 1, 2, 5 coins, target amount = 5)
  // dp        0 1 2 3 4 5
  //  []        1 0 0 0 0 0
  //  [1]       1 0 0 0 0 0
  //  [1, 2]    1 0 0 0 0 0
  //  [1, 2, 5] 1 0 0 0 0 0
  //

  // How many ways can you make change for 0 amount? 1 way, this is our base case.
  // This holds true for every row where we introduce a new coin, because if have an amount = 0, then there is only 1 way to make change
  // regardless of which coins we have.
  dp[0][0] = 1;
  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = 1;
  }

  // The way the problem checks for subproblems is by choosing whether or not to use the coin or added in that row, or to use the dp[col - coins[row - 1]]
  // first row is finished because we no coins, so we start on the second row at the second col (first col solved already)
  for (let row = 1; row < dp.length; row++) {
    for (let col = 1; col <= dp[0].length - 1; col++) {
      // this represents that we aren't using the current coin (cell above the current)
      dp[row][col] = dp[row - 1][col];

      //  If there exists a cell on the current row that allows us to use the new coin, then we add it to our combinations
      if (col - coins[row - 1] >= 0) {
        dp[row][col] += dp[row][col - coins[row - 1]];
      }
      //   Some print statements to see the evolution of the dp array
      //   console.log(dp);
      //   console.log("---------------------");
    }
  }
  console.log(dp);

  // We return the last element in the array as that is total unique number of combinations for the given target, and coins
  return dp[coins.length][target];
}

function findCombinations() {
  coins = [1, 5, 10, 25];
  target = 100;

  //   global result
  const res = [];

  //   dfs recursive
  const dfs = (i, coins, target, temp_arr) => {
    // backtracking - we've added too much, don't go down this path
    if (target < 0) return;
    // base case - we've added just the right number of elements starting at the first number and can push to the global result array
    if (target === 0) {
      res.push(temp_arr);
      //   console.log(temp_arr);
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
}

console.log(findCombinations().length);
