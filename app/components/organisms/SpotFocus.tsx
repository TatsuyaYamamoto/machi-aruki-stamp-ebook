import * as React from "react";

import styled from "styled-components";
import MuiDrawer from "@material-ui/core/Drawer/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const Root = styled.div``;

const Name = styled.div`
  font-size: 20px;
`;

const CloseButton = styled(props => (
  <div className={props.className}>
    <IconButton onClick={props.onClick}>
      <CloseIcon />
    </IconButton>
  </div>
))`
  position: absolute;
  top: 8px;
  right: 20px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Address = styled.div``;

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
      <Root>
        <CloseButton onClick={onClose} />
        <Name>{detail.name}</Name>
        <Image src={detail.stampImageUrl} />
      </Root>
    </MuiDrawer>
  );
};

export default SpotFocus;
