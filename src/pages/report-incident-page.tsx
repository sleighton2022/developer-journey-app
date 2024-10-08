import { useSession, } from "next-auth/react"
import SignInRecommendation from "../components/sign-in-recommendation";
import Head from "next/head";
import ReportIncident from "src/components/report-incident";

export default function ReportIncidentPage() {
    const { data: session } = useSession();
    console.log('getting session report: ' + JSON.stringify(session))
    return (
        <>
            <Head>
                <title>Report Incident</title>
            </Head>
            <main>
                {session?.user?.name ? (
                    <div>
                        <ReportIncident />
                    </div>
                ) : (<SignInRecommendation />)}
            </main>
        </>
    )
}
