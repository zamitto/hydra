export const steamUrlBuilder = {
  library: (objectID: string) =>
    `https://steamcdn-a.akamaihd.net/steam/apps/${objectID}/header.jpg`,
  libraryHero: (objectID: string) =>
    `https://steamcdn-a.akamaihd.net/steam/apps/${objectID}/library_hero.jpg`,
  logo: (objectID: string) =>
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${objectID}/logo.png`,
};

export const formatDownloadProgress = (progress?: number) => {
  if (!progress) return "0%";
  const progressPercentage = progress * 100;

  if (Number(progressPercentage.toFixed(2)) % 1 === 0)
    return `${Math.floor(progressPercentage)}%`;

  return `${progressPercentage.toFixed(2)}%`;
};

export const getSteamLanguage = (language: string) => {
  if (language.startsWith("pt")) return "brazilian";
  if (language.startsWith("es")) return "spanish";
  if (language.startsWith("fr")) return "french";
  return "english";
};
