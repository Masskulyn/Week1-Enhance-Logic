class Graph {
  // Implementasi graph dan metode DFS
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1); // Karena graph tidak berarah
  }
  shortestPath(start, end) {
    const visited = new Set();
    const queue = [start];
    const distances = { [start]: 0 };
    visited.add(start);
    while (queue.length > 0) {
      const current = queue.shift();
      if (current === end) {
        return distances[current];
      }
      for (const neighbor of this.adjacencyList[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          distances[neighbor] = distances[current] + 1;
          queue.push(neighbor);
        }
      }
    }
    return -1; // Jika tidak ada jalur ditemukan
  }
}

function islandCount(grid) {
  // Implementasi DFS untuk menghitung jumlah pulau
  const visited = new Set();
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1], // kanan
    [1, 0], // bawah
    [0, -1], // kiri
    [-1, 0], // atas
  ];
  function dfs(r, c) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      grid[r][c] === 0 ||
      visited.has(`${r},${c}`)
    ) {
      return;
    }
    visited.add(`${r},${c}`);
    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc);
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1 && !visited.has(`${r},${c}`)) {
        dfs(r, c);
        count++;
      }
    }
  }
  return count;
}

// Testcase 1
console.log(
  islandCount([
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ])
); // Expected Output: 1

// Testcase 2
console.log(
  islandCount([
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1],
  ])
); // Expected Output: 3

// Testcase 3
console.log(
  islandCount([
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 1, 1],
  ])
); // Expected Output: 5

// Testcase 4
console.log(
  islandCount([
    [1, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
  ])
); // Expected Output: 4

// Testcase 5
console.log(
  islandCount([
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ])
); // Expected Output: 6

// Testcase 6
console.log(
  islandCount([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [1, 1, 0, 0, 0],
  ])
); // Expected Output: 2

// Testcase 7
console.log(
  islandCount([
    [1, 1, 1],
    [0, 0, 0],
    [1, 0, 1],
  ])
); // Expected Output: 3
