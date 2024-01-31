import { Modal, Box, Input, Button,Select,MenuItem } from '@mui/material';
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
export default function AddStaffModal(props) {
    const { open, onClose, onConfirm, staff, changeInfo } = props;
    return (
        <React.Fragment>
            <Modal open={open} onClose={onClose}>
                <Box sx={style}>
                    <Box className="add-modal">
                        <Box className="input-field">
                            <p>Tên</p>
                            <Input
                                size="small"
                                value={staff?.name}
                                onChange={(e) => changeInfo('name', e.target.value)}
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Điện thoại</p>
                            <Input
                                size="small"
                                value={staff?.phone}
                                onChange={(e) => changeInfo('phone', e.target.value)}
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Email</p>
                            <Input
                                size="small"
                                value={staff?.email}
                                onChange={(e) => changeInfo('email', e.target.value)}
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Địa chỉ</p>
                            <Input
                                size="small"
                                value={staff?.address}
                                onChange={(e) => changeInfo('address', e.target.value)}
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Tên đăng nhập</p>
                            <Input
                                size="small"
                                value={staff?.username}
                                onChange={(e) => changeInfo('username', e.target.value)}
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Mật khẩu</p>
                            <Input
                                size="small"
                                value={staff?.password}
                                onChange={(e) => changeInfo('password', e.target.value)}
                            />
                        </Box>
                        <Box className="input-field">
                            <p>Chức vụ</p>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={staff?.role}
                                label="Age"
                                onChange={(e) => changeInfo('role', e.target.value)}
                            >
                                <MenuItem value={"INVENTORY"}>Nhân viên kho</MenuItem>
                                <MenuItem value={'SALE'}>Nhân viên bán hàng</MenuItem>
                                <MenuItem value={'CUSTOMER'}>Nhân viên chăm sóc khách hàng</MenuItem>
                            </Select>
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
