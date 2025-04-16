
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
  List 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WheelSettingsProps {
  entries: string[];
  setEntries: React.Dispatch<React.SetStateAction<string[]>>;
  winners: string[];
}

const WheelSettings: React.FC<WheelSettingsProps> = ({ entries, setEntries, winners }) => {
  const [minNumber, setMinNumber] = React.useState('0');
  const [maxNumber, setMaxNumber] = React.useState('36');

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
    
    if (min > max || max > 99) {
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
      
      <Tabs defaultValue="entries" className="p-4">
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
                <p className="text-sm text-purple-700 mb-2">Generate numbers from 0 to 99</p>
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label htmlFor="min-number" className="text-sm">Min</Label>
                    <Input 
                      id="min-number" 
                      type="number" 
                      value={minNumber}
                      onChange={(e) => setMinNumber(e.target.value)}
                      min="0"
                      max="99"
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
                      max="99"
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
                  Add names or custom text entries (up to 100 entries)
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
          <div className="border p-4 rounded-md bg-gradient-to-br from-purple-50 to-pink-50">
            <h3 className="font-semibold flex items-center text-lg mb-3 text-purple-800">
              <History className="h-4 w-4 mr-2" />
              Winner History
            </h3>
            {winners.length === 0 ? (
              <p className="text-muted-foreground text-center py-2 bg-white bg-opacity-50 rounded-md">No winners yet</p>
            ) : (
              <ul className="space-y-1 max-h-48 overflow-auto rounded-md bg-white bg-opacity-60 p-2">
                {winners.map((winner, index) => (
                  <li key={index} className="text-sm py-1 px-2 odd:bg-purple-100/30 rounded flex items-center">
                    <Badge className="mr-2 bg-purple-600">{index + 1}</Badge>
                    {winner}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
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
        
        <TabsContent value="how-to" className="space-y-4">
          <div className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4">
              <h3 className="font-bold text-lg text-purple-800 mb-3">How To Use</h3>
              
              <div className="space-y-3">
                <div className="bg-white bg-opacity-70 p-3 rounded-md">
                  <h4 className="font-semibold text-purple-700">1. Set Up Your Wheel</h4>
                  <p className="text-sm text-gray-700">
                    Add numbers (0-99) or names to the wheel using the Entries tab. 
                    You can generate a range of numbers or add custom entries.
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-70 p-3 rounded-md">
                  <h4 className="font-semibold text-purple-700">2. Spin The Wheel</h4>
                  <p className="text-sm text-gray-700">
                    Click the SPIN button on the wheel or the button below it to start spinning.
                    Wait for the wheel to stop to see the result.
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-70 p-3 rounded-md">
                  <h4 className="font-semibold text-purple-700">3. View Results</h4>
                  <p className="text-sm text-gray-700">
                    The winner will be highlighted when the wheel stops. 
                    Check the Winner History in Settings tab to view past results.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <h3 className="font-bold text-lg text-blue-800 mb-2">FAQ</h3>
              
              <div className="space-y-2">
                <details className="bg-white bg-opacity-70 p-3 rounded-md">
                  <summary className="font-medium text-blue-700 cursor-pointer">
                    Can I customize the wheel colors?
                  </summary>
                  <p className="text-sm mt-2 text-gray-700">
                    The wheel uses a preset color scheme that ensures good contrast and visibility.
                    Custom color options may be added in future updates.
                  </p>
                </details>
                
                <details className="bg-white bg-opacity-70 p-3 rounded-md">
                  <summary className="font-medium text-blue-700 cursor-pointer">
                    Is there a limit to how many entries I can add?
                  </summary>
                  <p className="text-sm mt-2 text-gray-700">
                    You can add up to 100 entries (numbers from 0-99 or custom names). 
                    Adding too many entries may make the wheel segments smaller and harder to read.
                  </p>
                </details>
                
                <details className="bg-white bg-opacity-70 p-3 rounded-md">
                  <summary className="font-medium text-blue-700 cursor-pointer">
                    Are the results truly random?
                  </summary>
                  <p className="text-sm mt-2 text-gray-700">
                    Yes, Spinny Saga uses JavaScript's built-in random number generator 
                    to ensure fair and unbiased results for each spin.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <div className="rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white text-center">
              <h3 className="font-bold text-2xl">Spinny Saga</h3>
              <p className="text-sm opacity-90">The Ultimate Wheel of Fortune Experience</p>
            </div>
            
            <div className="p-4 space-y-4 bg-gradient-to-b from-purple-50 to-white">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-purple-800 mb-2">About Us</h4>
                <p className="text-sm text-gray-700">
                  Spinny Saga was designed to bring the excitement of random selection to your fingertips.
                  Whether you're deciding who goes first in a game, picking a random winner for a giveaway, 
                  or just having fun with friends, our interactive wheel spinner makes the process engaging and fair.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-purple-800 mb-2">Our Mission</h4>
                <p className="text-sm text-gray-700">
                  We believe that making decisions can be fun! Our mission is to create simple yet
                  engaging tools that bring a bit of excitement to everyday choices while ensuring
                  fairness and randomness in the selection process.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-purple-800 mb-2">Contact</h4>
                <p className="text-sm text-gray-700">
                  Have suggestions or feedback? We'd love to hear from you! 
                  Reach out to us at hello@spinnysaga.com
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WheelSettings;
