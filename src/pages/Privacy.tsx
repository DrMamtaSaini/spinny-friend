
import React from 'react';
import MainLayout from '@/components/MainLayout';

const Privacy: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-lg mb-6">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p>
            Welcome to Spinny Wheel. We respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your personal data when you visit our website
            and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">The Data We Collect</h2>
          <p>
            Spinny Wheel is designed to be privacy-friendly. We collect minimal data to provide our service:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Usage Data: Anonymous information about how you interact with our application.</li>
            <li>Device Information: Browser type, operating system, and screen size to optimize your experience.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Data</h2>
          <p>
            We use the collected data solely to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Improve our application based on how users interact with it.</li>
            <li>Optimize the user experience across different devices.</li>
            <li>Fix bugs and address technical issues.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
          <p>
            Spinny Wheel uses only essential cookies that are necessary for the website to function properly.
            These cookies do not track you for advertising purposes and are used only to enhance your experience.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
          <p>
            We may use third-party services to help us operate our application. These services may collect
            information sent by your browser as part of a web page request. These third parties have their own
            privacy policies regarding data collection.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate security measures to prevent your personal data from being accidentally lost,
            used, accessed, altered, or disclosed in an unauthorized way.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
          <p>
            Spinny Wheel is not intended for children under 13 years of age. We do not knowingly collect personal
            information from children under 13.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting
            the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <a href="mailto:drsainimamta@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 ml-1">
              drsainimamta@gmail.com
            </a>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
