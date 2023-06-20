import { prisma } from "../server";
import { VisitedMap } from "../../globals";

export async function fetchVisitedMap(firebase_uuid: string) {
  const visitedMap = await prisma.visited_map.findMany({
    where: {
      firebase_uuid,
    },
  });

  return visitedMap;
}

export async function createVisitedMap(data: VisitedMap) {
  const { visited_coords, visited_name, visited_descr, firebase_uuid } = data;
  console.log("data", data);
  await prisma.visited_map.create({
    data: {
      visited_coords,
      visited_name,
      visited_descr,
      firebase_uuid,
    },
  });

  return;
}
