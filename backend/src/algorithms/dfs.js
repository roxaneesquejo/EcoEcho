/**
 * Adjacency list keyed by tier id (number or string).
 * @typedef {Record<string | number, (number | string)[]>} TierAdjacencyList
 */

/**
 * @param {number | string} tierId
 * @param {TierAdjacencyList} adjacencyList
 * @returns {(number | string)[]}
 */
function getNeighbors(tierId, adjacencyList) {
  if (tierId in adjacencyList) {
    return adjacencyList[tierId];
  }
  const key = String(tierId);
  return adjacencyList[key] ?? [];
}

/**
 * Depth-first search: returns true if a path exists from currentTierId to targetTierId.
 * @param {number | string} currentTierId
 * @param {number | string} targetTierId
 * @param {TierAdjacencyList} adjacencyList
 * @returns {boolean}
 */
function hasProgressionPath(currentTierId, targetTierId, adjacencyList) {
  if (currentTierId === targetTierId) {
    return true;
  }

  if (!adjacencyList || typeof adjacencyList !== 'object') {
    return false;
  }

  const visited = new Set();

  /**
   * @param {number | string} node
   * @returns {boolean}
   */
  function dfs(node) {
    if (node === targetTierId || String(node) === String(targetTierId)) {
      return true;
    }

    const visitKey = String(node);
    if (visited.has(visitKey)) {
      return false;
    }
    visited.add(visitKey);

    for (const neighbor of getNeighbors(node, adjacencyList)) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    return false;
  }

  return dfs(currentTierId);
}

module.exports = { hasProgressionPath };
