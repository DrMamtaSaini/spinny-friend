
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EntryInput from './EntryInput';
import EntryList from './EntryList';
import { generateNumberRange } from "@/utils/wheelUtils";
import { History, Save, Share } from "lucide-react";

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
    
    if (min > max) {
      return; // Could show an error toast here
    }
    
    const range = generateNumberRange(min, max);
    setEntries(range);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm w-full max-w-md">
      <Tabs defaultValue="entries">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="entries" className="space-y-4">
          <Tabs defaultValue="number" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="number">Numbers</TabsTrigger>
              <TabsTrigger value="name">Names</TabsTrigger>
            </TabsList>
            
            <TabsContent value="number" className="space-y-4">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Label htmlFor="min-number">Min</Label>
                  <Input 
                    id="min-number" 
                    type="number" 
                    value={minNumber}
                    onChange={(e) => setMinNumber(e.target.value)}
                    min="0"
                    max="99"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="max-number">Max</Label>
                  <Input 
                    id="max-number" 
                    type="number" 
                    value={maxNumber}
                    onChange={(e) => setMaxNumber(e.target.value)}
                    min="0"
                    max="99"
                  />
                </div>
                <Button onClick={generateNumbers}>Generate</Button>
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
          <div className="border p-3 rounded-md">
            <h3 className="font-semibold flex items-center text-lg mb-2">
              <History className="h-4 w-4 mr-2" />
              Winner History
            </h3>
            {winners.length === 0 ? (
              <p className="text-muted-foreground text-center py-2">No winners yet</p>
            ) : (
              <ul className="space-y-1 max-h-48 overflow-auto">
                {winners.map((winner, index) => (
                  <li key={index} className="text-sm py-1 px-2 odd:bg-muted/30 rounded">
                    {winner}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Save & Share</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Wheel
              </Button>
              <Button variant="outline" className="flex items-center">
                <Share className="h-4 w-4 mr-2" />
                Share Result
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: Wheel data is currently saved locally in your browser.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WheelSettings;
