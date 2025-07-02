import { addLocale } from 'primereact/api';

export const setupPrimeReactLocale = () => {
  addLocale('pt', {
    firstDayOfWeek: 0,
    dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
      'Janeiro ', 'Fevereiro ', 'Março ', 'Abril ', 'Maio ', 'Junho ',
      'Julho ', 'Agosto ', 'Setembro ', 'Outubro ', 'Novembro ', 'Dezembro ',
    ],
    monthNamesShort: [
      'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
      'jul', 'ago', 'set', 'out', 'nov', 'dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
    chooseDate: 'Escolher data',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sm',
    weak: 'Fraco',
    medium: 'Médio',
    strong: 'Forte',
    passwordPrompt: 'Digite uma senha',
    emptyMessage: 'Nenhum resultado encontrado',
    emptyFilterMessage: 'Nenhum resultado encontrado',
  });
};
