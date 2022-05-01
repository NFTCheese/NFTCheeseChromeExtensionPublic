import axios from "axios";
import { SERVER_DOMAIN } from "../utils/api";
export const backend_api = axios.create({
  baseURL: `${SERVER_DOMAIN}/api`,
  headers: {
    "Content-type": "application/json"
  }
});
