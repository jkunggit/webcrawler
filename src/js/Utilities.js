export default class {
  static roundData(data) {
    let dataRounded = {};
    data.map((item) => {
      let round = this.roundNearQtr(item);
      if (!dataRounded.hasOwnProperty(round)) {
        dataRounded[round] = 0;
      }
      dataRounded[round]++;
    });
    return dataRounded;
  }

  static roundNearQtr(number) {
    return (Math.round(number * 4) / 4).toFixed(2);
  }

  static sortObjectByKey(object) {
    return Object.entries(object)
      .sort((a, b) => a[0] - b[0])
      .reduce((a, c) => (a[c[0]] = c[1], a), {})
  }

  static flattenArray(array) {
    return array.reduce((acc, e) => acc.concat(e), []);
  }

  // count the occurrences of the array elements
  static frequency(array) {
    return array.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
  }

  // remove duplicates from array
  static deduped(array) {
    return array.filter(function (element, index) {
      return array.indexOf(element) === index;
    });
  }
}