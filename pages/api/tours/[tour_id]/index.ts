import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../middleware/database";

export default nc<NextApiRequest, NextApiResponse>();
