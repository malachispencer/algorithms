/*
MS. 06/07/20. Here we create a functions which convert a number from base 10 (decimal) to base 2 (binary). In this first implementation, 
we use the subtraction method.
*/

function base10ToBase2SubMS(n) {
  if (n === 0) {return '0';}

  let nearestPow = 1 << 31 - Math.clz32(n);
  let base2 = [];

  while (nearestPow > 0) {
    if (n >= nearestPow) {
      n -= nearestPow;
      base2.push(1);
      nearestPow = Math.floor(nearestPow / 2);
    } else {
      base2.push(0);
      nearestPow = Math.floor(nearestPow / 2);
    }
  }

  return base2.join('');
}

/*
In this second implementation, we use the successive division method.
*/

function base10ToBase2DivMS(n) {
  if (n === 0) {return '0';}

  let binary = [];

  while (n > 0) {
   if (n % 2 != 0) {
     n = Math.floor(n / 2);
     binary.push(1);
   } else {
     n /= 2;
     binary.push(0);
   }
  }

  return binary.reverse().join('');
}