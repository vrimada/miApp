# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies (Cada proyecto Expo trae un package.json con librerías.)

   ```bash
   npm instal
   l
   ```
👉 Solo se hace una vez al principio (o cuando agregás librerías nuevas).

2. Start the app

   ```bash
   npx expo start
   ```
Esto:

levanta el servidor Expo

te muestra un QR para abrirlo en Expo Go en tu iPhone

te permite ver logs, errores, recargar, etc.

👉 Es el comando que vas a usar siempre que quieras programar.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Opciones para abrir la app
xpo te da varias formas, pero vos solo podés usar Expo Go porque estás en Windows y no tenés Xcode.

✔ Expo Go (tu opción posible)

Escaneás el QR con la cámara del iPhone

Se abre tu app dentro de la app Expo Go
## Donde Programo
En este proyecto la carpeta app/ ya trae una estructura especial:

👉 Usa file-based routing

Es decir:

app/index.tsx → es tu pantalla principal

app/otraPantalla.tsx → automáticamente otra ruta

app/vencimientos/nuevo.tsx → rutas anidadas

No tenés que configurar un router manualmente. Expo lo hace solo.

En tu caso, podés empezar tocando:

app/index.tsx


o crear tus pantallas dentro de app/.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

Si querés borrar todo lo que trae de ejemplo y arrancar desde cero:

npm run reset-project


Ese comando:

mueve los archivos de ejemplo a app-example/

crea un app/ limpio

👉 Solo hacelo si querés una estructura totalmente vacía.
## Learn more
Son útiles si querés profundizar:

Documentación completa

Tutorial paso a paso → muy recomendado

Pero no los necesitás para empezar ya mismo.
To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


Excelente pregunta, Vane 👏 —y muy importante, porque **esa es la gran diferencia** entre *probar tu app en Expo Go* y *tenerla instalada de verdad en tu iPhone*, sin depender del entorno de desarrollo.

Vamos paso a paso para que te quede clarísimo cómo hacerlo desde Windows 💪

---

## 🧩 Lo que tenés ahora

Tu app corre dentro de **Expo Go**, que actúa como un “contenedor” para tus proyectos React Native.
👉 Cuando la abrís, Expo Go descarga tu código desde tu PC o desde la nube, pero **no la instala realmente como una app independiente**.

Así que lo que queremos ahora es **crear un archivo .ipa (la app de iOS)** e **instalarla en tu iPhone directamente**, sin publicarla en App Store.

---

## ⚙️ OPCIONES REALES PARA INSTALAR TU APP EN iOS (sin App Store)

### 🥇 Opción 1 — **Usar Expo EAS Build (la más sencilla y oficial)**

Expo tiene su propio sistema de compilación en la nube: **EAS (Expo Application Services)**.
Ellos compilan por vos la app en sus servidores (que sí tienen macOS).

---

### 🔹 PASOS

#### 1️⃣ Registrate en Expo

Desde consola:

```bash
npx expo login
```

O creá tu cuenta gratis en [https://expo.dev/signup](https://expo.dev/signup).

---

#### 2️⃣ Configurá EAS en tu proyecto

En la raíz de tu app:

```bash
npx eas build:configure
```

Esto genera un archivo `eas.json` donde podés definir cómo compilar (debug/release, etc.).

---

#### 3️⃣ Ejecutá la build para iOS

```bash
npx eas build -p ios
```

Expo te preguntará si querés subir tus credenciales de Apple.
Podés usar una **cuenta gratuita de Apple Developer**, pero con una limitación importante 👇

> ⚠️ Con cuenta gratuita, solo podés instalar la app **en tu propio iPhone** (vía Xcode o TestFlight).
> Si querés distribuir a otros, necesitás la cuenta paga de Apple Developer (100 USD/año).

---

#### 4️⃣ Esperá que compile

Expo la compila en sus servidores macOS (esto puede tardar unos minutos).
Al terminar, te mostrará un enlace como:

```
✅ Build complete
👉 Download: https://expo.dev/artifacts/eas/xxxxx
```

Ahí tendrás tu **archivo .ipa (app de iOS)** listo para instalar.

---

### 🔹 5️⃣ Instalación en tu iPhone

Hay 3 formas de hacerlo:

#### ✅ Opción A: **Instalar con Diawi (recomendado para una sola app personal)**

1. Entrá a [https://www.diawi.com](https://www.diawi.com)
2. Subí el archivo `.ipa`.
3. Diawi te da un enlace tipo `https://i.diawi.com/abcd1234`.
4. Abrilo desde Safari en tu iPhone.
5. Tocá “Instalar” → y tu app quedará **instalada directamente** (como cualquier app normal).

*(iOS puede pedirte ir a Ajustes → General → Gestión de dispositivos → Confiar en el desarrollador)*

---

#### ✅ Opción B: **Instalar con Xcode (si tenés acceso a una Mac)**

Podés conectar tu iPhone por cable y compilar directamente desde Xcode (si en algún momento usás una Mac prestada o virtual).
Pero no es necesario en tu caso.

---

#### ✅ Opción C: **Instalar con AltStore**

Si querés hacerlo sin Mac ni web, podés usar **AltStore**, una tienda alternativa para instalar tus propias apps firmadas con tu Apple ID.
Sitio: [https://altstore.io/](https://altstore.io/)
(Es un poco más técnico, pero totalmente viable desde Windows.)



## 💡 Consejo final

Para tu caso (app personal, sin publicar), la mejor ruta es:

1. Desarrollar y probar en **Expo Go**.
2. Cuando esté lista, correr:

   ```bash
   npx eas build -p ios
   ```
3. Subir el `.ipa` a **Diawi** y descargarlo desde tu iPhone.
4. ¡Listo! App instalada ✅

