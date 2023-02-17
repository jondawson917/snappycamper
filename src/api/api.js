const axios = require("axios").default;

class CampingApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const BASE_URL = process.env.NODE_ENV === 'production' ?  "https://snappycamper.herokuapp.com" : "http://localhost:3001";

    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { authorization: `Bearer ${CampingApi.token}` };
    const params = method === "get" ? data : {};

    console.log("URL", `${url}`);
    console.log("Data", data);
    console.debug("Params", params);
    console.log("Headers", headers);

    try {
      console.log("Trying...");
      return await axios({ url, method, data, params, headers });
    } catch (err) {
      let message = err.response.data.error.message;
      if (message.includes("Duplicate camp")) {
        return message.split("ID: ");
      }
      console.error("API Error:", err.stack);

      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /*Get a list of alerts */

  static async login(data) {
    console.log("Inside Login", data);
    let res = await this.request(`auth/token`, data, "post");
    return res;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");

    return res.data.token;
  }
  static async getCurrentUser(username) {
    console.log("Inside getCurrentUser", username);
    let res = await this.request(`users/${username}`);
    return res.data.user;
  }

  static async updateUserInfo(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res;
  }
  static async addCamp(data) {
    console.log("Inside add Camps", data);
    let res = await this.request(`camps`, data, "post");
    return res;
  }
  static async getCamp(parkCode) {
    console.log("Inside get camp function:", parkCode);
    let res = await this.request(`camps/${parkCode}`);
    return res.data;
  }
  static async reserve(user_id, camp_id) {
    console.log("Inside reserve camp function");
    console.log("User ID:", user_id, "Camp_ID:", camp_id);
    await this.request(`users/${user_id}/camps/${camp_id}`, {}, "post");
  }

static async removeReservation(user_id, camp_id){
  console.log("Inside removal function", user_id, camp_id);
  await this.request(`users/${user_id}/camps/${camp_id}/remove`, {}, 'delete');
}
}



export default CampingApi
