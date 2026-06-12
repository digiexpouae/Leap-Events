import Image from "next/image";

const leaders = [
  {
    name: "Ahmad Issam Sammour",
    role: "CEO",
    image: "/assets/ahmed-3.webp", // Replace with actual image path
  },
  {
    name: "Mohammed Bahaa Edin Boshra",
    role: "Managing Director",
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
        <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
          <span>The Leaders <br />
          Behind </span> {""}
          <span className="text-[#4da6ff]"> Leap Events</span>
        </h2>
        <p className="mt-3 text-sm text-white max-w-lg mx-auto">
          Meet the visionaries who turn bold ideas into unforgettable experiences.
        </p>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-16">
          {leaders.map(({ name, role, image }) => (
            <div
              key={name}
              className=" overflow-hidden border rounded-4xl border-white"
            >
              {/* Photo */}
              <div className="relative aspect-square w-full ">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              {/* Name & role */}
              <div className=" px-14 bg-[#1C2568] border-t border-white py-4">
                <p className="text-white font-semibold text-lg tracking-tighter md:text-4xl text-center uppercase leading-tight">
                  {name}
                </p>
                <p className="mt-1 text-base md:text-lg font-semibold text-[#3D80FA] tracking-tighter  uppercase">
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}