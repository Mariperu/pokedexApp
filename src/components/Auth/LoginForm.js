import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import { useFormik } from "formik"; //maneja formularios
import * as Yup from "yup"; //valida campos de formularios
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");

  //destructurando, solo login
  const { login } = useAuth();
  //console.log(useAuth());

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()), // validación de inputs
    validationOnChange: false, // false: muestra errores después de presionar botón enviar, no desde inicio
    onSubmit: ({ username, password }) => {
      setError(""); //setea el valor de error
      if (username !== user.username || password !== user.password) {
        setError("El usuario o contraseña no son correctos");
      } else {
        login(userDetails);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Log in</Text>

      <TextInput
        placeholder="User name"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        //"username" se reeemplaza por nuevo texto
        onChangeText={(text) => formik.setFieldValue("username", text)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        //"password" se reeemplaza por nuevo texto
        onChangeText={(text) => formik.setFieldValue("password", text)}
      ></TextInput>

      <Button style={styles.btn} title="Enter" onPress={formik.handleSubmit} />

      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>

      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 25,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});
