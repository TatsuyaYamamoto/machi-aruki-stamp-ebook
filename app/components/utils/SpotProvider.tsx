import * as React from "react";

import { firestore } from "firebase/app";

import { Spot } from "../../domains/Spot";

interface SpotContextValue {
  spots: Spot[];
}

const SpotContext = React.createContext<SpotContextValue>({ spots: [] });

const SpotContextConsumer = SpotContext.Consumer;

const SpotContextProvider: React.FC = props => {
  const [spots, setSpots] = React.useState<Spot[]>([]);

  React.useEffect(() => {
    Spot.getAll(firestore()).then(setSpots);
  }, []);

  return (
    <SpotContext.Provider value={{ spots }}>
      {props.children}
    </SpotContext.Provider>
  );
};

export { SpotContextProvider, SpotContextConsumer };
