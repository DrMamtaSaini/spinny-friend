
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Edit, GripVertical, Check } from "lucide-react";

interface EntryListProps {
  entries: string[];
  onRemove: (index: number) => void;
  onEdit: (index: number, newValue: string) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onRemove, onEdit }) => {
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editValue, setEditValue] = React.useState<string>("");
  
  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(entries[index]);
  };
  
  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      onEdit(editingIndex, editValue);
      setEditingIndex(null);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="font-semibold mb-2 text-lg">Entries ({entries.length})</h3>
      <ScrollArea className="h-80 border rounded-md p-2">
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No entries yet</p>
        ) : (
          <ul className="space-y-1">
            {entries.map((entry, index) => (
              <li 
                key={`${entry}-${index}`} 
                className="flex items-center gap-2 py-1 px-2 rounded-md group hover:bg-secondary"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground invisible group-hover:visible" />
                
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 border rounded py-1 px-2 text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit();
                        if (e.key === 'Escape') setEditingIndex(null);
                      }}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleSaveEdit}
                      className="h-6 w-6"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 truncate">{entry}</span>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStartEdit(index)}
                      className="h-6 w-6 invisible group-hover:visible"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(index)}
                      className="h-6 w-6 invisible group-hover:visible"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
};

export default EntryList;
