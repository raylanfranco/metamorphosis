import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // adjust if path differs

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      // Fetch logic
      res.status(200).json({ message: "GET successful!" });
      break;
    case "POST":
      // Create logic
      res.status(201).json({ message: "POST successful!" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
