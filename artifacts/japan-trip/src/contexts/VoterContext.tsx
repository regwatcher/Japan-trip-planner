import { createContext, useContext, useState, type ReactNode } from "react";
import type { FamilyMember } from "@/hooks/useVotes";

interface VoterContextType {
  currentVoter: FamilyMember | null;
  setCurrentVoter: (voter: FamilyMember | null) => void;
}

const VoterContext = createContext<VoterContextType | null>(null);

export function VoterProvider({ children }: { children: ReactNode }) {
  const [currentVoter, setCurrentVoterState] = useState<FamilyMember | null>(() => {
    try {
      const saved = localStorage.getItem("currentVoter");
      return saved ? (saved as FamilyMember) : null;
    } catch {
      return null;
    }
  });

  const setCurrentVoter = (voter: FamilyMember | null) => {
    setCurrentVoterState(voter);
    try {
      if (voter) {
        localStorage.setItem("currentVoter", voter);
      } else {
        localStorage.removeItem("currentVoter");
      }
    } catch {
      // ignore
    }
  };

  return (
    <VoterContext.Provider value={{ currentVoter, setCurrentVoter }}>
      {children}
    </VoterContext.Provider>
  );
}

export function useVoterContext(): VoterContextType {
  const ctx = useContext(VoterContext);
  if (!ctx) throw new Error("useVoterContext must be used within VoterProvider");
  return ctx;
}
