import Image from "next/image";

const teamMembers = [
    {
    name: "ahmad issam sammour",
    role: "CEO",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/person.png",
  },
  {
    name: "MOHAMMED BAHAA EDIN Boshra",
    role: "Managing Director",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/about/img1.png",
  },
  {
    name: "taher mohamed najeeb al hammami",
    role: "production manager",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/about/img2.png",
  },
  {
    name: "shujat ali muqri",
    role: "Art Director",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/shujat2.webp",
  },
  {
    name: "irshad ahmed",
    role: "Finance Manager",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
    image: "/assets/about/img4.png",
  },
  {
    name: "arsalan hussain arbab ali mangi",
    role: "Project Cordinator",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/about/img5.png",
  },
  {
    name: "zainulabdin shujat ali muqri",
    role: "Design Manager",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/about/img6.png",
  },

   {
    name: "Krishna patel",
    role: "Creative Visualiser",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/about/dummy.webp",
  },
  {
    name: "arjun viswanath",
    role: "Procurment Manager",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
    image: "/assets/about/img7.png",
  },
  {
    name: "ajay",
    role: "office boy",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
       image: "/assets/about/img8.png",

  },
];

export default function MeetOurTeam() {
  return (
    <section className="bg-[var(--color-bg-secondary)] px-6 py-16 md:px-12 md:py-24">
      {/* Heading */}
      <h2 className="mb-14 text-center text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
        Meet Our Team
      </h2>

      {/* Grid */}
      <div className="mx-auto max-w-5xl">
        {/* Row 1 */}
        <div className="relative grid grid-cols-2 gap-6 md:grid-cols-4">
          {teamMembers.slice(0, 4).map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}

          {/* Dashed connector line across row 1 */}
      
        </div>

        {/* Row 2 */}
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {teamMembers.slice(4, 8).map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>
          {/* Row 3 */}
        <div className="mt-10  flex  flex-wrap items-center justify-center gap-6">
          {teamMembers.slice(8, 12).map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({
  member,
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Photo */}
      <div className="mb-4 h-36 w-36 overflow-hidden rounded-2xl  md:h-54 md:w-54">
        <Image
          src={member.image}
          width={180}
          height={180}
          alt={member.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Info */}
      <p className="text-sm font-bold uppercase tracking-tight text-white md:text-sm">
        {member.name}
      </p>
      <p className="mt-0.5 text-xs font-medium text-white ">
        {member.role}
      </p>
      
    </div>
  );
}