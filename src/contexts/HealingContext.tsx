
import React, { createContext, useState, useContext, useEffect } from "react";
import { HealingContent } from "@/types";
import { mockHealingContent } from "@/data/mockData";

interface HealingContextProps {
  healingContents: HealingContent[];
  filteredContents: HealingContent[];
  filterByType: (type: string | null) => void;
  filterByTag: (tag: string | null) => void;
  currentFilter: {
    type: string | null;
    tag: string | null;
  };
}

const HealingContext = createContext<HealingContextProps | undefined>(undefined);

export const HealingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [healingContents, setHealingContents] = useState<HealingContent[]>([]);
  const [filteredContents, setFilteredContents] = useState<HealingContent[]>([]);
  const [currentFilter, setCurrentFilter] = useState<{
    type: string | null;
    tag: string | null;
  }>({ type: null, tag: null });

  // Load mock data on mount
  useEffect(() => {
    setHealingContents(mockHealingContent);
    setFilteredContents(mockHealingContent);
  }, []);

  const filterByType = (type: string | null) => {
    setCurrentFilter((prev) => ({ ...prev, type }));
    applyFilters({ type, tag: currentFilter.tag });
  };

  const filterByTag = (tag: string | null) => {
    setCurrentFilter((prev) => ({ ...prev, tag }));
    applyFilters({ type: currentFilter.type, tag });
  };

  const applyFilters = ({
    type,
    tag,
  }: {
    type: string | null;
    tag: string | null;
  }) => {
    let filtered = [...healingContents];

    if (type) {
      filtered = filtered.filter((content) => content.type === type);
    }

    if (tag) {
      filtered = filtered.filter((content) => content.tags.includes(tag));
    }

    setFilteredContents(filtered);
  };

  return (
    <HealingContext.Provider
      value={{
        healingContents,
        filteredContents,
        filterByType,
        filterByTag,
        currentFilter,
      }}
    >
      {children}
    </HealingContext.Provider>
  );
};

export const useHealing = () => {
  const context = useContext(HealingContext);
  if (context === undefined) {
    throw new Error("useHealing must be used within a HealingProvider");
  }
  return context;
};
