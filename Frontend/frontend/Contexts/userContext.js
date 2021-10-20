import { createContext, useMemo, useState } from "react";
import { userResponse } from "../components/GraphQL/classes/userResponse";
var user;
function setUser(i) {
  user = i;
}
export const value = useMemo(() => ({ user, setUser }), [user, setUser]);
export const UserContext = createContext(value);
