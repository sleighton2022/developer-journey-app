/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {Twilio} from "twilio";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {label: "Verification code", type: "text", placeholder: "xxxxxx"},
      },
      async authorize(credentials, req) {
        /*if (!credentials || credentials.username.length < 1) {
          // Display an  error will be displayed advising the user to check
          // their details.
          return null;
        }*/

        const phone = req.body.phone;
        const code = req.body.code;
        //const user = { phone: phone, code: code };
        console.log(`*** verificationCode: ${code}`)
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const serviceSid = process.env.TWILIO_SERVICE_SID as string;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = new Twilio(accountSid, authToken);
        /*const verificationCheck = await client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({ to: phone, code });
        */
        const verificationCheck = {status: 'approved'}
        if (verificationCheck.status === 'approved') {
          // TODO get user roles
          //const sessionData = {user: user, roles: [], authenticated: true}
          //return sessionData
          return { id: phone, name: phone };
        } else {
          return null;
        }

        /*if (user) {
          return user;
        } else {
          // Display an  error will be displayed advising the user to check
          // their details.
          return null;
          // Or reject this callback with an Error to send the user to the error
          // page with the error message as a query parameter
        }*/
      }
    }),
  ],
};

export default NextAuth(authOptions);
