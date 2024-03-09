import axios from "axios";
import { FetchError } from "../utils/errors";

export default async function getPlatformsController() {
  let platforms: string[] = [];

  const platformsApi1 = (
    await axios.get(`/platforms?key=${process.env.API_KEY}&page=1`)
  ).data;

  const platformsApi2 = (
    await axios.get(`/platforms?key=${process.env.API_KEY}&page=2`)
  ).data;

  if (!platformsApi1 || !platformsApi2)
    throw new FetchError("Error to fetch platforms data", 404);

  platformsApi1.results.forEach((platform: { name: string }) =>
    platforms.push(platform.name)
  );

  platformsApi2.results.forEach((platform: { name: string }) =>
    platforms.push(platform.name)
  );

  return platforms;
}
