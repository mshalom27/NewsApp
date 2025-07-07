import React from "react"

const About = () => {
  return (
//     <div className="min-h-screen bg-amber-100 flex flex-col items-center">
//       {/* Content Section */}
//       <div className="w-full max-w-6xl px-6 py-12 md:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           {/* Left */}
//           <div>
//             <h2 className="text-5xl font-bold text-amber-700 mb-4">
//               Who We Are
//             </h2>

//             <p className="text-gray-600 text-xl leading-relaxed">
//               We are a passionate team committed to driving change through
//               innovation and collaboration. Our platform is designed to empower
//               individuals and organizations to unlock their true potential.
//             </p>
//           </div>

//           {/* Right (image) */}
//           <div className="relative">
//   <img
//     src="https://www.mediainfoline.com/wp-content/uploads/2023/04/WION-Viewership.jpg"
//     alt=""
//     className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
//   />
// </div>

//         </div>
//       </div>

//       {/* Team Section */}
//       <div className="w-full bg-amber-100 py-12">
//         <h2 className="text-5xl font-bold text-amber-700 text-center mb-8">
//           Meet Our Team
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           <div className="text-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
//               alt="Team member"
//               className="w-32 h-32 rounded-full mx-auto mb-4"
//             />

//             <h3 className="text-xl font-semibold text-gray-700">
//               Minnie Pinh
//             </h3>

//             <p className="text-gray-500">CEO</p>
//           </div>

//           <div className="text-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
//               alt="Team member"
//               className="w-32 h-32 rounded-full mx-auto mb-4"
//             />

//             <h3 className="text-xl font-semibold text-gray-700">
//               Poshi Lai
//             </h3>

//             <p className="text-gray-500">CTO</p>
//           </div>

//           <div className="text-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/6997/6997662.png"
//               alt="Team member"
//               className="w-32 h-32 rounded-full mx-auto mb-4"
//             />

//             <h3 className="text-xl font-semibold text-gray-700">
//               Dora Taurus
//             </h3>

//             <p className="text-gray-500">Lead Designer</p>
//           </div>
//         </div>
//       </div>
//     </div>

  <div className="min-h-screen bg-amber-100 flex flex-col items-center">
    {/* Content Section */}
    <div className="w-full py-12 md:py-16 bg-amber-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        {/* Left */}
        <div className="px-6 md:px-12">
          <h2 className="text-5xl font-bold text-amber-700 mb-6">
            Who We Are
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We are a passionate team committed to driving change through innovation and collaboration.
            Our platform is designed to empower individuals and organizations to unlock their true potential.
          </p>
        </div>

        {/* Right (Image Section) */}
        <div className="overflow-hidden">
          <img
            src="https://www.adgully.com/img/400/202109/wion_no1_post-1.jpg"
            alt="Who we are"
            className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>

    {/* Team Section */}
    <div className="w-full py-16 bg-amber-100">
      <h2 className="text-5xl font-bold text-amber-700 text-center mb-12">
        Meet Our Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
        {[
          {
            name: "Minnie Pinh",
            role: "CEO",
            img: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
          },
          {
            name: "Poshi Lai",
            role: "CTO",
            img: "https://cdn-icons-png.flaticon.com/128/4140/4140037.png",
          },
          {
            name: "Dora Taurus",
            role: "Lead Designer",
            img: "https://cdn-icons-png.flaticon.com/128/6997/6997662.png",
          },
        ].map((member) => (
          <div className="text-center" key={member.name}>
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)


}

export default About
