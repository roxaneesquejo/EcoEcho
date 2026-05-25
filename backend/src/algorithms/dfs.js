// neighbors for a tier id (handles string keys from json)
function getNeighbors(tierId, adjacencyList) {
  if (tierId in adjacencyList) {
    return adjacencyList[tierId];
  }
  const key = String(tierId);
  return adjacencyList[key] ?? [];
}

// true if target tier is reachable from current via adjacency list
function hasProgressionPath(currentTierId, targetTierId, adjacencyList) {
  if (currentTierId === targetTierId) {
    return true;
  }

  if (!adjacencyList || typeof adjacencyList !== 'object') {
    return false;
  }

  const visited = new Set();

  function dfs(node) {
    if (node === targetTierId || String(node) === String(targetTierId)) {
      return true;
    }

    const visitKey = String(node);
    // cycle check
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
