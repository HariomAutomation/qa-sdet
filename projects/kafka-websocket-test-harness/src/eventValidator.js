/**
 * Validates sequential order and causal timestamp integrity of events.
 */
export function validateEventSequence(events, expectedSequence) {
  let currentIndex = 0;

  for (const event of events) {
    if (event.type === expectedSequence[currentIndex]) {
      currentIndex++;
      if (currentIndex === expectedSequence.length) break;
    }
  }

  return {
    valid: currentIndex === expectedSequence.length,
    matchedCount: currentIndex,
    expectedCount: expectedSequence.length,
  };
}
