import * as React from "react";

import styled from "styled-components";

import BottomNavigation from "../organisms/BottomNavigation";

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StampPage = () => {
  return (
    <>
      Stamp!!
      <StyledBottomNav />
    </>
  );
};

export default StampPage;
