function parseMonto  (valor: string): number  {
  return round2( Number(
    valor
      .replace(/\./g, '') // elimina separador de miles
      .replace(',', '.')  // convierte decimal a formato JS
  ));
};
function round2  (n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
};

export { parseMonto, round2 };

