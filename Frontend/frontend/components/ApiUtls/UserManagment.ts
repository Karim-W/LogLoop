import axios from "axios";
export async function LoginUser(Email: String, Pass: String) {
  var data = JSON.stringify({
    email: "karim.wael@gmail.com",
    pass: "pass",
  });

  var config = {
    method: "post",
    url: "https://localhost:5001/api/user/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  } as any;

  const res = await axios(config);

  return res;
}
