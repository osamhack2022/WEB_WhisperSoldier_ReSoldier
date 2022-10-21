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
  fontWeight: "500",
  fontSize: "14px",
  width: "120px",
});

export const CommentMoreOptionMenu = ({
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
          채팅 나가기
        </ChatOptionMenuItem>
        <Dialog
          open={openDialogForExitChat}
          onClose={handleCloseDialogForExitChat}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            정말로 채팅방을 나가시겠습니까? <br />
            채팅방 나가면 채팅 내역은 삭제 됩니다.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForExitChat}
              color="primary"
            >
              취소
            </ConfirmButton>
            <CancelButton
              onClick={onChatPairDeleteClick}
              color="primary"
              autoFocus
            >
              나가기
            </CancelButton>
          </DialogActions>
        </Dialog>
        <ChatOptionMenuItem onClick={handleClickOpenDialogForBlockChat}>
          채팅 차단하기
        </ChatOptionMenuItem>
        <Dialog
          open={openDialogForBlockChat}
          onClose={handleCloseDialogForBlockChat}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            채팅방을 차단하시겠습니까? <br />
            채팅방을 차단하면 해제 전까지 상대방과 채팅할 수 없습니다.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForBlockChat}
              color="primary"
            >
              취소
            </ConfirmButton>
            <CancelButton
              onClick={onBlockChatPairClick}
              color="primary"
              autoFocus
            >
              차단
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
  fontWeight: "500",
  fontSize: "14px",
  width: "140px",
});

export const CommentMoreOptionMenuForMe = ({
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
          채팅 나가기
        </ChatOptionMenuItemForBlockByMe>
        <Dialog
          open={openDialogForExitChat}
          onClose={handleCloseDialogForExitChat}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            정말로 채팅방을 나가시겠습니까? <br />
            채팅방 나가면 채팅 내역은 삭제 됩니다.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForExitChat}
              color="primary"
            >
              취소
            </ConfirmButton>
            <CancelButton
              onClick={onChatPairDeleteClick}
              color="primary"
              autoFocus
            >
              나가기
            </CancelButton>
          </DialogActions>
        </Dialog>
        <ChatOptionMenuItemForBlockByMe
          onClick={handleClickOpenDialogForBlockChat}
        >
          채팅 차단해제 하기
        </ChatOptionMenuItemForBlockByMe>
        <Dialog
          open={openDialogForBlockChat}
          onClose={handleCloseDialogForBlockChat}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            채팅방을 차단해제 하시겠습니까? <br />
            채팅방을 차단해제하면 상대방과 채팅을 할 수 있습니다.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForBlockChat}
              color="primary"
            >
              취소
            </ConfirmButton>
            <CancelButton
              onClick={onUnBlockChatPairClick}
              color="primary"
              autoFocus
            >
              해제
            </CancelButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </div>
  );
};
