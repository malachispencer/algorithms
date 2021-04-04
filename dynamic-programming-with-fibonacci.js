/*
MS. 04/04/2021. Dynamic programming is an optimization over plain recursion. Whenever we see a recursive solution that has repeated calls
for the same inputs, we can optimize it using dynamic programming. We do this by storing the results of sub-problems, so that we do not 
have to recompute them when needed later, in other words, we use memoization.

The fibonacci is a sequence which starts with 0 and 1, then every following number is the sum of the two numbers which precede it. The
formula to find the index-n fibonacci is: if n <= 1, fib(n) = n; else fib(n) = fib(n - 1) + fib(n - 2).

When we find fib(5) for example witb plain recursion, computations are repeated:

                                                              fib(5)
                                                         fib(4) + fib(3)
                                           fib(3) + fib(2)             fib(2) + fib(1)
                                   fib(2) + fib(1) fib(1) + fib(0) fib(1) + fib(0)
                              fib(1) + fib(0)

As we can see, fib(2) + fib(1) is performed twice and fib(1) + fib(0) is repeated three times. With dynamic programming, we can avoid
repeating these computations by storing the results in an array.
*/

/*
Our plain recursion fib implementation takes 15 calls to resolve fib(5).
*/

function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

/*
Here we have an implementation which uses dynamic programming, storing the results in an array which must be initialized outside the
function. This function peforms fib(5) in only 9 calls, when we print n and the memo, we can see the function move down then back up the
call stack, without needing to repeat any computations. 
*/

let fibs = [];

function fibDP(n, memo = fibs) {

  if (memo[n]) { return memo[n]; } 
  
  if (n <= 1) {
    memo[n] = n;
  } else {
    memo[n] = fibDP(n - 1) + fibDP(n - 2);
  }

  return memo[n];
}

/*
Here we see a bottom up implementation. We start off our array outside the function, with the 0th and 1st fibonacci numbers, then in order
to prevent re-computations, we have our guard clause return memo[n] if it exists in the array. If it doesn't, we run a for loop, where
the necessary values are calculated from the bottom up. This implementation also resolves with 9 calls.

When we calculate fib(5), memo[5] does not exist on the first call, so we go to the for loop, which goes like the following:
i
n memo
n memo
2
1 [ 0, 1 ]
0 [ 0, 1 ]
3
2 [ 0, 1, 1 ]
1 [ 0, 1, 1 ]
4
3 [ 0, 1, 1, 2 ]
2 [ 0, 1, 1, 2 ]
5
4 [ 0, 1, 1, 2, 3 ]
3 [ 0, 1, 1, 2, 3 ]
*/

let arr = [0, 1];

function fibsBU(n, memo = arr) {
  if (memo[n]) { return memo[n]; }
  
  for (let i = 2; i <= n; i++) {
    memo[i] = fibsBU(i - 1) + fibsBU(i - 2);
  }

  return memo[n];
}