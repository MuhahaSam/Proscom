class MyBeautifulNumber {
  private startPart: number;
  private endPart: number;
  private maxValue: string;
  public value: string;
  public count: number = 0;
  constructor(private readonly n: number, private readonly k: number) {
    this.startPart = Math.floor(this.n / 2);
    this.endPart = this.n % 2 === 0 ? this.n / 2 : Math.floor(this.n / 2);
    this.maxValue = [...Array(this.n).keys()].reduce(
      (prev, curr) => (prev += (this.k - 1).toString(this.k)),
      '',
    );
    this.value = this.zeroes(this.n);
  }

  public countBeautiful() {
    this.count++;
  }

  public isBeautiful(): boolean {
    const startPartSum: number = this.value
      .slice(0, this.startPart)
      .split('')
      .reduce((prev, curr) => (prev += parseInt(curr, this.k)), 0);
    const endPartSum: number = this.value
      .slice(this.endPart)
      .split('')
      .reduce((prev, curr) => (prev += parseInt(curr, this.k)), 0);
    return startPartSum === endPartSum;
  }

  public increment() {
    this.value = (parseInt(this.value, this.k) + 1).toString(this.k);
    if (this.value.length < this.n) {
      this.value = this.zeroes(this.n - this.value.length) + this.value;
    }
  }

  private zeroes(n: number): string {
    return [...Array(n).keys()].reduce((prev, curr) => (prev += '0'), '');
  }

  public isMoreThenMax(): boolean {
    return parseInt(this.value, this.k) > parseInt(this.maxValue, this.k);
  }
}

// function main() {
//   const n = 6;
//   const k = 10;

//   const myNumber = new MyBeautifulNumber(n, k);
//   let idx = 0
//   while (!myNumber.isMoreThenMax()) {
//     if (myNumber.isBeautiful()) {
//       myNumber.countBeautiful();
//     }
//     myNumber.increment();
//     if(idx % 100000 === 0){
//         console.log(`passed over ${idx} numbers`)
//     }
//     idx++
//   }
//   console.log(myNumber.count);
// }

// main()

