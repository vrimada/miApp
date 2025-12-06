import * as Notifications from "expo-notifications";

export async function programarNotificacionSeguro(titulo: string, cuerpo: string, fecha?: Date) {
  const isExpoGo = true; // como estás usando Expo Go

  if (isExpoGo) {
    return Notifications.scheduleNotificationAsync({
      content: { title: titulo, body: cuerpo },
      trigger: {
        type: "timeInterval",
        seconds: 1,
        repeats: false,
      } as any,
    });
  }

  if (fecha) {
    return Notifications.scheduleNotificationAsync({
      content: { title: titulo, body: cuerpo },
      trigger: {
        type: "calendar",
        year: fecha.getFullYear(),
        month: fecha.getMonth() + 1,
        day: fecha.getDate(),
        hour: fecha.getHours(),
        minute: fecha.getMinutes(),
        second: 0,
        repeats: false,
      } as any,
    });
  }

  return Notifications.scheduleNotificationAsync({
    content: { title: titulo, body: cuerpo },
    trigger: {
      type: "timeInterval",
      seconds: 5,
      repeats: false,
    } as any,
  });
}
