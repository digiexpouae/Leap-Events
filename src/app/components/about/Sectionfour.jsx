"use client"
import Image from "next/image";
const team = [
    {
        name: "MOHAMMED BAHA ELDIN",
        role: "Managing Director",
        bio: "Have Dedicated Decades Of Experience In Events And Promotion",
        image: "/assets/about/img-1.png",
    },
    {
        name: "AHMED SAMMOR",
        role: "Events Director",
        bio: "Event Enthusiast, Team Builder And Excellent Organizer",
        image: "/assets/about/img-2.png",
    },
    {
        name: "SHAJAAT",
        role: "Art Director",
        bio: "Leads The Art Department Team With Enact Knowledge",
        image: "/assets/about/img-3.png",
    },
    {
        name: "TAHER ALHAMMAMI",
        role: "Marketing Director",
        bio: "Customer Oriented Marketing Professional With Strong Business Development And Project Management Skills",
        image: "/assets/about/img-4.png",
    },
    {
        name: "KRISHNA PATEL",
        role: "Design",
        bio: "Creative And Detail-Oriented Designer With Comprehensive Background In 3D Model Develop And Production",
        image: "/assets/about/img-5.png",
    },
];

function TeamCard({ name, role, bio, image }) {
    return (
        <div className="flex flex-col items-center text-center gap-3 ">
            <div className=" overflow-hidden flex-shrink-0">
                <Image
                    width={300}
                    height={300}
                    src={image}
                    alt={name}

                />
            </div>
            <div className="text-white ">
                <h3 className="font-black uppercase text-sm md:text-xl tracking-tight leading-snug">
                    {name}
                </h3>
                <p className=" text-xs md:text-sm mt-0.5 mb-2">
                    {role}
                </p>
                <p className=" text-sm  mx-auto">
                    {bio}
                </p>
            </div>
        </div>
    );
}

export default function MeetOurTeamSection() {
    const topRow = team.slice(0, 3);
    const bottomRow = team.slice(3);

    return (
        <section className="w-full bg-[var(--color-bg-secondary)] px-6 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">

                {/* Heading */}
                <h2 className="text-white font-black uppercase text-3xl md:text-4xl lg:text-5xl tracking-tight text-center mb-14 md:mb-20">
                    MEET OUR TEAM
                </h2>

                {/* Top row — 3 members */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10  mb-12 md:mb-16">
                    {topRow.map((member, index) => (
                        <TeamCard key={index} name={member.name} role={member.role} bio={member.bio} image={member.image} />
                    ))}
                </div>

                {/* Bottom row — 2 members centered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-2xl mx-auto">
                    {bottomRow.map((member, index) => (
                        <TeamCard key={index} name={member.name} role={member.role} bio={member.bio} image={member.image} />
                    ))}
                </div>

            </div>
        </section>
    );
}