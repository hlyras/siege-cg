const Empire = {};

Empire.filter = async (empire) => {
  let empires = await fetch("/empire/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(empire)
  });
  empires = await empires.json();

  if (API.verifyResponse(empires)) { return false };

  return empires;
};