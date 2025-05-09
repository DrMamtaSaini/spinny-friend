import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EntryInput from './EntryInput';
import EntryList from './EntryList';
import { generateNumberRange } from "@/utils/wheelUtils";
import { 
  History, 
  Save, 
  Share, 
  HelpCircle, 
  BookOpen, 
  Info, 
  AlertCircle,
  Settings2,
  List,
  Smartphone,
  RotateCw,
  Check,
  Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { useIsMobile } from '@/hooks/use-mobile';

interface WheelSettingsProps {
  entries: string[];
  setEntries: React.Dispatch<React.SetStateAction<string[]>>;
}

const WheelSettings: React.FC<WheelSettingsProps> = ({ 
  entries, 
  setEntries
}) => {
  const [minNumber, setMinNumber] = React.useState('0');
  const [maxNumber, setMaxNumber] = React.useState('36');
  const [activeTab, setActiveTab] = React.useState('entries');
  const isMobile = useIsMobile();

  const handleAddEntry = (entry: string) => {
    setEntries(prev => [...prev, entry]);
  };

  const handleBulkAddEntries = (newEntries: string[]) => {
    setEntries(prev => [...prev, ...newEntries]);
  };

  const handleRemoveEntry = (index: number) => {
    setEntries(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditEntry = (index: number, newValue: string) => {
    setEntries(prev => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };

  const generateNumbers = () => {
    const min = parseInt(minNumber) || 0;
    const max = parseInt(maxNumber) || 36;
    
    if (min > max || max > 49) {
      return; // Could show an error toast here
    }
    
    const range = generateNumberRange(min, max);
    setEntries(range);
  };

  const clearEntries = () => {
    setEntries([]);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-md w-full max-w-md">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 text-white">
        <h2 className="text-xl font-bold">Wheel Settings</h2>
        <p className="text-xs opacity-80">Customize your spin wheel experience</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="entries" className="flex items-center gap-1">
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Entries</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
          <TabsTrigger value="how-to" className="flex items-center gap-1">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">How To</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">About</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="entries" className="space-y-4">
          <Tabs defaultValue="number" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="number">Numbers</TabsTrigger>
              <TabsTrigger value="name">Names</TabsTrigger>
            </TabsList>
            
            <TabsContent value="number" className="space-y-4">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-md">
                <p className="text-sm text-purple-700 mb-2">Generate numbers from 0 to 49</p>
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label htmlFor="min-number" className="text-sm">Min</Label>
                    <Input 
                      id="min-number" 
                      type="number" 
                      value={minNumber}
                      onChange={(e) => setMinNumber(e.target.value)}
                      min="0"
                      max="49"
                      className="border-purple-200 focus-visible:ring-purple-400"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="max-number" className="text-sm">Max</Label>
                    <Input 
                      id="max-number" 
                      type="number" 
                      value={maxNumber}
                      onChange={(e) => setMaxNumber(e.target.value)}
                      min="0"
                      max="49"
                      className="border-purple-200 focus-visible:ring-purple-400"
                    />
                  </div>
                  <Button onClick={generateNumbers} className="bg-purple-600 hover:bg-purple-700">Generate</Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Current Entries ({entries.length})</h3>
                {entries.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearEntries}
                    className="text-xs h-8"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <EntryList 
                entries={entries} 
                onRemove={handleRemoveEntry} 
                onEdit={handleEditEntry} 
              />
              
              <EntryInput 
                onAdd={handleAddEntry} 
                onBulkAdd={handleBulkAddEntries}
                placeholder="Add custom number..." 
              />
            </TabsContent>
            
            <TabsContent value="name" className="space-y-4">
              <div className="p-3 bg-pink-50 border border-pink-100 rounded-md">
                <p className="text-sm text-pink-700">
                  Add names or custom text entries (up to 50 entries)
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Current Entries ({entries.length})</h3>
                {entries.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearEntries}
                    className="text-xs h-8"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <EntryList 
                entries={entries} 
                onRemove={handleRemoveEntry} 
                onEdit={handleEditEntry} 
              />
              
              <EntryInput 
                onAdd={handleAddEntry} 
                onBulkAdd={handleBulkAddEntries}
                placeholder="Add name..."
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-purple-800">Save & Share</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center bg-white hover:bg-purple-50">
                <Save className="h-4 w-4 mr-2" />
                Save Wheel
              </Button>
              <Button variant="outline" className="flex items-center bg-white hover:bg-purple-50">
                <Share className="h-4 w-4 mr-2" />
                Share Result
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: Wheel data is currently saved locally in your browser.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="how-to" className="space-y-4 animate-in fade-in">
          <div className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4">
              <h3 className="font-bold text-lg text-purple-800 mb-3">How To Use</h3>
              
              {isMobile ? (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step-1" className="border-b">
                    <AccordionTrigger className="py-2">
                      <span className="flex items-center">
                        <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                        <span className="font-semibold text-purple-700">Set Up Your Wheel</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-700 pl-9">
                      Choose between numbers (0-49) or names in the Entries tab. For numbers, you can 
                      generate a range by setting min/max values, or add them individually. 
                      For custom entries, type each name and press Enter or click "Add".
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="step-2" className="border-b">
                    <AccordionTrigger className="py-2">
                      <span className="flex items-center">
                        <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                        <span className="font-semibold text-purple-700">Customize Your Experience</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-700 pl-9">
                      Edit entries by clicking the pencil icon, or remove items by clicking the trash icon. 
                      You can add up to 50 entries for optimal visibility. The wheel will automatically 
                      adjust its segments to match your entries.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="step-3" className="border-b">
                    <AccordionTrigger className="py-2">
                      <span className="flex items-center">
                        <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                        <span className="font-semibold text-purple-700">Spin The Wheel</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-700 pl-9">
                      Click the SPIN button to start the wheel. Watch as it rotates and gradually slows down 
                      to reveal your randomly selected winner. The pointer at the top indicates the winning segment.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="step-4">
                    <AccordionTrigger className="py-2">
                      <span className="flex items-center">
                        <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                        <span className="font-semibold text-purple-700">Track Results</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-700 pl-9">
                      All winning results are stored in the Winner History section under Settings. 
                      The most recent winners appear at the top of the list. You can refer back to this 
                      history at any time during your session.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white bg-opacity-70 p-3 rounded-md flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-purple-700">Set Up Your Wheel</h4>
                      <p className="text-sm text-gray-700">
                        Choose between numbers (0-49) or names in the Entries tab. For numbers, you can 
                        generate a range by setting min/max values, or add them individually. 
                        For custom entries, type each name and press Enter or click "Add".
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 p-3 rounded-md flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-purple-700">Customize Your Experience</h4>
                      <p className="text-sm text-gray-700">
                        Edit entries by clicking the pencil icon, or remove items by clicking the trash icon. 
                        You can add up to 50 entries for optimal visibility. The wheel will automatically 
                        adjust its segments to match your entries.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 p-3 rounded-md flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-purple-700">Spin The Wheel</h4>
                      <p className="text-sm text-gray-700">
                        Click the SPIN button to start the wheel. Watch as it rotates and gradually slows down 
                        to reveal your randomly selected winner. The pointer at the top indicates the winning segment.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 p-3 rounded-md flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-purple-700">Track Results</h4>
                      <p className="text-sm text-gray-700">
                        All winning results are stored in the Winner History section under Settings. 
                        The most recent winners appear at the top of the list. You can refer back to this 
                        history at any time during your session.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <h3 className="font-bold text-lg text-blue-800 mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Frequently Asked Questions
              </h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="text-blue-700 font-medium">
                    <span className="flex items-center">
                      <RotateCw className="h-4 w-4 mr-2" />
                      Is the wheel spin truly random?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 pl-6">
                    Yes, Spinny Saga uses a cryptographically secure random number generator to ensure 
                    completely fair and unbiased results with each spin. Every entry has an equal chance of winning.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="text-blue-700 font-medium">
                    <span className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Can I use this on my mobile device?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 pl-6">
                    Absolutely! Spinny Saga is fully responsive and works on all modern devices including smartphones 
                    and tablets. The interface automatically adjusts to provide the best experience regardless of screen size.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="text-blue-700 font-medium">
                    <span className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Can I save my wheel configuration?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 pl-6">
                    Currently, wheel configurations are saved in your browser's local storage during your session. 
                    In future updates, we plan to add the ability to create an account to save and share your custom wheels.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-4">
                  <AccordionTrigger className="text-blue-700 font-medium">
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      What is the maximum number of entries?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 pl-6">
                    You can add up to 50 entries to your wheel. This limit ensures that each segment remains 
                    visible and readable. For numbers, you can use any value from 0 to 49.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4 animate-in fade-in">
          <div className="rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-6 text-white text-center">
              <h3 className="font-bold text-xl sm:text-2xl">Spinny Saga</h3>
              <p className="text-xs sm:text-sm opacity-90">The Ultimate Wheel of Fortune Experience</p>
            </div>
            
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-purple-50 to-white">
              <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center text-sm sm:text-base">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-pink-500" />
                  Our Story
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Spinny Saga was born from a simple idea: making random selection fun and engaging. Whether you're 
                  deciding who goes first in a game night, picking winners for a giveaway, or just having fun with friends, 
                  we wanted to create an experience that brings joy to decision-making.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 mt-2">
                  Our team of developers and designers worked together to create this interactive wheel spinner that combines 
                  functionality with visual appeal. We launched in 2025 and have been helping people make random decisions with style ever since.
                </p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center text-sm sm:text-base">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-500" />
                  Our Mission
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Our mission is to transform ordinary decision-making into moments of anticipation and excitement. We believe that 
                  even the simplest choices can be made memorable with the right tools. Spinny Saga is designed to be:
                </p>
                <ul className="mt-2 space-y-1 text-xs sm:text-sm text-gray-700 list-disc pl-5">
                  <li>Intuitive and easy to use for everyone</li>
                  <li>Completely fair and truly random in its selections</li>
                  <li>Visually engaging with smooth animations</li>
                  <li>Accessible across all devices and platforms</li>
                  <li>Constantly evolving with new features based on user feedback</li>
                </ul>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">Platform Compatibility</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Spinny Saga is a web application that works on all modern browsers. It's fully responsive and optimized for:
                </p>
                <ul className="mt-2 space-y-1 text-xs sm:text-sm text-gray-700 list-disc pl-5">
                  <li><strong>Desktop computers</strong> - Windows, Mac, and Linux</li>
                  <li><strong>Mobile devices</strong> - iOS and Android smartphones and tablets</li>
                  <li><strong>Tablets</strong> - iPad, Android tablets, and other tablet devices</li>
                </ul>
                <p className="text-xs sm:text-sm text-gray-700 mt-2">
                  While currently available as a web app, we're exploring options to release native mobile apps for both Android and iOS in the future. 
                  Stay tuned for updates!
                </p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">Contact Us</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Have suggestions, feedback, or just want to say hello? We'd love to hear from you! 
                  Reach out to us at <span className="text-purple-600">drsainimamta@gmail.com</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-700 mt-2">
                  Follow us on social media for updates and tips:
                </p>
                <div className="mt-2 flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="bg-blue-50 text-xs">Twitter</Badge>
                  <Badge variant="outline" className="bg-purple-50 text-xs">Instagram</Badge>
                  <Badge variant="outline" className="bg-red-50 text-xs">YouTube</Badge>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WheelSettings;
