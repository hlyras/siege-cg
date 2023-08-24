const User = {};

User.get = async () => {
  let response = await fetch(`/user/get`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false; }

  return response.user;
};