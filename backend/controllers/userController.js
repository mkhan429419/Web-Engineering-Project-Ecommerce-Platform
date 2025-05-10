// Router for user login

import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pakhtar635@gmail.com",
    pass: "vzdg ycuy wrei vdrg",
  },
  debug: false,
  logger: false,
});

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Error configuring Nodemailer:", error);
//   } else {
//     console.log("Nodemailer configured successfully:", success);
//   }
// });

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Router for registering user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for Admin login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const newsletterSubscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const mailOptions = {
      from: '"Welcome to Craftsy News!" <pakhtar635@gmail.com>',
      to: email,
      subject: "Subscription Confirmed",
      text: "Thank you for subscribing to our newsletter!", // Plain text fallback
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <img 
            src="https://i.ibb.co/581gMy0/header.png"
            alt="Craftsy News Header" 
            style="width: 100%; display: block;"
          />
          <div style="padding: 20px;">
            <h1 style="color: #444;">Welcome to Craftsy News!</h1>
            <p style="font-size: 16px; line-height: 1.6;">
              Thank you for subscribing to our newsletter. Stay tuned for the latest updates, offers, and exciting news directly to your inbox!
            </p>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              If you have any questions, feel free to <a href="mailto:support@craftsynews.com" style="color: #1a73e8;">contact us</a>.
            </p>
          </div>
          <div style="background-color: #f8f8f8; text-align: center; padding: 15px;">
            <p style="font-size: 12px; color: #999;">
              © 2024 Craftsy. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    console.log("Attempting to send email with options:", mailOptions);

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);

    res
      .status(200)
      .json({ message: "Subscription successful. Confirmation email sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send confirmation email" });
  }
};

const contactFormSubmit = async (req, res) => {
  const { fname, lname, email, street, city, state, zipcode, country, phone } =
    req.body;

  // Validate the form data
  if (
    !fname ||
    !lname ||
    !email ||
    !street ||
    !city ||
    !state ||
    !zipcode ||
    !country ||
    !phone
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Define email content
    const mailOptions = {
      from: '"Contact Form" <pakhtar635@gmail.com>',
      to: "mkhan28326@gmail.com, amunawar.bese22seecs@seecs.edu.pk, hadiapapa123@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <!-- Header -->
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
            <h1 style="font-size: 20px; margin: 0; color: #333;">New Contact Form Submission</h1>
          </div>
          <!-- Content -->
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #555; margin: 0 0 10px;">
              <strong>Name:</strong> ${fname} ${lname}
            </p>
            <p style="font-size: 16px; color: #555; margin: 0 0 10px;">
              <strong>Email:</strong> <a href="mailto:${email}" style="color: #4caf50; text-decoration: none;">${email}</a>
            </p>
            <p style="font-size: 16px; color: #555; margin: 0 0 10px;">
              <strong>Phone:</strong> ${phone}
            </p>
            <p style="font-size: 16px; color: #555; margin: 0 0 10px;">
              <strong>Address:</strong> ${street}, ${city}, ${state}, ${zipcode}, ${country}
            </p>
          </div>
          <!-- Footer -->
          <div style="background-color: #f9f9f9; text-align: center; padding: 10px; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 14px; color: #888; margin: 0;">
              This email was generated by the contact form on Craftsy.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Contact form email sent:", info);

    res.status(200).json({ message: "Form submitted successfully." });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  newsletterSubscribe,
  contactFormSubmit,
};
