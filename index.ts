function toHash(num: number[]): string {
  return num.reduce((prev, curr) => (prev += `${curr.toString()}.`), '');
}

function toNum(hash: string): number[] {
  return hash.split('.').reduce((prev: number[], curr: string) => {
    if (curr !== '.') {
      prev.push(Number(curr));
    }
    return prev;
  }, []);
}

function countBeautiful(val: number, capacity: number, notation: number) {
  const minCapacity: number =
    val > notation - 1
      ? val % (notation - 1) === 0
        ? val / (notation - 1)
        : Math.floor(val / (notation - 1)) + 1
      : 1;
  const maxVal: number =
    val >= notation - 1 ? notation - 1 : val % (notation - 1);
  const minVal: number =
    val % (notation - 1) === 0 ? notation - 1 : val % (notation - 1);

  const allNumbers: Record<string, boolean> = {};
  let fisrtNumber = [...Array(capacity).keys()].map((x) => {
    if (x < minCapacity - 1) {
      return maxVal;
    }
    if (x === minCapacity - 1) {
      return minVal;
    }
    return 0;
  });
  allNumbers[toHash(fisrtNumber)] = true;

  let nums = Object.keys(allNumbers).map((x) => toNum(x));

  for (let capMax = minCapacity - 1; capMax <= capacity - 1; capMax++) {
    for (let capmin = 0; capmin < minCapacity - 1 || capmin === 0; capmin++) {
      nums = Object.keys(allNumbers).map((x) => toNum(x));
      for (let step = 1; step <= maxVal; step++) {
        for (let num of nums) {
          let lastEl: number = num[capmin];
          let firstEl: number = num[capMax];
          while (true) {
            const tmpNum = [...num.keys()].map((x) => {
              if (x === capmin) {
                return lastEl - step;
              }
              if (x === capMax) {
                return firstEl + step;
              }
              return num[x];
            });
            lastEl -= step;
            firstEl += step;
            const hash = toHash(tmpNum);
            if (allNumbers[hash] || lastEl < 0 || firstEl > maxVal) break;
            allNumbers[hash] = true;
          }
        }
      }
    }
  }
  return Object.keys(allNumbers).map((x) => toNum(x)).length;
}

function main() {
  const n: number = 4;
  const k: number = 10;
  let summ: number = 0;

  for (let i = 0; i <= (k - 1) * Math.floor(n / 2); i++) {
    const val = countBeautiful(i, 3, 10);
    summ += val * val;
  }

  if (n % 2 !== 0) {
    summ *= n;
  }
  return summ;
}

main();
