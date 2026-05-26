// build lps table for kmp skip logic
function buildLps(pattern) {
  const lps = Array(pattern.length).fill(0);
  let prefixLen = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[prefixLen]) {
      prefixLen += 1;
      lps[i] = prefixLen;
      i += 1;
    } else if (prefixLen > 0) {
      prefixLen = lps[prefixLen - 1];
    } else {
      lps[i] = 0;
      i += 1;
    }
  }

  return lps;
}

// kmp — true if pattern appears in text
function kmpContains(text, pattern) {
  if (!pattern.length) {
    return true;
  }
  if (!text.length) {
    return false;
  }

  const lps = buildLps(pattern);
  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i += 1;
      j += 1;
      if (j === pattern.length) {
        return true;
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i += 1;
    }
  }

  return false;
}

// normalize entry to searchable text (username or uid)
function entryToSearchText(entry) {
  if (typeof entry === 'string') {
    return entry;
  }
  if (entry && typeof entry === 'object') {
    const username = entry.username ?? '';
    const uid = entry.uid ?? entry.id ?? '';
    return `${username} ${uid}`.trim();
  }
  return '';
}

// filter find-a-buddy list by search pattern
function filterMatches(entries, pattern) {
  if (!Array.isArray(entries)) {
    return [];
  }
  if (!pattern || typeof pattern !== 'string') {
    return [...entries];
  }

  const needle = pattern.toLowerCase();

  return entries.filter((entry) => {
    const haystack = entryToSearchText(entry).toLowerCase();
    return kmpContains(haystack, needle);
  });
}

module.exports = { filterMatches, kmpContains };
