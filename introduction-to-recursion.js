/*
MS. 04/09/20. Recursion is when a functions invokes itself. Here we build functions for two of the most famous examples used to exemplify
recursion, a function that returns the factorial of a number, and a function which returns the nth number in a fibonacci sequence.

Every recursive function must have these 3 ingredients:
1) A simple base case we have a return value for.
2) A way of getting our problem closer to the base case i.e. a way to chop out part of the problem to get a somewhat simpler problem.
3) A recursive call which passes the simpler problem back into the function.
*/

/*
About Factorial
1) The factorial of a number is the product of all positive integers less than or equal to n. 
2) The formula is n! = n * (n - 1) * (n - 2)... 3, 2, 1.
3) For example, 5! = 5 * 4 * 3 * 2 * 1 = 120. Or sometimes it can be written 5! = 1 * 2 * 3 * 4 * 5 = 120.
4) As an edge case, 0! = 1.
5) For any factorial above 0, we can actually rewrite the formula as n! = n * (n - 1)!. So for example, 5! = 5 * 4!, 4! = 4 * 3!,
   3! = 3 * 2!, 2! = 2 * 1!, 1! = 1 * 0!. Once we get to 0, this formula doesn't work, because 0! = 1 but 0 * -1! is not a number because
   negative integers do not have factorials.
6) Thus, we have 2 formula conditions: If n >= 1 then n! = n * (n - 1)!, but if n == 0 then n! = 1. Using this formula, we can create
   our recursive implementation.

The Recursive Implementation
1) Recursion uses something called a 'stack' or 'call stack'. When a function calls itself, that function call goes to the top of the
   stack, similar to a stack of books, you add things one at a time, then when you are ready to take something off, you always take off the
   top item.
2) In our factorialOf function, we create a stack, where each stack has a different n.
3) In recursion, the condition where a function calls itself is called a recursive case, whereas the condition where the function does not
   call itself and simply returns a value, is called the base case. In our factorialOf function, we start taking calls off the stack once
   we reach our base case, which is when n === 1.

Example: factorialOf(5).
1) When we run our program, n = 5 and the stack currently contains factorialOf(5), but n is greater than 1, so we add factorialOf(4) to the 
   stack.
2) n (4) is greater than 1, so we add factorialOf(3) to the stack.
3) n (3) is greater than 1, so we add factorialOf(2) to the stack.
4) n (2) is greater than 1, so we add factorialOf(1) to the stack.
5) Now we have factorial(5) at the bottom of the stack and factorial(1) at the top of the stack.
6) factorialOf(1): n === 1, so we have reached our base case where we don't recursively call the function, instead we can start removing 
   from the stack, because n === 1, we return 1.
7) factorialOf(2): Now we have the value of factorialOf(1), we can calculate the value of factorialOf(2). So we get factorialOf(1) = 1 * n
   = 2.
8) factorialOf(3): Now we have the value of factorialOf(2) = 2 * n = 6.
9) factorialOf(4): factorial(3) = 6 * n = 24.
10) factorialOf(5): factorial(4) = 24 * n = 120.
11) As we can see, we add function calls to the stack, each function call with a different n, until we reach our base case, then we use the 
    return value of the top function call (factorialOf(1)), to remove that call from the stack, then each return value for each call on
    the stack can be calculated as we work down the stack.
*/

function factorialOf(n) {
  return n <= 1 ? 1 : factorialOf(n - 1) * n;
}

//console.log(factorialOf())

/*
About Fibonacci
1) In a fibonacci sequence, the next number in the sequence is found by adding the two numbers before it i.e. the last two numbers in the
   sequence.
2) 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 are the first 11 numbers of the fibonacci sequence starting with 0, 1.
3) The formula we can establish for the index-n fib is: If n === 0, fn = 0; if n === 1, fn = 1, otherwise fn = fn-1 + fn-2.

The Recursive Implementation
1) Our fibonacci function takes an integer n (n >= 0) and returns the number at n index position in the sequence, for example, fibonacci(3) 
   will return 2 and fibonacci(10) will return 55.
2) Like factorialOf, the function creates a stack until we reach a base case, then it calculates back down the stack, removing from the
   stack each time a return value is produced.
3) In our function, the base cases are when n = 1 and n = 0.
4) While good for understanding recursion, this function is extremely inefficient for calculating fibonacci numbers especially when we get
   to n > 40.

Example: fibonacci(6)
1) fibonacci(6) = fibonacci(5) + fibonacci(4). Stack (bottom to top) = 6, 5 and 4.
2) fibonacci(5) = fibonacci(4) + fibonacci(3). Stack = 6, 5, 4 and 3.
3) fibonacci(4) = fibonacci(3) + fibonacci(2). Stack = 6, 5, 4, 3 and 2.
4) fibonacci(3) = fibonacci(2) + fibonacci(1). Stack = 6, 5, 4, 3, 2, 1.
5) fibonacci(2) = fibonacci(1) + fibonacci(0). Stack = 6, 5, 4, 3, 2, 1, 0.
6) Now we reach our base cases. fibonacci(0) = 0 and fibonacci(1) = 1. We then remove 0 and 1 from the stack and calculate/remove back down
   the stack.
7) fibonacci(2) = 1 + 0 = 1.
8) fibonacci(3) = 1 + 1 = 2.
9) fibonacci(4) = 2 + 1 = 3.
10) fibonacci(5) = 3 + 2 = 5.
11) fibonacci(6) = 5 + 3 = 8.
*/

function fibonacci(n) {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

// console.log(fibonacci())