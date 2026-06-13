import { LandingHeader } from "@/components/landing/landing-header";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="bg-black">
            <LandingHeader />
            {children}
        </section>
    );
}