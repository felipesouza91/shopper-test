import { api } from "../utils/api";

async function findAllDriver() {
  return await api.get('/drivers')
}


export { findAllDriver };
