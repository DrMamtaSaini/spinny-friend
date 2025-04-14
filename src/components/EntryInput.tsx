
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { isValidEntry } from "@/utils/wheelUtils";

interface EntryInputProps {
  onAdd: (entry: string) => void;
  onBulkAdd: (entries: string[]) => void;
  placeholder?: string;
}

const EntryInput: React.FC<EntryInputProps> = ({ onAdd, onBulkAdd, placeholder = "Add new entry..." }) => {
  const [entry, setEntry] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [bulkEntries, setBulkEntries] = useState('');
  
  const handleAddEntry = () => {
    if (isValidEntry(entry)) {
      onAdd(entry.trim());
      setEntry('');
    }
  };
  
  const handleBulkAdd = () => {
    const entries = bulkEntries
      .split('\n')
      .map(e => e.trim())
      .filter(isValidEntry);
      
    if (entries.length > 0) {
      onBulkAdd(entries);
      setBulkEntries('');
      setShowBulkInput(false);
    }
  };
  
  return (
    <div className="space-y-3 w-full max-w-md">
      {!showBulkInput ? (
        <div className="flex gap-2">
          <Input
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddEntry();
            }}
            className="flex-1"
          />
          <Button onClick={handleAddEntry} disabled={!isValidEntry(entry)}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Textarea
            value={bulkEntries}
            onChange={(e) => setBulkEntries(e.target.value)}
            placeholder="Enter multiple entries (one per line)"
            className="min-h-32"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowBulkInput(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleBulkAdd} disabled={!bulkEntries.trim()} className="flex-1">
              Add All
            </Button>
          </div>
        </div>
      )}
      
      {!showBulkInput && (
        <Button 
          variant="outline" 
          onClick={() => setShowBulkInput(true)} 
          className="w-full"
        >
          Add Multiple Entries
        </Button>
      )}
    </div>
  );
};

export default EntryInput;
