// servicios/ServicioParaFeedback.ts
import { Alert, ToastAndroid, Platform } from "react-native";

export const ServicioParaFeedback = {
  mostrarError: (mensaje: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(mensaje, ToastAndroid.LONG);
    } else {
      Alert.alert("Error", mensaje);
    }
  },

  mostrarExito: (mensaje: string) => {
    console.log("Éxito:", mensaje);
    // Lógica para mostrar un aviso de transferencia completada
  },
};
