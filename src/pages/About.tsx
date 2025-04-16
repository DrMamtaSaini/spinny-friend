import React from 'react';
import MainLayout from '@/components/MainLayout';
import AdSpace from '@/components/AdSpace';

const About: React.FC = () => {
  return (
    <MainLayout>
      {/* Top AdMob Space */}
      <AdSpace className="w-full h-16 mb-4" />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          About SpinnyFriend
        </h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-lg">
            SpinnyFriend is a versatile random selection wheel designed to help you make decisions in a fun, 
            engaging way. Whether you're choosing from a list of options, picking a winner from participants, 
            or just leaving something up to chance, our wheel makes the process exciting and fair.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>
            SpinnyFriend began as a simple project to bring fun and fairness to decision-making. 
            Our team wanted to create a tool that was not only functional but also enjoyable to use. 
            What started as a basic wheel has evolved into a customizable platform that's accessible 
            across all devices.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Platform Compatibility</h2>
          <p>
            SpinnyFriend is primarily a web application that works seamlessly on both desktop and mobile browsers. 
            This means you can access it on your Android or iOS device through any modern web browser. 
            The responsive design ensures a great experience regardless of screen size.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Future Plans</h2>
          <p>
            We're constantly working on improving SpinnyFriend. Our roadmap includes developing native 
            mobile applications for both Android and iOS platforms to provide an even better user experience 
            with offline capabilities and enhanced performance. Stay tuned for these exciting updates!
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            We'd love to hear your feedback or answer any questions you might have about SpinnyFriend. 
            Feel free to reach out to us at <a href="mailto:drsainimamta@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">drsainimamta@gmail.com</a>.
          </p>
        </div>
      </div>
      
      {/* Bottom AdMob Space */}
      <AdSpace className="w-full h-16 mt-8" />
    </MainLayout>
  );
};

export default About;
