import * as React from "react";

import Zoom from "@material-ui/core/Zoom";
import MuiFab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

interface Props {
  onClick: () => void;
}

const Fab: React.FC<Props> = props => {
  const { onClick, ...others } = props;
  return (
    <div {...others}>
      <Zoom
        in={true}
        style={{
          transitionDelay: `100ms`
        }}
        unmountOnExit={true}
      >
        <MuiFab color="primary" onClick={onClick}>
          <AddIcon />
        </MuiFab>
      </Zoom>
    </div>
  );
};

export default Fab;
