// pages/api/lifts/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const lifts = await prisma.lift.findMany();
      res.status(200).json(lifts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lifts", error });
    }
  } else if (req.method === "POST") {
    const { name, category, muscleGroup } = req.body;

    if (!name || !category || !muscleGroup) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const lift = await prisma.lift.create({
        data: {
          name,
          category,
          muscleGroup,
        },
      });
      res.status(201).json(lift);
    } catch (error) {
      res.status(500).json({ message: "Failed to create lift", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
