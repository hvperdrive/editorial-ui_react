// eslint-disable-next-line max-len
export const setActiveLanguage = (languages, index) => languages.map((l, i) => ({ name: l.key, active: index === i }));
