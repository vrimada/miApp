### Instalar

  ```bash
npx expo install expo-notifications expo-device expo-sqlite
```
🧩 expo-notifications: maneja permisos y muestra notificaciones

🧩 expo-device: detecta si estás en dispositivo físico (no funciona igual en simuladores)

🧩 expo-sqlite: guarda los datos localmente (una mini base SQLite en tu iPhone)

## Instalar AsyncStorage
  ```bash
npx expo install @react-native-async-storage/async-storage
  ```

## Fetch
 ```bash
npm install express node-fetch body-parser
 ```

 # Development Build iOS con EAS
 ### Para generar el compilado
  ```bash
 npm install -g eas-cli
```

### Logueate en Expo
```bash
eas login
```
### Inicializá EAS en tu proyecto

Solo si nunca lo hiciste:
```bash

eas build:configure
```
Esto te genera el archivo eas.json.

### . Editá eas.json para activar el development build

En el bloque "build" agregás:
```bash
{
  "build":
   {
    "development": 
    {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```
Si ya existe "development", solo asegurate de que tenga eso.

### Ejecutá el build

Esto lo manda a los servidores de Expo:
``` bash
eas build --platform ios --profile development
```

✨ No necesitás Mac.
✨ Expo se encarga de compilar todo por vos.

✅ 6. Cuando termine, te da un link

Ese link descarga un .ipa.

Peeeero…
En iOS no podés instalar el IPA directamente. Necesitás usar Expo Go Development Client mediante:

QR

o instalándolo con Apple TestFlight automáticamente.

Pero EAS mismo te guía. Te va a preguntar:

“¿Querés usar una cuenta de Apple para manejar certificados?”
→ Le ponés Yes.

“¿Querés que Expo genere todo automáticamente?”
→ Sí, dejá que lo haga. Te evita mil quilombos.

✅ 7. Una vez generado, podés instalarlo en tu iPhone

El método más simple:

EAS te da un link

lo abrís desde Safari en tu iPhone

y te instala el development client automáticamente vía TestFlight.

🎉 ¿Y después qué?

Una vez que tenés el development client instalado:

corrés tu app con:

npx expo start --dev-client


Escaneás el QR desde el teléfono

¡Y listo! Tu app se abre nativa, sin las limitaciones del Expo Go común.