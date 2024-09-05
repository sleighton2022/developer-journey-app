import { NextResponse } from 'next/server';
import { Twilio } from "twilio";
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
//import { encrypt } from '@/app/lib/session'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);


//export async function POST(request) { // Define a named export for POST requests
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<object>
) {
    const { phoneNumber, code } = await req.body; // Parse the request body
    if (!phoneNumber || !code) {
        return new NextResponse('Phone number and code are required', { status: 400 });
    }

    try {
        const verificationCheck = await client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({ to: phoneNumber, code });

        if (verificationCheck.status === 'approved') {
            // TODO get user roles
            const sessionData = {name: phoneNumber, roles: []}
            //  TODO...
            //const encryptedSessionData = encrypt(sessionData)
            const encryptedSessionData = JSON.stringify(sessionData)

            const cookie = serialize('session', encryptedSessionData, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // One week
                path: '/',
            })
            res.setHeader('Set-Cookie', cookie)
            res.status(200).json({ status: verificationCheck.status })
        } else {
            //return new NextResponse(JSON.stringify({ verified: false, message: 'Invalid code' }), { status: 400 });
            res.status(400).json({ verified: false, message: 'Invalid code' })
        }
    } catch (error) {
        // @ts-ignore
        //return new NextResponse(error.message, { status: 500 });
        res.status(500).json({status: error.message})
    }
}
