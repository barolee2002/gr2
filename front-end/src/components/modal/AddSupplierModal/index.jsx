import { Modal, Box, Input, Typography, Button } from '@mui/material';
import React from 'react';
import './style.scss';
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

export default function AddSupplierModal(props) {
    const { open, onClose, onConfirm, newSuplier, changeInfo } = props;
    return (
        <React.Fragment>
            <Modal open={open} onClose={onClose}>
                <Box sx={style}>
                    <Box className="add-modal">
                        <Box className="input-field">
                            <p>Tên</p>
                            <Input
                                size="small"
                                value={newSuplier?.name}
                                onChange={(e) => changeInfo('name', e.target.value)}
                                className=""
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Số điện thoại</p>
                            <Input
                                size="small"
                                value={newSuplier?.phone}
                                onChange={(e) => changeInfo('phone', e.target.value)}
                                className=""
                            />
                        </Box>
                        <Box className="input-field">
                            <p>email</p>
                            <Input
                                size="small"
                                value={newSuplier?.email}
                                onChange={(e) => changeInfo('email', e.target.value)}
                                className=""
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Địa chỉ</p>
                            <Input
                                size="small"
                                value={newSuplier?.address}
                                onChange={(e) => changeInfo('address', e.target.value)}
                                className=""
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
