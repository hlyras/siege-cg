const Deck = {};

Deck.create = async (deck) => {
  let response = await fetch("/deck/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deck)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};

Deck.filter = async (deck) => {
  let decks = await fetch("/deck/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deck)
  });
  decks = await decks.json();

  if (API.verifyResponse(decks)) { return false };

  return decks;
};