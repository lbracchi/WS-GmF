import axios from "axios";

export default {
  async getLocationCoordinates(location: string) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: { address: location, key: process.env.VUE_APP_MAPS_API_KEY },
    });
  },

  // https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&key=AIzaSyAa30oqoeorf38Qsx5Nmv4g8GFhJFuP-wM
};