import axios from "axios";
import { FetchError } from "../utils/errors";

interface platformsApiType {
  id: string;
  name: string;
}

export default async function getPlatformsController() {
  let platforms: platformsApiType[] = [];

  const platformsApi1 = (
    await axios.get(`/platforms?key=${process.env.API_KEY}&page=1&ordering=id`)
  ).data;

  const platformsApi2 = (
    await axios.get(`/platforms?key=${process.env.API_KEY}&page=2&ordering=id`)
  ).data;

  if (!platformsApi1 || !platformsApi2)
    throw new FetchError("Error to fetch platforms data", 404);

  platformsApi1.results.forEach((platform: platformsApiType) =>
    platforms.push({ id: platform.id, name: platform.name })
  );

  platformsApi2.results.forEach((platform: platformsApiType) =>
    platforms.push({ id: platform.id, name: platform.name })
  );

  return platforms;
}
