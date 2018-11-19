let sprite = 'data:image/gif;base64,' +
  'R0lGODlhCAAIAJEAAG1tbdr//7ba/5G2/yH+GKkyMDE1LCBBZHJpYW4gQ2FzdHJhdmV0ZQAh/wtD' +
  'Uk5HAAAAADEuMCQAAAACAA8AAAACNz8AAAACQEcAAAAAcXgAAAACeYIAAAAAoacAIfkEBf//AAAs' +
  'AAAAAAgACAAHCCYAAQgMILBggIMHByIMIGAAgIUCGj5kGFEigIoDHBYEoHGjRwABAQA7';

class Snowflake {
  constructor(canvas) {
    let spr;

    canvas.addEventListener('click', () => this.saveFile(canvas));

    spr = new Image();
    spr.onload = () => {
      this.generate();
    };
    spr.src = sprite;

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.sprite = spr;
    this.scale = 2;
  }

  setHexString(hexString) {
    this.hexString = hexString;
  }

  generate() {
    let cvs, hexBits, data;

    cvs = this.canvas;

    hexBits = this._hexBits();
    data = this._constructObjects(hexBits);
    this._resizeCanvas(data);
    this._drawObjects(data);
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

  _constructSkeleton() {
    return [
      [0, 0], [-1, 0], [-2, 0], [-1, -1], [0, -1], [0, -2], [1, -2], [1, -1],
      [2, -2], [2, -1], [1, 0], [2, 0], [1, 1], [0, 1], [0, 2], [-1, 2],
      [-1, 1], [-2, 2], [-2, 1]
    ];
  }

  _constructObjects(hexBits) {
    let objects, row, col, limit, output;

    objects = this._constructSkeleton();
    col = 0;
    row = 0;
    limit = 1;
    for (let i = 0; i < hexBits.length; i++) {
      if (hexBits[i] === '1') {
        this._addPoints(objects, col, row);
      }
      col++;
      if (col >= limit) {
        col = 0;
        row++;
        if (row % 2 === 0) {
          limit++;
        }
      }
    }
    this._addBorders(objects, row);
    this._reorder(objects);

    output = this._getBoundaries(objects);
    output.objects = objects;

    return output;
  }

  _getBoundaries(objects) {
    let minX, minY, maxX, maxY;

    minX = minY = maxX = maxY = 0;
    for (let i = 0; i < objects.length; i++) {
      minX = Math.min(minX, objects[i][0]);
      minY = Math.min(minY, objects[i][1]);
      maxX = Math.max(maxX, objects[i][0]);
      maxY = Math.max(maxY, objects[i][1]);
    }

    return {minX, minY, maxX, maxY};
  }

  _addPoints(objects, col, row) {
    objects.push([1 + col, -3 - row]);
    objects.push([2 + row - col, -3 - row]);
    objects.push([3 + row, -2 - row + col]);
    objects.push([3 + row, -1 - col]);
    objects.push([2 + row - col, 1 + col]);
    objects.push([1 + col, 2 + row - col]);
    objects.push([-1 - col, 3 + row]);
    objects.push([-2 - row + col, 3 + row]);
    objects.push([-3 - row, 2 + row - col]);
    objects.push([-3 - row, 1 + col]);
    objects.push([-2 - row + col, -1 - col]);
    objects.push([-1 - col, -2 - row + col]);
  }

  _addBorders(objects, row) {
    for (let i = 0; i < row; i++) {
      objects.push([0, -3 - i]);
      objects.push([3 + i, -3 - i]);
      objects.push([3 + i, 0]);
      objects.push([0, 3 + i]);
      objects.push([-3 - i, 3 + i]);
      objects.push([-3 - i, 0]);
    }
  }

  _reorder(objects) {
    let inter;

    for (let j = 0; j < objects.length - 1; j++) {
      for (let i = j + 1; i < objects.length; i++) {
        if (objects[i][1] < objects[j][1] ||
            objects[i][1] === objects[j][1] && objects[i][0] < objects[j][0]) {
          inter = [objects[i][0], objects[i][1]];
          objects[i] = [objects[j][0], objects[j][1]];
          objects[j] = inter;
        }
      }
    }
  }

  _resizeCanvas(data) {
    let dx, dy;

    dx = data.maxX - data.minX;
    dy = data.maxY - data.minY;

    data.width = dx * 6 + 24;
    data.height = dy * 5 + 24;

    this.canvas.width = this.scale * data.width;
    this.canvas.height = this.scale * data.height;
  }

  _drawObjects(data) {
    let c;

    c = this.context;
    c.save();
    c.scale(this.scale, this.scale);
    c.imageSmoothingEnabled = false;
    c.translate(data.width / 2 - 3 | 0, data.height / 2 - 3 | 0);

    for (let i = 0; i < data.objects.length; i+=1) {
      let obj = data.objects[i];
      c.drawImage(this.sprite, obj[0] * 6 + obj[1] * 3, obj[1] * 5);
    }
    c.restore();
  }
}

