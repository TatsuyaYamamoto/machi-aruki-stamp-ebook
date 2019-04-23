import * as React from "react";
const { useState, useEffect } = React;
import styled from "styled-components";
import LazyLoad from "react-lazyload";

import AppBar from "../organisms/AppBar";
import BottomNavigation from "../organisms/BottomNavigation";

import { StoreStamp } from "../../domains/StoreStamp";

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StampPage = () => {
  const [storeStamps, setStoreStamps] = useState<StoreStamp[]>([]);
  useEffect(() => {
    StoreStamp.getAll().then(stamps => {
      setStoreStamps(stamps);
    });
  }, []);

  return (
    <>
      <AppBar />
      {storeStamps.map(s => {
        return (
          <div key={s.name}>
            <div>{s.name}</div>
            <div>{s.description}</div>
            <div>{s.geopoint.latitude}</div>
            <div>{s.geopoint.longitude}</div>
            <LazyLoad>
              <img src={s.imageUrl} />
            </LazyLoad>
          </div>
        );
      })}
      <StyledBottomNav />
    </>
  );
};

export default StampPage;
