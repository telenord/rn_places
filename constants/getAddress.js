import { REACT_APP_GEO_API_KEY } from 'react-native-dotenv';


const getAddress = async (lat, lng) => {
  const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${REACT_APP_GEO_API_KEY}&q=${lat}%2C${lng}&pretty=1&no_annotations=1`);
  const { results } = await res.json();

  return results[0]['formatted'] || 'address';
};

export default getAddress;