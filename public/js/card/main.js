const Card = {};

Card.create = async (card) => {
  let response = await fetch("/card/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};

Card.filter = async (card) => {
  let cards = await fetch("/card/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card)
  });
  cards = await cards.json();

  if (API.verifyResponse(cards)) { return false };

  return cards;
};