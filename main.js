// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, arr) => {
  return {
    specimenNum: number,
    dna: arr,
    mutate() {
      let randomNum = Math.floor(Math.random() * arr.length);
      let randomBase = arr[randomNum];
      while (randomBase === arr[randomNum]) {
        arr[randomNum] = returnRandBase();
      }
      this.dna = arr;
    },
    compareDNA(pAequor) {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) count++;
      }
      let result = Number.parseFloat((count / 15) * 100).toFixed(2);
      console.log(
        `specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${result}% DNA in common`
      );
    },
    willLikelySurvive() {
      let countCG = 0;
      this.dna.forEach((item) => {
        if (item === 'C' || item === 'G') countCG++;
      });
      if (Number.parseFloat((countCG / 15) * 100).toFixed(1) >= 60) return true;
      return false;
    },
  };
};

// Section 7
const dataDNA = [];
let countIns = 1;
while (dataDNA.length <= 30) {
  let pAequor = pAequorFactory(countIns, mockUpStrand());
  if (pAequor.willLikelySurvive()) {
    dataDNA.push(pAequor);
    countIns++;
  }
}
console.log(dataDNA.map((item) => item.dna));
