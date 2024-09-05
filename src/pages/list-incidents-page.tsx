import { useSession, } from "next-auth/react"
import SignInRecommendation from "../components/sign-in-recommendation";
import Head from "next/head";
import ReportIncident from "src/components/report-incident";
import ListIncidents from "src/components/list-incidents";

export default function ListIncidentsPage() {
    const { status } = useSession();
    return (
        <>
            <Head>
                <title>Report Incident</title>
            </Head>
            <main>
                {status === "authenticated" ? (
                    <div>
                        <ListIncidents />
                    </div>
                ) : (<SignInRecommendation />)}
            </main>
        </>
    )
}
