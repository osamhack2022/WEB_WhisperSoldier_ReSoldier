import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import { Dialog, DialogActions } from "@mui/material";
import { useState } from "react";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";

const ITEM_HEIGHT = 48;

const ChatOptionMenuItem = styled(MenuItem)({
  backgroundColor: "rgba(0, 0, 0, 0)",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "400",
  fontSize: "14px",
  width: "120px",
});

export const ChatContentOptionMenu = ({
  onChatPairDeleteClick,
  onBlockChatPairClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialogForExitChat, setOpenDialogForExitChat] = useState(false);
  const [openDialogForBlockChat, setOpenDialogforBlockChat] = useState(false);

  const handleClickOpenDialogForExitChat = () => {
    setOpenDialogForExitChat(true);
  };

  const handleCloseDialogForExitChat = () => {
    setOpenDialogForExitChat(false);
    setAnchorEl(null);
  };

  const handleClickOpenDialogForBlockChat = () => {
    setOpenDialogforBlockChat(true);
  };

  const handleCloseDialogForBlockChat = () => {
    setOpenDialogforBlockChat(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "120px",
          },
        }}
      >
        <ChatOptionMenuItem onClick={handleClickOpenDialogForExitChat}>
          ?????? ?????????
        </ChatOptionMenuItem>
        <Dialog
          open={openDialogForExitChat}
          onClose={handleCloseDialogForExitChat}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            ????????? ???????????? ?????????????????????? <br />
            ????????? ????????? ?????? ????????? ?????? ?????????.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForExitChat}
              color="primary"
            >
              ??????
            </ConfirmButton>
            <CancelButton
              onClick={onChatPairDeleteClick}
              color="primary"
              autoFocus
            >
              ?????????
            </CancelButton>
          </DialogActions>
        </Dialog>
        <ChatOptionMenuItem onClick={handleClickOpenDialogForBlockChat}>
          ?????? ????????????
        </ChatOptionMenuItem>
        <Dialog
          open={openDialogForBlockChat}
          onClose={handleCloseDialogForBlockChat}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            ???????????? ????????????????????????? <br />
            ???????????? ???????????? ?????? ????????? ???????????? ????????? ??? ????????????.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForBlockChat}
              color="primary"
            >
              ??????
            </ConfirmButton>
            <CancelButton
              onClick={onBlockChatPairClick}
              color="primary"
              autoFocus
            >
              ??????
            </CancelButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </div>
  );
};

const ChatOptionMenuItemForBlockByMe = styled(MenuItem)({
  backgroundColor: "rgba(0, 0, 0, 0)",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "400",
  fontSize: "14px",
  width: "140px",
});

export const ChatContentOptionMenuBlockByMe = ({
  onChatPairDeleteClick,
  onUnBlockChatPairClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialogForExitChat, setOpenDialogForExitChat] = useState(false);
  const [openDialogForBlockChat, setOpenDialogforBlockChat] = useState(false);

  const handleClickOpenDialogForExitChat = () => {
    setOpenDialogForExitChat(true);
  };

  const handleCloseDialogForExitChat = () => {
    setOpenDialogForExitChat(false);
    setAnchorEl(null);
  };

  const handleClickOpenDialogForBlockChat = () => {
    setOpenDialogforBlockChat(true);
  };

  const handleCloseDialogForBlockChat = () => {
    setOpenDialogforBlockChat(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "140px",
          },
        }}
      >
        <ChatOptionMenuItemForBlockByMe
          onClick={handleClickOpenDialogForExitChat}
        >
          ?????? ?????????
        </ChatOptionMenuItemForBlockByMe>
        <Dialog
          open={openDialogForExitChat}
          onClose={handleCloseDialogForExitChat}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            ????????? ???????????? ?????????????????????? <br />
            ????????? ????????? ?????? ????????? ?????? ?????????.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForExitChat}
              color="primary"
            >
              ??????
            </ConfirmButton>
            <CancelButton
              onClick={onChatPairDeleteClick}
              color="primary"
              autoFocus
            >
              ?????????
            </CancelButton>
          </DialogActions>
        </Dialog>
        <ChatOptionMenuItemForBlockByMe
          onClick={handleClickOpenDialogForBlockChat}
        >
          ?????? ???????????? ??????
        </ChatOptionMenuItemForBlockByMe>
        <Dialog
          open={openDialogForBlockChat}
          onClose={handleCloseDialogForBlockChat}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            ???????????? ???????????? ??????????????????? <br />
            ???????????? ?????????????????? ???????????? ????????? ??? ??? ????????????.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForBlockChat}
              color="primary"
            >
              ??????
            </ConfirmButton>
            <CancelButton
              onClick={onUnBlockChatPairClick}
              color="primary"
              autoFocus
            >
              ??????
            </CancelButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </div>
  );
};
