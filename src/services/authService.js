const TOKEN_KEY = "auth_token";

export function login(email, password) {
  const doLogin = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.ok) {
      return response.json(); // Get JSON value from the response body
    }
    throw new Error("*** PHP file not found");
  };

  return doLogin()
    .then((data) => {
      if (data.success) {
        const authToken = data.token;
        localStorage.setItem(TOKEN_KEY, authToken);
        return true;
      } else {
        return false;
      }
    })
    .catch(() => false);
}

export async function logout() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem(TOKEN_KEY)
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch("http://127.0.0.1:8000/api/v1/logout", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      localStorage.removeItem(TOKEN_KEY);
    })
    .catch((error) => console.log("error", error));
}

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}
