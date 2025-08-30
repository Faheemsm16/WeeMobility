import dynamic from "next/dynamic";
const LandingPage = dynamic(() => import("../components/LandingPage"), { ssr: true });

export default function Home() {
  return <LandingPage />;
}