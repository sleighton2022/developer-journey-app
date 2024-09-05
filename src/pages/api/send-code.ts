import { NextResponse } from 'next/server';
import { Twilio } from "twilio";
import {NextApiRequest, NextApiResponse} from "next";
import {VerificationInstance} from "twilio/lib/rest/verify/v2/service/verification";
//DT2QCJ8WZLM21VZJ3M2X27L7  recovery code
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const myNumber = process.env.MY_NUMBER;


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<object>
) {
    try {
        const data = await req.body; // Parse the request body
        const { phoneNumber } = data; // Destructure phoneNumber

        if (!phoneNumber) {
            return new NextResponse('Phone number is required', { status: 400 });
        }

        // Send code using Twilio
        let verification: VerificationInstance;
        const client = new Twilio(accountSid, authToken);
        /*verification = await client.verify.v2
            .services(serviceSid)
            .verifications.create({to: phoneNumber, channel: 'sms'});
        res.status(200).json({ status: verification.status })
        */
        //return NextResponse.json({ status: verification.status });
        res.status(200).json({ status: 'pending' })
    } catch (error) {
        console.error('Error sending OTP:', error) ;
        //return new NextResponse('Failed to send OTP', { status: 500 });
        res.status(500).json({ status: 'Failed to send OTP' })
    }
}
