/**
 * @typedef {{ id: number, username: string, total_xp: number }} User
 */

/**
 * @param {User[]} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * Restore max-heap property for subtree rooted at index i.
 * @param {User[]} arr
 * @param {number} heapSize
 * @param {number} i
 */
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

/**
 * Build a max-heap ordered by total_xp.
 * @param {User[]} arr
 */
function buildMaxHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    heapify(arr, n, i);
  }
}

/**
 * Max-heap sort: returns users sorted by total_xp descending.
 * @param {User[]} users
 * @returns {User[]}
 */
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

  return arr.reverse();
}

module.exports = { heapSort };
