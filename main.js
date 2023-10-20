class Knight {
  constructor() {
    this.directions = [
      [-1, 2],
      [1, 2],
      [-1, -2],
      [1, -2],
      [-2, 1],
      [-2, -1],
      [2, 1],
      [2, -1],
    ];
  }

  knightMoves(start, end) {
    if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
      return null;
    }
    const target = `${end}`;
    const visited = new Map().set(`${start}`, null);
    let queue = [start];
    while (queue.length) {
      if (visited.has(target)) {
        let point = end;
        const path = [];
        while (point) {
          path.push(point);
          point = visited.get(point.join(","));
        }
        return path.reverse();
      }
      const next = [];
      for (const [currentX, currentY] of queue) {
        const viableMoves = this.directions
          .map(([dx, dy]) => [currentX + dx, currentY + dy])
          .filter(
            ([x, y]) =>
              x >= 0 &&
              y >= 0 &&
              x <= 7 &&
              y <= 7 &&
              !visited.has(`${x},${y}`) &&
              visited.set(`${x},${y}`, [currentX, currentY]),
          );
        next.push(...viableMoves);
      }
      queue = next;
    }
  }
}

const knight = new Knight();
console.log(knight.knightMoves([3, 3], [4, 3]));
