export class Vector2D {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static generateRandomPoint(): Vector2D {
    const minX = 50;
    const maxX = window.innerWidth;
    const minY = 50;
    const maxY = window.innerHeight;
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    return new Vector2D(randomX, randomY);
  }

  public generateUI(point: Vector2D, color: string): HTMLDivElement {
    const blockDiv = document.createElement("div");
    blockDiv.classList.add("block");
    blockDiv.style.position = "absolute";
    blockDiv.style.left = `${point.getX()}px`;
    blockDiv.style.top = `${point.getY()}px`;
    blockDiv.style.width = "10px";
    blockDiv.style.height = "10px";
    blockDiv.style.backgroundColor = color;
    return blockDiv;
  }

  getX(): number {
    return this.x;
  }

  setX(value: number) {
    this.x = value;
  }

  getY(): number {
    return this.y;
  }

  setY(value: number) {
    this.y = value;
  }
}

export class Matrix3x3 {
  private elements: number[][];

  constructor(elements: number[][]) {
    if (
      elements.length !== 3 ||
      elements[0].length !== 3 ||
      elements[1].length !== 3 ||
      elements[2].length !== 3
    ) {
      throw new Error("Matrix must be 3x3");
    }
    this.elements = elements;
  }

  getElements(): number[][] {
    return this.elements;
  }

  static identity(): Matrix3x3 {
    return new Matrix3x3([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  }

  inverse(): Matrix3x3 {
    const det = this.determinantOf3x3();
    if (this.isSingular(det)) {
      return null;
    }
    const invDet = 1 / det;
    const cofactorMatrix = this.cofactorMatrix();
    // Adjoint Matrix is the transpose of the cofactor matrix
    const adjugateMatrix = cofactorMatrix.transpose();

    return adjugateMatrix.scalarMultiply(invDet);
  }

  cofactorMatrix(): Matrix3x3 {
    const cofactors: number[][] = [];

    for (let i = 0; i < 3; i++) {
      cofactors[i] = [];
      for (let j = 0; j < 3; j++) {
        const minorDeterminant = Matrix3x3.determinantOf2x2(this.getMinorMatrix2x2(i, j));
        const cofactor = Math.pow(-1, i + j) * minorDeterminant;
        cofactors[i][j] = cofactor;
      }
    }

    return new Matrix3x3(cofactors);
  }

  getMinorMatrix2x2(rowToRemove: number, colToRemove: number): number[][] {
    const minorElements: number[][] = [];

    for (let i = 0; i < 3; i++) {
      if (i === rowToRemove) continue;
      const minorRow: number[] = [];
      for (let j = 0; j < 3; j++) {
        if (j === colToRemove) continue;
        minorRow.push(this.getElements()[i][j]);
      }
      minorElements.push(minorRow);
    }

    return minorElements;
  }

  transpose(): Matrix3x3 {
    // switch the rows and columns
    return new Matrix3x3(
      this.getElements()[0].map((col, i) => this.getElements().map((row) => row[i]))
    );
  }

  isSingular(determinant: number): boolean {
    // if a matrix is singular, it cannot be inverted
    return determinant === 0;
  }

  determinantOf3x3(): number {
    // Calculate determinant of 3x3 matrix using Laplace expansion
    const [a, b, c] = this.elements[0];
    const [d, e, f] = this.elements[1];
    const [g, h, i] = this.elements[2];
    return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
  }

  multiply(other: Matrix3x3): Matrix3x3 {
    const result: number[][] = [];
    for (let i = 0; i < 3; i++) {
      result[i] = [];
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) {
          sum += this.elements[i][k] * other.elements[k][j];
        }
        result[i][j] = sum;
      }
    }
    return new Matrix3x3(result);
  }

  scalarMultiply(scalar: number): Matrix3x3 {
    const newElements = this.elements.map((row) => row.map((value) => value * scalar));
    return new Matrix3x3(newElements);
  }

  transformPoint(point: Vector2D): Vector2D {
    const z = 0;
    const x =
      this.elements[0][0] * point.getX() +
      this.elements[0][1] * point.getY() +
      this.elements[0][2] * z;
    const y =
      this.elements[1][0] * point.getX() +
      this.elements[1][1] * point.getY() +
      this.elements[1][2] * z;
    return new Vector2D(x, y);
  }

  static translation(dx: number, dy: number): Matrix3x3 {
    return new Matrix3x3([
      [1, 0, dx],
      [0, 1, dy],
      [0, 0, 1],
    ]);
  }

  static rotate(angle: number): Matrix3x3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix3x3([
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1],
    ]);
  }

  static scaling(sx: number, sy: number): Matrix3x3 {
    return new Matrix3x3([
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ]);
  }

  static determinantOf2x2(matrix: number[][]): number {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  static rotateAroundPoint(angle: number, center: Vector2D): Matrix3x3 {
    const translationToOrigin = Matrix3x3.translation(-center.getX(), -center.getY());
    const rotationMatrix = Matrix3x3.rotate(angle);

    // Translation back to the original position
    // Inverse to unapply a Transformation
    const translationBack = translationToOrigin.inverse();

    // Combining transformation matrices allows us to apply multiple transformations (such as rotation, scaling, and translation) to an object in a single step.
    return translationBack.multiply(rotationMatrix).multiply(translationToOrigin);
  }
}
