import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getRandomInteger } from "../../utils/calculation";
import { MEMBERS } from "../../domains/Member";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const MachiArukiStampPageLinkDialog: React.FC<Props> = props => {
  const { open, handleClose } = props;
  const onClicked = () => {
    location.href = "https://www.llsunshine-numazu.jp/";
  };
  const getBannerUrl = () => {
    const int = getRandomInteger(8);
    const member = Object.keys(MEMBERS)[int];
    return `/assets/images/${member}.png`;
  };

  const [bannerUrl, setBannerUrl] = React.useState(getBannerUrl());

  React.useEffect(() => {
    if (open) {
      setBannerUrl(getBannerUrl);
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>リンク</DialogTitle>
        <DialogContent>
          <DialogContentText>
            下のバナーをタップすると、「沼津まちあるきスタンプ」公式ページへ移動します。
          </DialogContentText>
          <img src={bannerUrl} onClick={onClicked} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MachiArukiStampPageLinkDialog;
