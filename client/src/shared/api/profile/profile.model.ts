import { paths } from "../schema";

export type ProfileRequestModel = 
  paths['/api/me']['put']['requestBody']['content']['multipart/form-data'];

export type ProfileResponse =
  paths['/api/me']['get']['responses']['200']['content']['application/json'];