"use strict";

let sprite = 'data:image/gif;base64,' +
  'R0lGODlhCAAIAJcAAG1tbdr//7ba/5G2/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GKkyMDE1LCBBZHJpYW4g' +
  'Q2FzdHJhdmV0ZQAh/wtDUk5HAAAAADEuMCQAAAACAA8AAAACNz8AAAACQEcAAAAAcXgAAAACeYIA' +
  'AAAAoacAIfkEBf//AAAsAAAAAAgACAAHCCYAAQgMILBggIMHByIMIGAAgIUCGj5kGFEigIoDHBYE' +
  'oHGjRwABAQA7';

class Snowflake {
  constructor(canvas) {
    let spr;

    canvas.addEventListener('click', this.saveFile);

    spr = new Image();
    spr.src = sprite;

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.sprite = spr;
  }

  setHexString(hexString) {
    this.hexString = hexString;
  }

  setString(string) {
    let hash;

    this.hexString = hash;
  }

  generate() {
    let cvs, hexBits, bitMap;

    cvs = this.canvas;
    cvs.width = cvs.height = 720;

    hexBits = this._hexBits();
    bitMap = this._constructHexMap(hexBits);
    this._drawHexMap(bitMap);
  }

  saveFile() {
    window.open(this.canvas.toDataURL(), 'Commit Snowflake Snapshot');
  }

  _hexBits() {
    let i, bits, hexs;

    hexs = this.hexString;
    bits = '';
    for (i = 0; i < hexs.length; i++) {
      bits += ("0000" + window.parseInt(hexs[i], 16).toString(2)).substr(-4, 4);
    }

    return bits;
  }

  _constructHexMap(bits) {
    let out, i, x, y, k;

    out = this._constructSkeleton();
    x = 0; // row
    y = 0; // col
    k = 1; // limit
    for (i = 0; i < bits.length; i++) {
      if (bits[i] === '1') {
        this._updateHexMap(out, x, y);
      }
      x++;
      if (x >= k) {
        x = 0;
        y++;
        if (y % 2 === 0) {
          k++;
        }
      }
    }

    return out;
  }

  _updateHexMap(bitMap, x, y) {
    bitMap[24 - y][27 + x - ((y + 1) / 2|0)] = 1;
    bitMap[24 - y][27 - x + ((y + 2) / 2|0)] = 1;
    bitMap[25 - y + x][29 + ((x + y + 1) / 2|0)] = 1;
    bitMap[26 - x][30 + y - ((x + 1) / 2|0)] = 1;
    bitMap[28 + x][30 + y - ((x + 1) / 2|0)] = 1;
    bitMap[29 + y - x][29 + ((x + y + 1) / 2|0)] = 1;
    bitMap[30 + y][27 - x + ((y + 2) / 2|0)] = 1;
    bitMap[30 + y][27 + x - ((y + 1) / 2|0)] = 1;
    bitMap[29 + y - x][26 - ((y + x + 2) / 2|0)] = 1;
    bitMap[28 + x][24 - y + ((x + 2) / 2|0)] = 1;
    bitMap[26 - x][24 - y + ((x + 2) / 2|0)] = 1;
    bitMap[25 - y + x][26 - ((y + x + 2) / 2|0)] = 1;
  }

  _constructSkeleton() {
    let out, i, j;

    out = [];
    for (j = 0; j < 55; j++) {
      out.push([]);
      for (i = 0; i < 55; i++) {
        out[j].push(0);
      }
    }

    for (i = 0; i < 27; i++) {
      out[27][27 + i] = 1;
      out[27 + i][27 + ((i + 1) / 2|0)] = 1;
      out[27 + i][27 - (i / 2|0)] = 1;
      out[27][27 - i] = 1;
      out[27 - i][27 - (i / 2|0)] = 1;
      out[27 - i][27 + ((i + 1) / 2|0)] = 1;
    }
    out[25][27] = 1;
    out[26][29] = 1;
    out[28][29] = 1;
    out[29][27] = 1;
    out[28][26] = 1;
    out[26][26] = 1;

    return out;
  }

  _drawHexMap(bitMap) {
    let i, j, x, y, c;

    c = this.context;
    c.save();
    c.scale(2, 2);
    c.imageSmoothingEnabled = false;
    for (j = 0; j < 55; j++) {
      for (i = 0; i < 55; i++) {
        x = 176 + (i - 28) * 6 + j % 2 * 3;
        y = 176 + (j - 28) * 5;
        if (bitMap[j][i]) {
          c.drawImage(this.sprite, x, y);
        }
      }
    }
    c.restore();
  }
}

let paper = document.getElementById('paper');
let snowflake = new Snowflake(paper);
snowflake.setHexString('df2260de591013ca73d6a7c48348c2180d7b6691');
snowflake.generate();

