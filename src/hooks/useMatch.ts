import { useCallback, useMemo, useRef, useState } from 'react';
import Match from '../lib/MiniManager/Match';
import { Team } from '../lib/MiniManager/types';

type IntervalRef = ReturnType<typeof setInterval>;

const useMatch = (homeTeam: Team, visitorTeam: Team) => {
  const [, setRenderFlag] = useState(false); // State for React update the screen
  const clockIntervalRef = useRef<IntervalRef>();

  const match = useMemo(() => new Match(homeTeam, visitorTeam), []);

  const handleClockTick = useCallback(() => {
    setRenderFlag((rf) => !rf);
    match.tickClock();
  }, [match]);

  const startClock = (speed = 1) => {
    if (!clockIntervalRef.current) {
      clockIntervalRef.current = setInterval(handleClockTick, 1000 / speed);
    } else {
      alert('The match is already started!');
    }
  };

  const stopClock = () => {
    if (clockIntervalRef.current) {
      clearInterval(clockIntervalRef.current);
      delete clockIntervalRef.current;
    }
  };

  return {
    match,
    startClock,
    stopClock,
  };
};

export default useMatch;
