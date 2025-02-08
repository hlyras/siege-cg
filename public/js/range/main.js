const Range = {};

Range.filter = async (range) => {
  let ranges = await fetch("/range/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(range)
  });
  ranges = await ranges.json();

  if (API.verifyResponse(ranges)) { return false };

  return ranges;
};