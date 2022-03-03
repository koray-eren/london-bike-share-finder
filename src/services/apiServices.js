export async function getBikePoints(apiKey) {
  const axios = require('axios').default;
  const bikePointsUrl = 'https://api.tfl.gov.uk/BikePoint/'

  const response = await axios.get(bikePointsUrl, {
      params: {
        app_key: apiKey
      }
    })
    console.log('=== API CALL DONE ===')
    return response.data;
}