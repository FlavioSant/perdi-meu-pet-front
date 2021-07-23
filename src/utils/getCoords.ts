export const getCoords = async () => {
  const { coords }: GeolocationPosition = await new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });

  return { latitude: coords.latitude, longitude: coords.longitude };
};
