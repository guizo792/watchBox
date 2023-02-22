const AuthorizationHeader = () => {
  //get token from session storag
  //console.log("before parse");
  const token = localStorage.getItem("token");
  if (token !== undefined) {
    console.log({ Authorization: "Bearer " + token });
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};

export { AuthorizationHeader };
