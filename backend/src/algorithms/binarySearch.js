// percentile rank for a position in a sorted ascending array
function percentileAtIndex(index, length) {
  if (length <= 0) {
    return 0;
  }
  if (length === 1) {
    return 100;
  }
  return Math.round((index / (length - 1)) * 1000) / 10;
}

// divide and conquer — find exact index or nearest rank
function binarySearch(sortedScores, targetScore) {
  if (!Array.isArray(sortedScores) || sortedScores.length === 0) {
    return { index: -1, percentileRank: 0 };
  }

  let left = 0;
  let right = sortedScores.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midScore = sortedScores[mid];

    if (midScore === targetScore) {
      return {
        index: mid,
        percentileRank: percentileAtIndex(mid, sortedScores.length),
      };
    }

    if (midScore < targetScore) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // no exact match — pick closest score for percentile
  const n = sortedScores.length;
  let nearestIndex = left;

  if (left >= n) {
    nearestIndex = n - 1;
  } else if (left > 0) {
    const distLeft = Math.abs(sortedScores[left - 1] - targetScore);
    const distRight = Math.abs(sortedScores[left] - targetScore);
    nearestIndex = distLeft <= distRight ? left - 1 : left;
  }

  return {
    index: -1,
    percentileRank: percentileAtIndex(nearestIndex, n),
  };
}

module.exports = { binarySearch };
