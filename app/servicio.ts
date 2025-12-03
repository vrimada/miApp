
type Servicio = {
    id: string;
    nombre: string;
    fechaISO: string;
    fechaDisplay: string;
    monto: string;
    pagado: boolean;
  };

     /**
   * Rojo → vencido
   * Naranja → vence hoy
   * Verde → futuro
   */
  
    const getColorForDate = (fechaISO: string) => {
    const hoy = new Date().toISOString().split("T")[0];
  
    if (fechaISO < hoy) return "red";       // Vencido
    if (fechaISO === hoy) return "orange";  // Hoy
    return "green";                          // Futuro
  };

  function filtrarPorMes(lista: Servicio[], mes: number, anioActual: number) {
  return lista.filter((s) => {
    const [anio, m] = s.fechaISO.split("-");
    return Number(m) === mes && Number(anio) === anioActual;
  });
}

 const Meses: Record<number, string> = {
        1: "Enero", 
        2: "Febrero",
        3: "Marzo",
        4: "Abril",
        5: "Mayo",
        6: "Junio",
        7: "Julio",
        8: "Agosto",
        9: "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre"
    };
    export { filtrarPorMes, getColorForDate, Meses, Servicio };

