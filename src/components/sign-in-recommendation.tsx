'use client';
import {Input} from "@nextui-org/input";
import { redirect } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { useSendCodeQuery } from 'src/redux/apiSlice';
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function SignInRecommendation() {
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState('+14164571345');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter Code
    const [error, setError] = useState('');

    const sendCode = async () => {
        try {
            const response = await axios.post('/api/send-code', { phoneNumber });
            if (response.data.status === 'pending') {
                setStep(2);
                //await signIn("credentials", {phone: phoneNumber});
                //await signIn();
            } else {
                alert('send code wrong status: ' + response.data.status);
            }
        } catch (error) {
            // @ts-ignore
            setError(error.response?.data?.error || 'Failed to send code. zzz');
        }
    };

    const verifyCode = async () => {
        try {
            const response = await axios.post('/api/verify-code', { phoneNumber, code });
            if (response.data.status == 'approved') {
                //alert('Phone number verified successfully!');
                console.log(`Phone number verified successfully! redirecting`);
                await router.push('/report-incident-page');
            } else {
                setError('Invalid code.');
            }
        } catch (error: unknown) {
            // @ts-ignore
            setError(error.response?.data?.error || 'Failed to verify code.');
        }
    };

  return (
      <div className="container">
          {step === 1 && (
              <>
                  <h2>Enter your phone number</h2>
                  <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1234567890"
                  />
                  <button onClick={sendCode}>Send Code</button>
              </>
          )}
          {step === 2 && (
              <>
                  <h2>Enter the code sent to your phone</h2>
                  <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="123456"
                  />
                  <button onClick={verifyCode}>Verify Code</button>
                  <button onClick={() => signIn("credentials", {phone: phoneNumber, code: code})}>Sign In</button>
              </>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  )
}
