import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from "../../lib/database";
import { User } from 'src/models/User';
import { getSession } from 'next-auth/react';
import {Incident} from "src/models/Incident";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const fs = new Database();
  const session = await getSession({ req });
  // const username = session?.user?.name || '';
  // if (!username) {
  //   return res.status(200).send({ username, completedMissions: [] });
  // }

  const incidents = await fs.listIncidents()
  res.status(200).json(incidents)
}
