import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        
        <ChatOptionMenuItem onClick={handleClickOpenDialog}>
          채팅 나가기
        </ChatOptionMenuItem>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            정말로 채팅방을 나가시겠습니까? <br />
            채팅방 나가면 채팅 내역은 삭제 됩니다.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton onClick={handleCloseDialog} color="primary">
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
        <ChatOptionMenuItem onClick={onBlockChatPairClick}>
          채팅 차단하기
        </ChatOptionMenuItem>
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

export const ChatContentOptionMenuBlockByMe = ({onChatPairDeleteClick, onUnBlockChatPairClick})=>{
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        
        <ChatOptionMenuItemForBlockByMe onClick={handleClickOpenDialog}>
          채팅 나가기
        </ChatOptionMenuItemForBlockByMe>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>
            정말로 채팅방을 나가시겠습니까? <br />
            채팅방 나가면 채팅 내역은 삭제 됩니다.
          </WsDialogTitle>
          <DialogActions>
            <ConfirmButton onClick={handleCloseDialog} color="primary">
              취소
            </ConfirmButton>
            <CancelButton
              color="primary"
              autoFocus
            >
              나가기
            </CancelButton>
          </DialogActions>
        </Dialog>
        <ChatOptionMenuItemForBlockByMe onClick={onUnBlockChatPairClick}>
          채팅 차단해제하기
        </ChatOptionMenuItemForBlockByMe>
      </Menu>
    </div>
  );
}