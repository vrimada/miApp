import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { supabase } from "./supabase/client";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;

      if (!session) {
        router.replace("/login" as any);
      } else {
        router.replace("/(tabs)" as any);
      }
    });

    // Escuchar cambios
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/login" as any);
      } else {
        router.replace("/(tabs)" as any);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
