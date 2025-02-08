const User = {};

User.update = async (user) => {
  let response = await fetch("/user/update", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};

User.filter = async (user) => {
  let response = await fetch("/user/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};