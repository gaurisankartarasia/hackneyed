

import React from 'react';
import { ArrowUpRight } from 'lucide-react'; // Icon from Lucide-react, you can replace with Telegram icons

const supportGroups = [
  {
    name: 'larry',
    description: 'Suport Group for Oneplus Nord CE3 Lite 5G/N30.',
    link: 'https://t.me/OnePlusNordCE3Lite',
  },
  {
    name: 'oscar',
    description: 'Suport Group for Realme 9 Pro 5G/9 5G/Q5.',
    link: 'https://t.me/lineageos_oscar',
  },
  {
    name: 'X00TD/X00T',
    description: 'Suport Group for Asus Zenfone Max Pro M1.',
    link: 'https://t.me/LineageosX00TD',
  },
  {
    name: 'Hackneyed',
    description: 'Updates Channel for all my works.',
    link: 'https://t.me/HackneyedUpdates',
  },
  {
    name: 'Mido',
    description: 'Suport Group for Xiaomi Redmi Note 4 (Deprecated).',
    link: '#',
  },
  {
    name: 'Karate',
    description: 'Suport Group for Lenovo K6 Power/Note.',
    link: 'https://t.me/k6_development',
  },
  {
    name: 'Donate Me',
    description: 'Donate if you love my work!',
    link: 'https://paypal.me/vvkachoooz',
  },
];

const SupportSection = () => {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-500 mb-4">Support</h2>
          <p className="text-lg text-gray-600">Support groups for my works.</p>
        </div>

        {/* Support Group Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportGroups.map((group, index) => (
            <div
              key={index}
              className="flex items-center bg-black shadow-sm p-6 rounded hover:shadow-sm transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full">
                  <ArrowUpRight className="text-white w-6 h-6" />
                </div>
              </div>

              {/* Text Content */}
              <a href={group.link} target='_blank' className="ml-6">
                <h3 className="text-xl font-bold text-blue-500 mb-1">{group.name}</h3>
                <p className="text-gray-600">{group.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
