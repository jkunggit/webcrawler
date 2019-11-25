export default class Card {
  constructor(id, title, type = 'card', value = 0, data = null, xAxisLabel = null, yAxisLabel = null) {
    this._id = id;
    this._title = title;
    this._type = type;
    this._value = value;
    this._data = data; // for showing on the modal

    // for graphs
    this._xAxisLabel = xAxisLabel;
    this._yAxisLabel = yAxisLabel;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get type() {
    return this._type;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get xAxisLabel() {
    return this._xAxisLabel;
  }

  set xAxisLabel(label) {
    this._xAxisLabel = label;
  }

  get yAxisLabel() {
    return this._xAxisLabel;
  }

  set yAxisLabel(label) {
    this._xAxisLabel = label;
  }
}