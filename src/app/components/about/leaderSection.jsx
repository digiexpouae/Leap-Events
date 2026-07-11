import Image from "next/image";
import FadeUp from "@/app/common/Transition";
const leaders = [
  {
    name: "Ahmad Sammour",
    role: "CEO-FOUNDER",
    image: "/assets/ahmed-2.webp", // Replace with actual image path
  },
  {
    name: "MOHAMED BAHAA ELDIN",
    role: "MANAGING DIRECTOR-FOUNDER",
    image: "/assets/baha-2.jpg", // Replace with actual image path
  },
];

export default function LeadersSection() {
  return (
    <section className="relative  py-16 px-4 overflow-hidden "
    style={{
        backgroundImage:"url(/assets/bg.webp)",
        backgroundPosition:"cover"
    }}
    
    
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-5xl px-6 md:px-0 mx-auto text-center">
        {/* Logo icon */}
      

        {/* Heading */}
        <FadeUp>
        <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
          <span>The Leaders <br />
          Behind </span> {""}
          <span className="text-[#4da6ff]"> Leap Events</span>
        </h2>
        </FadeUp>
           <FadeUp>
        <p className="mt-3 text-sm text-white max-w-lg mx-auto">
          Meet the visionaries who turn bold ideas into unforgettable experiences.
        </p>
        </FadeUp>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-16">
          {leaders.map(({ name, role, image },index) => (
               <FadeUp key={index} delay={index*0.2}>
            <div
              key={name}
              className="flex flex-col overflow-hidden border  rounded-4xl border-white"
            >
              {/* Photo */}
              <div className="relative aspect-square w-full shrink-0">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              {/* Name & role */}
              <div className=" flex-grow px-4 bg-[#1C2568] border-t flex flex-col  items-center justify-center border-white py-6">
                <p className="text-white font-semibold text-lg tracking-tighter md:text-3xl text-center uppercase leading-tight">
                  {name}
                </p>
                <p className="mt-1 text-base md:text-lg font-semibold text-[#3D80FA] tracking-tighter  uppercase">
                  {role}
                </p>
              </div>
            </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}