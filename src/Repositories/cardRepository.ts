import { Cards } from "@prisma/client";

import prisma from "../config/database.js";

export async function insert(data: Cards){
  await prisma.cards.create({
    data
  });
};

