import * as React from "react";

import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import AppIcon from "@material-ui/icons/AppsSharp";
import CreatorIcon from "@material-ui/icons/Computer";
import VersionIcon from "@material-ui/icons/Build";
import OssIcon from "@material-ui/icons/LibraryBooks";

import * as packageJson from "../../../package.json";
import OssLicenseDialog from "./OssLicenseDialog";
import GuideDialog from "./GuideDialog";
import MachiArukiStampPageLinkDialog from "./MachiArukiStampPageLinkDialog";

const AppBar = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openOssDialog, setOpenOssDialog] = React.useState(false);
  const [openGuide, setOpenGuide] = React.useState(false);
  const [openMachiArukiLink, setOpenMachiArukiLink] = React.useState(false);

  const onMenuClicked = () => {
    setOpenDrawer(true);
  };

  const onMenuClose = () => {
    setOpenDrawer(false);
  };

  const handleGuidePage = () => {
    setOpenGuide(!openGuide);
  };

  const handleOssDialog = () => {
    setOpenOssDialog(!openOssDialog);
  };

  const handleAboutMachiaruki = () => {
    setOpenMachiArukiLink(!openMachiArukiLink);
  };

  const handleAppVersion = () => {
    location.href = packageJson.repository;
  };

  return (
    <>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={onMenuClicked}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={onMenuClose}
        PaperProps={{ style: { width: 300 } }}
      >
        <List subheader={<ListSubheader>ヘルプ</ListSubheader>}>
          <ListItem button={true} onClick={handleGuidePage}>
            <ListItemText primary={"このアプリはなに"} />
          </ListItem>
          <ListItem button={true} onClick={handleAboutMachiaruki}>
            <ListItemText primary={"沼津まちあるきスタンプ"} />
          </ListItem>
        </List>

        <Divider />
        <List subheader={<ListSubheader>概要</ListSubheader>}>
          <ListItem button={true}>
            <ListItemIcon>
              <AppIcon />
            </ListItemIcon>
            <ListItemText primary={"アプリについて"} />
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon>
              <CreatorIcon />
            </ListItemIcon>
            <ListItemText primary={"製作者について"} />
          </ListItem>
          <ListItem button={true} onClick={handleOssDialog}>
            <ListItemIcon>
              <OssIcon />
            </ListItemIcon>
            <ListItemText
              primary={"オープンソースライセンス"}
              secondary={"オープンソーススフとウェアに関するライセンスの詳細"}
            />
          </ListItem>
          <ListItem button={true} onClick={handleAppVersion}>
            <ListItemIcon>
              <VersionIcon />
            </ListItemIcon>
            <ListItemText
              primary={"アプリのバージョン"}
              secondary={`バージョン: v${packageJson.version}`}
            />
          </ListItem>
        </List>
      </Drawer>

      <MachiArukiStampPageLinkDialog
        open={openMachiArukiLink}
        handleClose={handleAboutMachiaruki}
      />
      <GuideDialog open={openGuide} handleClose={handleGuidePage} />
      <OssLicenseDialog open={openOssDialog} handleClose={handleOssDialog} />
    </>
  );
};

export default AppBar;
