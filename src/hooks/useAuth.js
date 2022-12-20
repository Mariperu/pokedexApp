import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default () => useContext(AuthContext);
//accede al contexto, extrae el valor y lo muestra
