
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectionState {
  currentDataset: string;
  currentModel: string;
  currentStep: string;
}

interface SelectionContextType {
  selection: SelectionState;
  updateDataset: (dataset: string) => void;
  updateModel: (model: string) => void;
  updateStep: (step: string) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};

interface SelectionProviderProps {
  children: ReactNode;
}

export const SelectionProvider: React.FC<SelectionProviderProps> = ({ children }) => {
  const [selection, setSelection] = useState<SelectionState>({
    currentDataset: "None Selected",
    currentModel: "None Selected",
    currentStep: "Getting Started"
  });

  const updateDataset = (dataset: string) => {
    setSelection(prev => ({ ...prev, currentDataset: dataset }));
  };

  const updateModel = (model: string) => {
    setSelection(prev => ({ ...prev, currentModel: model }));
  };

  const updateStep = (step: string) => {
    setSelection(prev => ({ ...prev, currentStep: step }));
  };

  return (
    <SelectionContext.Provider value={{ selection, updateDataset, updateModel, updateStep }}>
      {children}
    </SelectionContext.Provider>
  );
};
