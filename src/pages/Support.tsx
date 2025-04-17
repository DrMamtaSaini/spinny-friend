import React from 'react';
import MainLayout from '@/components/MainLayout';
import AdSpace from '@/components/AdSpace';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Support: React.FC = () => {
  return (
    <MainLayout>
      {/* Top AdMob Space */}
      <AdSpace className="w-full h-16 mb-4" />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          How to Use SpinnyFriend
        </h1>
        
        <div className="mb-8">
          <p className="text-lg mb-6">
            SpinnyFriend is designed to be intuitive and easy to use. Here's a quick guide to help you get started:
          </p>
          
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>On the home page, you'll see the wheel with default numbers (0-36).</li>
                <li>You can customize your wheel entries using the panel on the left side.</li>
                <li>Add, edit, or remove entries to create your custom wheel.</li>
                <li>Click the "Spin" button to randomly select a winner.</li>
              </ol>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-3">Customizing Your Wheel</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To add entries: Type your entry in the input field and click "Add Entry" or press Enter.</li>
                <li>To remove an entry: Click the × button next to any entry in the list.</li>
                <li>To reset to default numbers: Click the "Reset to Default Numbers" button.</li>
                <li>Maximum allowed entries: 50 items.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">FAQ</h2>
        
        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">Is SpinnyFriend available as a mobile app?</AccordionTrigger>
            <AccordionContent>
              <p>Currently, SpinnyFriend is available as a responsive web application that works well on mobile browsers. 
              We're working on native Android and iOS apps for the future.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">How many entries can I add to the wheel?</AccordionTrigger>
            <AccordionContent>
              <p>You can add up to 50 entries to the wheel. This limit ensures optimal performance and visibility of each entry on the wheel.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">Is the wheel selection truly random?</AccordionTrigger>
            <AccordionContent>
              <p>Yes, SpinnyFriend uses a cryptographically secure random number generator to ensure fair and unbiased selections.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">Can I save my custom wheel for later use?</AccordionTrigger>
            <AccordionContent>
              <p>Currently, wheel configurations are not saved between sessions. We're planning to add user accounts with saved wheels in a future update.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium">How do I report bugs or suggest features?</AccordionTrigger>
            <AccordionContent>
              <p>Please email us at <a href="mailto:drsainimamta@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">drsainimamta@gmail.com</a> with any issues or suggestions. We appreciate your feedback!</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Need More Help?</h3>
          <p className="mb-4">If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
          <p>Email: <a href="mailto:drsainimamta@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">drsainimamta@gmail.com</a></p>
        </div>
      </div>
      
      {/* Bottom AdMob Space */}
      <AdSpace className="w-full h-16 mt-8" />
    </MainLayout>
  );
};

export default Support;
