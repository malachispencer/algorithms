/*
MS. 19/06/20. The binary search algorithm is an efficient way to find a value inside of an array. It is often contrasted with the linear
search algorithm, which involves traversing the array from its beginning, to its end, one element at a time, each time checking if the 
element is equal to the value we are searching for. Linear search can be extremely inefficient if our array contains hundreds, thousands 
or millions of items. It is also inefficient for the reason that if the value is not found in our array, we will still iterate the
entireity of it.

The binary search algorithm involves continually taking our array (after it's been sorted), cutting it in half, then checking to see if
our value is in the lower half, or the higher half. It is much more efficient than the linear search algorithm.

Linear search is like looking for a name in a phonebook by starting at the beginning and going through each name until you find what you're
looking for. On the other hand, binary search is like opening the phonebook in the middle, looking at the name at the top of the page, then
seeing whether the name you're looking for is alphabetically lower or higher than that name, and checking the lower or higher side
accordingly.

Performance:
1) Linear: O(n).
2) Binary: O(log n).
*/

/*
The Code Explained:
1) We define our function binarySearch, which takes an unsorted array of discrete integers (no duplicates) and a value we are to search
   for in the array.
2) First, we sort our array of integers.
3) We then create a variable called start, where the index of the first element in the array is stored.
4) We then create a variable called end, where the index of the last element in the array is stored.
5) We create a while loop, which runs as long as start is less than or equal to end.
6) Inside our while loop, we create a mid variable, which will be the start plus the end, divided by two, then rounded down using the
   Math.floor method.
7) If the middle element in our array is equal to the value we are searching for, we have successfully found our value and so we return
   that middle element.
8) If the value we are searching for in the array - which remember is sorted - is lower than the middle element, we make the end variable
   equal to mid - 1, so essentially within the next run of our while loop, we'll be searching in the lower half of the array. 
9) Otherwise, the value must be higher than the middle element, so we make the start variable equal to mid + 1, so on the next iteration
   of the while loop, we'll be searching in the higher half of the array.
10) Once we've found the value we are searching for is the middle element, that middle element will be returned. If not - because that
    value doesn't exist within the array - the while loop runs until start is greater than end, then once it is broken out of, we return
    -1.
*/

/*
Example 1: binarySearch([10,2,7,5,8,9,4,1,3,6], 3)
1) We sort the array, so now it's [1,2,3,4,5,6,7,8,9,10].
2) start = 0, end = 9.
3) Iteration 1: mid = (9 + 0) / 2 = 4.5 = 4. arr[4] = 5. The value we are searching for is lower than 5, so now end = 4 - 1 = 3.
4) iteration 2: start = 0, end = 3, mid = (3 + 0) / 2 = 1.5 = 1. The portion of the array we are now searching in is [1,2,3,4]. arr[1] = 2.
   Our value is higher than arr[mid], so now start will be 1 + 1 = 2.
5) Iteration 3: start = 2, end = 3, mid = (3 + 2) / 2 = 2.5 = 2. The portion of the array we are now searching in is [3,4], but remember
   when we use mid to index, we are indexing the full array, not indexing the portion, so arr[2] = 3.
6) 3 is found as an arr[mid] and hence 3 is returned.
*/

/*
Example 2: binarySearch([10,2,7,5,8,9,4,1,3,6], 0)
1) We sort the array, so now it's [1,2,3,4,5,6,7,8,9,10].
2) start = 0, end = 9.
3) Iteration 1: mid = 4. arr[4] = 5. Our value is lower than 5, so we will search the lower half of the array, so now end = 4 - 1 = 3.
4) Iteration 2: start = 0, end = 3, mid = (3 + 0) / 2 = 1.5 = 1. We are now searching in [1,2,3,4]. arr[1] = 2. Our value is lower than
   2, so we will now search the lower half of this portion, so now end = 1 - 1 = 0.
5) Iteration 3: start = 0, end = 0, mid = (0 + 0) / 2 = 0. Remember, the loop still runs while start is equal to end. This time we are
   searching in [1]. arr[0] = 1. Our value is lower than 1 so now end = 0 - 1 = -1.
6) Because end is now -1 and start is 0, start is no longer less than or equal to end, it's greater than end, so our loop is broken out of.
7) -1 is returned because our value (0) did not exist in the array.
*/

/*
Example 3: binarySearch([10,2,7,5,8,9,4,1,3,6], 11)
1) We sort the array, so now it's [1,2,3,4,5,6,7,8,9,10].
2) start = 0, end = 9.
3) Iteration 1: mid = (9 + 0) / 2 = 4.5 = 4. arr[4] = 5. Our value is higher than arr[mid] (5) so now we'll search the higher half
   of the array so now start = 4 + 1 = 5.
4) Iteration 2: start = 5, end = 9, mid = (9 + 5) / 2 = 7. We are now searching in [6,7,8,9,10]. arr[7] = 8. Our value is higher than 8 so
   now we must look in the higher half of this portion, so start = 7 + 1 = 8.
5) Iteration 3: start = 8. end = 9, mid = (9 + 8) / 2 = 8.5 = 8. We are now searching in [9, 10]. arr[8] = 9. Our value is higher than 9 so
   now start = 8 + 1 = 9.
6) Iteration 4: start = 9, end = 9, mid = (9 + 9) / 2 = 9. We are now searching in [10]. arr[9] = 10. Our value is higher than 10 so now
   start = 9 + 1 = 10.
7) Because start is now 10 but end is 9, start is no longer less than or equal to end, it's greater than end, so our loop is broken out of.
8) -1 is returned because our value (11) was not found in the array.
9) As we have seen from our last 2 examples, end can never be smaller than the lowest index of our array - which will always be 0 - and
   start can never be higher than the highest index of our array (this will vary depending on the length of the array). At these points -
   which intuitively and logically don't make sense - the loop will be broken out of.
10) Additionally, in this example we discovered that the value is not in our loop with only 4 iterations, whereas if we did a linear
    search we would've iterated all 10 elements in the array to discover this.
*/

function binarySearch(arr,v) {
  arr = arr.sort((a,b) => a - b);

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((end + start) / 2);

    if (arr[mid] == v) {
      return arr[mid];
    }

    if (v < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
}