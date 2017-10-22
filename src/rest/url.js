const URL = () => "http://zssn-backend-example.herokuapp.com";

export const tradeURL = (id) => URL().concat("/api/people/", id, "/properties/trade_item.json");
export const propertiesURL = (id) => URL().concat("/api/people/", id,"/properties.json");

export const personURL = () => URL().concat("/api/people.json");
export const infectedURL = (id) => URL().concat("/api/people/", id, "/report_infection.json");
export const personIdURL = (id) => URL().concat("/api/people/", id, ".json");

export const getInfectedURL = () => URL().concat("/api/report/infected.json");
export const getNonInfectedURL = () => URL().concat("/api/report/non_infected.json");
export const getInventoryURL = () => URL().concat("/api/report/people_inventory.json");
export const getInfectedPointsURL = () => URL().concat("/api/report/infected_points.json");
export const getAvailableReportsURL = () => URL().concat("/api/report.json");

export default URL;
