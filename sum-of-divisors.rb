=begin
MS. 11/04/20. Here we show my original - inefficient - divisor sum method and
compare this with my newer - efficient - divisor sum methods. Here in
div_sum_v1, we create a range from 1 all the way up to num, iterate over it,
then grab all the divisors and add them up. While this looks clean, is short
and easy to read, it is inefficient, especially when working with very large
numbers, because we actually do not need to iterate all the way up to num in
order to sum its divisors. This will be demonstrated in div_sum_v2 and
div_sum_v3.
=end

def div_sum_v1(num)
  (1..num).select {|e| num % e == 0}.inject(:+)
end

=begin
Here we have our first efficient divisor sum method. This method was 1 of 3
methods that allowed me to pass the 5kyu "When The Sum of The Divisors Is A
Multiple Of The Prime Factors Sum" challenge on Codewars.
1) We define our method div_sum_v2, which takes one argument, num, the number
   whose divisors we are summing.
2) We create an empty array called divs, where we will store our summed divisor
   pairs and - if it's a whole number - the square root.
3) Now here is why this method is more efficient than div_sum_v1, we create
   from 1 to the square root of num and iterate over it. We do not need to
   iterate all the way up to num. E.g. if num is 100, we'll only iterate up to
   10, whereas our div_sum_v1, would iterate up to 100. Imagine the time this
   saves when using extremely large numbers.
4) Important. Divisors come in pairs. For example, 1 is a divisor of 100 but 1
   needs to be multiplied by 100 to get 100. Likewise, 4 is a divisor of 100
   but this needs to be multiplied by 25 to get 100. Based on this knowledge
   we fill our block.
5) To the divs array, we add e (the number in our range) + (num / e) if e is a
   divisor of num and e is not equal to num / e, in other words, e is not the
   square root of num. Essentially, we are finding a divisor, then summing it
   with its pair, and adding this to the array. For example, if num is 100, and
   e is 2, num / 2 = 50, so we have just grabbed 2 divisors without needing to
   iterate all the way up to 50.
6) We add e by itself, if e is a divisor and e is equal to num / e. For
   example, if num is 100 and e is 10, num / 10 = 10, so we only need to add 10
   to divs once, because it is the square root, the square root has no
   counterpart.
7) At this point, we have a divs array containing summed pairs and if it's a
   perfect square, the square of root of num. If num is a prime number, the
   array contains only the product of 1 + num, e.g. if num is 199, the array
   contains 200.
8) We return divs.reduce(:+) to give us the sum of divisors. We could also
   use divs.inject(:+) or divs.sum.
=end

def div_sum_v2(num)
  divs = []
  (1..Math.sqrt(num)).each do |e|
    divs << e + (num / e) if num % e == 0 && e != (num / e)
    divs << e if num % e == 0 && e == (num / e)
  end
  divs.reduce(:+)
end

=begin
Here is a variation of div_sum_v2, instead of creating an array where summed
divisor pairs and a perfect square root is stored, we create a counter variable
called sum, and we increment the counter with the summed divisor pairs and
perfect square, then we return the sum. No inject required. This solution also
passed all tests on the 5ku "When The Sum of The Divisors Is A Multiple Of The
Prime Factors Sum" challenge on Codewars.
=end

def div_sum_v3(num)
  sum = 0
  (1..Math.sqrt(num)).each do |e|
    sum += e + (num / e) if num % e == 0 && e != (num / e)
    sum += e if num % e == 0 && e == (num / e)
  end
  sum
end

=begin
16/04/20. Here is another divisor sum method, one that involves storing our
divisors in a set. A set is a class that stores items like an array, but has 
much faster lookup times than an array. For example, when you use the include
method on an array, it has to check every single element, this could be
millions of elements, for a set, this is not needed and the include method
works 10x faster with a set than with an array.
=end

require "set"

def div_sum_v4(num)
  divs = Set.new
  (1..Math.sqrt(num)).each do |n|
    divs << n + (num / n) if num % n == 0 && (num / n) != n
    divs << n if num % n == 0 && (num / n) == n
  end
  divs.sum
end

=begin
16/04/20. Here is another set utilising method.
=end

def div_sum_v5(num)
  divs = Set.new(1..Math.sqrt(num)).select {|n| num % n == 0}
  divs += divs.map {|d| num / d unless d == num / d}
  divs.compact.sum
end

=begin
Here we run our benchmark tests to see which method is fastest. All methods
are tested up to the number 500 million and order of performance is as follows:
1) div_sum_v2 and div_sum_v4
3) div_sum_v3
4) div_sum_v5
5) div_sum_v1
=end

=begin
require "benchmark"

Benchmark.bm(10) do |m|
  m.report("Inefficient Method:") {div_sum_v1(500_000_000)}
  m.report("Array Method:") {div_sum_v2(500_000_000)}
  m.report("Sum Method:") {div_sum_v3(500_000_000)}
  m.report("Set Method:") {div_sum_v4(500_000_000)}
  m.report("Compact Set Method:") {div_sum_v5(500_000_000)}
end
=end
