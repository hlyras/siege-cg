User.empire = {};

User.empire.set = async (empire_id) => {
  let response = await fetch(`/user/empire/set/${empire_id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};