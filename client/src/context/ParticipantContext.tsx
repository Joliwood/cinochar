import React, {
  createContext,
  useState,
  useMemo,
  FC,
} from 'react';
import type { Participant, ParticipantContextType, Props } from '@/@types';

const ParticipantContext = createContext<ParticipantContextType>({
  participant: [],
  setParticipant: () => {},
});

const ParticipantContextProvider: FC<Partial<Props>> = ({ children }) => {
  const [participant, setParticipant] = useState<Participant[]>([]);

  const participantState: ParticipantContextType = useMemo(() => (
    { participant, setParticipant }
  ), [participant, setParticipant]);

  return (
    <ParticipantContext.Provider value={participantState}>
      {children}
    </ParticipantContext.Provider>
  );
};

export default ParticipantContextProvider;
