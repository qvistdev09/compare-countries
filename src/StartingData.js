const startingCountries = [
  {
    name: 'Sweden',
    topLevelDomain: ['.se'],
    alpha2Code: 'SE',
    alpha3Code: 'SWE',
    callingCodes: ['46'],
    capital: 'Stockholm',
    altSpellings: ['SE', 'Kingdom of Sweden', 'Konungariket Sverige'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 9894888,
    latlng: [62, 15],
    demonym: 'Swedish',
    area: 450295,
    gini: 25,
    timezones: ['UTC+01:00'],
    borders: ['FIN', 'NOR'],
    nativeName: 'Sverige',
    numericCode: '752',
    currencies: [{ code: 'SEK', name: 'Swedish krona', symbol: 'kr' }],
    languages: [
      {
        iso639_1: 'sv',
        iso639_2: 'swe',
        name: 'Swedish',
        nativeName: 'svenska',
      },
    ],
    translations: {
      de: 'Schweden',
      es: 'Suecia',
      fr: 'Suède',
      ja: 'スウェーデン',
      it: 'Svezia',
      br: 'Suécia',
      pt: 'Suécia',
      nl: 'Zweden',
      hr: 'Švedska',
      fa: 'سوئد',
    },
    flag: 'https://restcountries.eu/data/swe.svg',
    regionalBlocs: [
      {
        acronym: 'EU',
        name: 'European Union',
        otherAcronyms: [],
        otherNames: [],
      },
    ],
    cioc: 'SWE',
  },
  {
    name: 'Zambia',
    topLevelDomain: ['.zm'],
    alpha2Code: 'ZM',
    alpha3Code: 'ZMB',
    callingCodes: ['260'],
    capital: 'Lusaka',
    altSpellings: ['ZM', 'Republic of Zambia'],
    region: 'Africa',
    subregion: 'Eastern Africa',
    population: 15933883,
    latlng: [-15, 30],
    demonym: 'Zambian',
    area: 752612,
    gini: 54.6,
    timezones: ['UTC+02:00'],
    borders: ['AGO', 'BWA', 'COD', 'MWI', 'MOZ', 'NAM', 'TZA', 'ZWE'],
    nativeName: 'Zambia',
    numericCode: '894',
    currencies: [{ code: 'ZMW', name: 'Zambian kwacha', symbol: 'ZK' }],
    languages: [
      {
        iso639_1: 'en',
        iso639_2: 'eng',
        name: 'English',
        nativeName: 'English',
      },
    ],
    translations: {
      de: 'Sambia',
      es: 'Zambia',
      fr: 'Zambie',
      ja: 'ザンビア',
      it: 'Zambia',
      br: 'Zâmbia',
      pt: 'Zâmbia',
      nl: 'Zambia',
      hr: 'Zambija',
      fa: 'زامبیا',
    },
    flag: 'https://restcountries.eu/data/zmb.svg',
    regionalBlocs: [
      {
        acronym: 'AU',
        name: 'African Union',
        otherAcronyms: [],
        otherNames: [
          'الاتحاد الأفريقي',
          'Union africaine',
          'União Africana',
          'Unión Africana',
          'Umoja wa Afrika',
        ],
      },
    ],
    cioc: 'ZAM',
  },
  {
    name: 'India',
    topLevelDomain: ['.in'],
    alpha2Code: 'IN',
    alpha3Code: 'IND',
    callingCodes: ['91'],
    capital: 'New Delhi',
    altSpellings: ['IN', 'Bhārat', 'Republic of India', 'Bharat Ganrajya'],
    region: 'Asia',
    subregion: 'Southern Asia',
    population: 1295210000,
    latlng: [20, 77],
    demonym: 'Indian',
    area: 3287590,
    gini: 33.4,
    timezones: ['UTC+05:30'],
    borders: ['AFG', 'BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK', 'LKA'],
    nativeName: 'भारत',
    numericCode: '356',
    currencies: [{ code: 'INR', name: 'Indian rupee', symbol: '₹' }],
    languages: [
      { iso639_1: 'hi', iso639_2: 'hin', name: 'Hindi', nativeName: 'हिन्दी' },
      {
        iso639_1: 'en',
        iso639_2: 'eng',
        name: 'English',
        nativeName: 'English',
      },
    ],
    translations: {
      de: 'Indien',
      es: 'India',
      fr: 'Inde',
      ja: 'インド',
      it: 'India',
      br: 'Índia',
      pt: 'Índia',
      nl: 'India',
      hr: 'Indija',
      fa: 'هند',
    },
    flag: 'https://restcountries.eu/data/ind.svg',
    regionalBlocs: [
      {
        acronym: 'SAARC',
        name: 'South Asian Association for Regional Cooperation',
        otherAcronyms: [],
        otherNames: [],
      },
    ],
    cioc: 'IND',
  },
];

export default startingCountries;
