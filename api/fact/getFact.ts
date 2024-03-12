
export const getFact = () => fetch('https://catfact.ninja/fact').then((res) => res.json());