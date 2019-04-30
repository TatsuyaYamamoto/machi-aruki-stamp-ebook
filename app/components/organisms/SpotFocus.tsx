import * as React from "react";

import MuiDrawer from "@material-ui/core/Drawer/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  open: boolean;
  onClose: () => void;
  detail: {
    name: string;
    stampImageUrl: string;
  };
}

const SpotFocus: React.FC<Props> = props => {
  const { open, onClose, detail } = props;

  return (
    <MuiDrawer anchor="bottom" variant="persistent" open={open}>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <div style={{ width: 300 }}>
        <div>{detail.name}</div>
        <img width={200} height={200} src={detail.stampImageUrl} />
      </div>
    </MuiDrawer>
  );
};

export default SpotFocus;
