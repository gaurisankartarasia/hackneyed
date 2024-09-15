import React from 'react';
import { Github, Mail } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="">
      <div className="max-w-5xl mx-auto rounded bg-black p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center border-b-2 pb-2 border-gray-300">About Me</h2>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 relative"> 
            <img 
              src="https://vivekachooz.github.io/assets/img/profile-img.jpg" 
              alt="Vivekachooz"
              loading='lazy' 
              className="rounded-full shadow-sm transform hover:scale-105 transition-transform duration-300 w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded"></div>
          </div>

          <div className="md:w-2/3">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">Android Developer.</h3>
            <p className="text-lg md:text-xl italic mb-6">I do android development in the form of custom roms and kernels.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Github className="mr-2 text-gray-100" />
                <span className="text-gray-100">Web:</span>
                <a href="https://vivekachooz.github.io" className="ml-2 underline hover:text-blue-500 transition-colors">vivekachooz.github.io</a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-100" />
                <span className="text-gray-100">Email:</span>
                <a href="mailto:vivekachooz@gmail.com" className="ml-2 underline hover:text-blue-500 transition-colors">vivekachooz@gmail.com</a>
              </div>
              <div>
                <span className="font-semibold text-gray-100">Country:</span> India
              </div>
              <div>
                <span className="font-semibold text-gray-100">Degree:</span> Bachelor of Arts
              </div>
            </div>

            <p className="mb-4">
              I'm Vivek, an Android developer, enthusiast, and freelancer. I'm also a BA English Language and Literature graduate student. Android development is my passion.
            </p>

            <p>
              The Android community is known for aftermarket software development. Many OEMs don't provide adequate software support after product release, creating a need for Custom ROMs and Kernels. I contribute by providing aftermarket support for various devices, including Oneplus Nord CE3 Lite 5G, Realme 10 Pro 5G, Realme 9 Pro 5G, Realme 9 5G, Realme Q5, Asus Zenfone Max Pro M1, Xiaomi Redmi Note 4, and Lenovo K6 series.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
