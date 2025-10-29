import React, {createContext, useContext, useRef, ReactNode, useState} from 'react';
import {ThemedBottomSheetRef} from '../components/ui';

interface BottomSheetState {
  content: ReactNode;
  title?: string;
  snapPoints?: (string | number)[];
}

interface BottomSheetContextType {
  openBottomSheet: (content: ReactNode, title?: string, snapPoints?: (string | number)[]) => void;
  closeBottomSheet: () => void;
  bottomSheetRef: React.RefObject<ThemedBottomSheetRef | null>;
  state: BottomSheetState;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within BottomSheetProvider');
  }
  return context;
};

interface BottomSheetProviderProps {
  children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
}) => {
  const bottomSheetRef = useRef<ThemedBottomSheetRef>(null);
  const [state, setState] = useState<BottomSheetState>({
    content: null,
    title: undefined,
    snapPoints: undefined,
  });

  const openBottomSheet = (
    newContent: ReactNode,
    newTitle?: string,
    newSnapPoints?: (string | number)[],
  ) => {
    setState({
      content: newContent,
      title: newTitle,
      snapPoints: newSnapPoints,
    });
    // Small delay to ensure content is set before opening
    setTimeout(() => {
      bottomSheetRef.current?.open();
    }, 50);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const value: BottomSheetContextType = {
    openBottomSheet,
    closeBottomSheet,
    bottomSheetRef,
    state,
  };

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
};
