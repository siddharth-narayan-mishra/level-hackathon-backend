require("dotenv").config();
const axios = require("axios");

const BASE_API_URL = process.env.BASE_API_URL;
const LANGFLOW_ID = process.env.LANGFLOW_ID;
const FLOW_ID = process.env.FLOW_ID;
const APPLICATION_TOKEN = process.env.APPLICATION_TOKEN;

async function runFlow(message) {
  const apiUrl = `${BASE_API_URL}/lf/${LANGFLOW_ID}/api/v1/run/${FLOW_ID}`;

  const payload = {
    input_value: message,
    output_type: "chat",
    input_type: "chat",
  };

  const headers = {
    Authorization: `Bearer ${APPLICATION_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(apiUrl, payload, { headers });
    const messageText =
      response.data.outputs[0].outputs[0].results.message.text;
    return messageText;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = runFlow;
