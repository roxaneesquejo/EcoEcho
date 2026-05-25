// swap two indices in place
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// restore max-heap at i, ordered by total_xp
function heapify(arr, heapSize, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < heapSize && arr[left].total_xp > arr[largest].total_xp) {
    largest = left;
  }
  if (right < heapSize && arr[right].total_xp > arr[largest].total_xp) {
    largest = right;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, heapSize, largest);
  }
}

// build max-heap from the array
function buildMaxHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    heapify(arr, n, i);
  }
}

// sort users by total_xp descending (id, username, total_xp)
function heapSort(users) {
  if (!Array.isArray(users) || users.length <= 1) {
    return Array.isArray(users) ? [...users] : [];
  }

  const arr = users.map((user) => ({ ...user }));
  const n = arr.length;

  buildMaxHeap(arr);

  for (let end = n - 1; end > 0; end -= 1) {
    swap(arr, 0, end);
    heapify(arr, end, 0);
  }

  // heap pass is ascending — flip for leaderboard
  return arr.reverse();
}

module.exports = { heapSort };
