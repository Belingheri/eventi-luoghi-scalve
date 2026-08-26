// Utility di formattazione date sempre in formato Italiano / Europeo (GG/MM/AAAA)

const IT_MONTHS_SHORT = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];
const IT_MONTHS_FULL = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

/**
 * Converte 'YYYY-MM-DD' in 'DD/MM/YYYY' (es: '2026-09-12' -> '12/09/2026')
 */
export function formatEuropeanDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return dateStr;
}

/**
 * Converte 'YYYY-MM-DD' in '12 Settembre 2026'
 */
export function formatFullItalianDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const monthIdx = parseInt(month, 10) - 1;
    const monthName = IT_MONTHS_FULL[monthIdx] || month;
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  }
  return dateStr;
}

/**
 * Estrae { day: '12', monthShort: 'SET', year: '2026' }
 */
export function getItalianDateParts(dateStr) {
  if (!dateStr) return { day: '12', monthShort: 'SET', year: '2026' };
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const monthIdx = parseInt(month, 10) - 1;
    return {
      day: parseInt(day, 10).toString(),
      monthShort: IT_MONTHS_SHORT[monthIdx] || month,
      year
    };
  }
  return { day: '12', monthShort: 'SET', year: '2026' };
}
