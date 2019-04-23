import * as React from "react";
const { useState, useEffect } = React;
import styled from "styled-components";

import AppBar from "../organisms/AppBar";
import BottomNavigation from "../organisms/BottomNavigation";

import { Stamp } from "../../domains/Stamp";

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StampPage = () => {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  useEffect(() => {
    Stamp.getOwns().then(owns => {
      setStamps(owns);
    });
  }, []);

  return (
    <>
      <AppBar />
      {stamps.map(s => {
        return (
          <div key={s.name}>
            <div>{s.name}</div>
            <div>{s.note}</div>
            <div>{s.createdAt.toLocaleString()}</div>
          </div>
        );
      })}
      <StyledBottomNav />
    </>
  );
};

export default StampPage;
