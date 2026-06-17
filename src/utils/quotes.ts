export interface Quote {
  hi: string;
  en: string;
}

export const quotes: Quote[] = [
  {
    hi: "Aaj ka effort kal ki success banega.",
    en: "Keep going future Software Engineer.",
  },
  {
    hi: "Har din thoda better bano.",
    en: "Consistency beats talent.",
  },
  {
    hi: "Dream big.",
    en: "Code bigger.",
  },
  {
    hi: "Mehnat aaj karo,",
    en: "Result kal tumhare naam hoga.",
  },
  {
    hi: "Ruko mat, chalte raho.",
    en: "Every line of code takes you closer to your dream job.",
  },
  {
    hi: "Safalta ka raaz hai practice.",
    en: "The secret of success is practice.",
  },
  {
    hi: "Ek bug solve karna seekho,",
    en: "Aur zindagi ke har problem ko solve kar paoge.",
  },
  {
    hi: "Top companies tumhara intezaar kar rahi hain.",
    en: "Make every study session count.",
  },
  {
    hi: "Focus ka power tumhe aage le jayega.",
    en: "Deep work creates deep results.",
  },
  {
    hi: "Bade sapne dekhne wale hi itihaas badalte hain.",
    en: "Those who dream big change the world.",
  },
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
