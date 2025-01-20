//SUPPORT FUNC
// Cek apakah bilangan prima
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Cari bilangan prima terdekat (di atas nilai tertentu)
function nextPrime(num) {
  while (!isPrime(num)) {
    num++;
  }
  return num;
}

// Modulo eksponensial (untuk operasi cepat)
function modExp(base, exp, mod) {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

// Mengubah huruf ke ASCII dan sebaliknya
function charToAscii(char) {
  return char.charCodeAt(0);
}

function asciiToChar(ascii) {
  return String.fromCharCode(ascii);
}

export { nextPrime, modExp, charToAscii, asciiToChar };
