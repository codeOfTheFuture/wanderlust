import { hash } from "bcryptjs";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../lib/mongodb";

export default nextConnect<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    const { email, password } = req.body;

    // Validate
    if (!email || !email.includes("@") || !password) {
      res.status(400).json({ message: "Invalid Data" });
    }

    // Connect with database
    const { db } = await connectToDatabase();

    const checkExisting = await db
      .collection("users")
      .findOne({ email: email });

    if (checkExisting) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const status = await db.collection("users").insertOne({
      name: null,
      email,
      password: await hash(password, 12),
      profileImage: null,
      streetAddress: null,
      city: null,
      state: null,
      zipCode: null,
      phoneNumber: null,
      registerAsGuide: false,
      favoriteTours: [],
      bookedTours: [],
      messages: [],
      signedInBefore: true,
    });

    // Send success response
    res.status(201).json({ message: "User created", ...status });
  }
);
