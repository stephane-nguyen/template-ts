import { Vector2D, Matrix3x3 } from "../../src/Geometry";

describe("Matrix3x3", () => {
  describe("constructor", () => {
    it("throws error if matrix is not 3x3", () => {
      expect(
        () =>
          new Matrix3x3([
            [1, 2],
            [3, 4],
          ])
      ).toThrow("Matrix must be 3x3");
    });

    it("initializes elements correctly", () => {
      const matrix = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
      expect(matrix.getElements()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });
  });

  describe("identity", () => {
    it("returns identity matrix", () => {
      const identity = Matrix3x3.identity();
      expect(identity.getElements()).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);
    });
  });

  describe("inverse", () => {
    it("returns null for singular matrix", () => {
      const singularMatrix = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
      expect(singularMatrix.inverse()).toBeNull();
    });

    it("get correct inverse of non-singular matrix if the result of the multiplication is the identity", () => {
      const matrix = new Matrix3x3([
        [1, 2, -1],
        [2, 1, 2],
        [-1, 2, 1],
      ]);
      const inversedMatrix = matrix.inverse();
      const multiplyMatrixByItsInverse = matrix.multiply(inversedMatrix);
      expect(multiplyMatrixByItsInverse).toEqual(Matrix3x3.identity());
    });
  });

  describe("cofactorMatrix", () => {
    it("returns cofactor matrix", () => {
      const matrix = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
      const expectedCofactor = new Matrix3x3([
        [-3, 6, -3],
        [6, -12, 6],
        [-3, 6, -3],
      ]);
      const result = matrix.cofactorMatrix();

      expect(result).toEqual(expectedCofactor);
    });
  });

  describe("getMinorMatrix2x2", () => {
    it("returns the minor matrix for a 2x2 submatrix", () => {
      const matrix = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);

      // Test removing the first row and first column
      let minor = matrix.getMinorMatrix2x2(0, 0);
      expect(minor).toEqual([
        [5, 6],
        [8, 9],
      ]);

      // Test removing the second row and second column
      minor = matrix.getMinorMatrix2x2(1, 1);
      expect(minor).toEqual([
        [1, 3],
        [7, 9],
      ]);

      // Test removing the third row and third column
      minor = matrix.getMinorMatrix2x2(2, 2);
      expect(minor).toEqual([
        [1, 2],
        [4, 5],
      ]);
    });
  });

  describe("transpose", () => {
    it("returns transpose of matrix", () => {
      const matrix = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
      const expectedTranspose = new Matrix3x3([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
      expect(matrix.transpose()).toEqual(expectedTranspose);
    });
  });

  describe("isSingular", () => {
    it("returns true for determinant equal to 0", () => {
      const singularMatrix = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
      const determinant = singularMatrix.determinantOf3x3();
      const isSingular = singularMatrix.isSingular(determinant);
      expect(isSingular).toBe(true);
    });

    it("returns false for determinant not equal to 0", () => {
      const nonSingularMatrix = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 1],
      ]);
      const determinant = nonSingularMatrix.determinantOf3x3();
      const isSingular = nonSingularMatrix.isSingular(determinant);
      expect(isSingular).toBe(false);
    });
  });

  describe("determinantOf3x3()", () => {
    it("should correctly calculate the determinant of a 3x3 matrix", () => {
      const matrix = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);

      const determinant = matrix.determinantOf3x3();
      expect(determinant).toBe(0);
    });

    it("should correctly calculate the determinant of another 3x3 matrix", () => {
      const matrix = new Matrix3x3([
        [2, 0, 1],
        [1, 2, 3],
        [4, 5, 6],
      ]);
      const determinant = matrix.determinantOf3x3();
      expect(determinant).toBe(-9);
    });
  });

  describe("determinantOf2x2", () => {
    test("returns correct determinant for a 2x2 matrix", () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ];
      const determinant = Matrix3x3.determinantOf2x2(matrix);
      expect(determinant).toEqual(-2);
    });
  });

  describe("multiply())", () => {
    it("should correctly multiply two 3x3 matrices", () => {
      const matrix1 = new Matrix3x3([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
      const matrix2 = new Matrix3x3([
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1],
      ]);

      const result = matrix1.multiply(matrix2);
      expect(result.getElements()).toEqual([
        [30, 24, 18],
        [84, 69, 54],
        [138, 114, 90],
      ]);
    });
  });

  describe("transformPoint()", () => {
    //In general, for a 3x3 transformation matrix used in 2D transformations, the third row is typically [0, 0, 1].
    //This row is included to maintain compatibility with homogeneous coordinates, which are commonly used in computer graphics and geometric transformations.
    //The third row [0, 0, 1] is used to represent translations in homogeneous coordinates.
    //When performing transformations, including translations, it ensures that the transformation can be represented as a single matrix multiplication, making computations more efficient and consistent.
    // https://www.songho.ca/math/homogeneous/homogeneous.html
    // Homogeneous coordinates, introduced by August Ferdinand Möbius, make calculations of graphics and geometry possible in projective space.
    //Homogeneous coordinates are a way of representing N-dimensional coordinates with N+1 numbers.
    const homogeneousCoordonates = [0, 0, 1];

    it("should correctly transform a point/vector using a transformation matrix", () => {
      const transformationMatrix = new Matrix3x3([[1, 0, 2], [0, 1, 3], homogeneousCoordonates]);

      const point = new Vector2D(1, 1);
      const result = new Vector2D(1, 1);

      const transformedPoint = transformationMatrix.transformPoint(point);

      expect(transformedPoint).toEqual(result);
    });

    it("should correctly transform a point/vector using a transformation matrix", () => {
      const transformationMatrix = new Matrix3x3([[1, 3, 2], [4, 1, 3], homogeneousCoordonates]);

      const point = new Vector2D(1, 2);
      const result = new Vector2D(7, 6);

      const transformedPoint = transformationMatrix.transformPoint(point);

      expect(transformedPoint).toEqual(result);
    });
  });
});
