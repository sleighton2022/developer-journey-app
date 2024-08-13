import { useSession, } from "next-auth/react"
import SignInRecommendation from "../components/sign-in-recommendation";
import Head from "next/head";
import ReportIncident from "src/components/report-incident";

export default function ReportIncidentPage() {
    const { status } = useSession();
    return (
        <>
            <Head>
                <title>Report Incident</title>
            </Head>
            <main>
                {status === "authenticated" ? (
                    <div className="grid grid-cols-12 gap-3">
                        <ReportIncident />
                    </div>
                ) : (<SignInRecommendation />)}
            </main>
        </>
    )
}
