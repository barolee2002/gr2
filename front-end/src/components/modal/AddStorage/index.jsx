import { Modal, Box, Input, Button } from '@mui/material';
import React from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddStorageModal(props) {
    const { open, onClose, onConfirm, storage, changeInfo } = props;
    return (
        <React.Fragment>
            <Modal open={open} onClose={onClose}>
                <Box sx={style}>
                    <Box className="add-modal">
                        <Box className="input-field">
                            <p>Tên</p>
                            <Input
                                size="small"
                                value={storage?.name}
                                onChange={(e) => changeInfo('name', e.target.value)}
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Địa chỉ</p>
                            <Input
                                size="small"
                                value={storage?.address}
                                onChange={(e) => changeInfo('address', e.target.value)}
                            />
                        </Box>
                    </Box>
                    <Box className="action-btn">
                        <Button onClick={onClose}>Đóng</Button>
                        <Button onClick={onConfirm}>Lưu</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
