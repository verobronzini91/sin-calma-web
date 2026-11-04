/** Minúsculas y sin tildes: "fotógrafa" encuentra "fotografa" y al revés */
export const normalizeSearch = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
