import { Box, Button } from '@mui/material';
import React from 'react';
import { apiBaseUrl } from '../../constant/constant';
import axios from 'axios';
import AddStaffModal from '../../components/modal/AddStaffModal';
import { DataGrid } from '@mui/x-data-grid';
import { getRole } from '../../utils/roleType';
import { useNavigate } from 'react-router-dom';
const columns = [
    { field: 'id', headerName: 'STT', flex: 0.2 },
    {
        field: 'code',
        headerName: 'Code',
        flex: 1,
        sortable: false,
    },
    {
        field: 'name',
        headerName: 'Tên',
        flex: 2,
        sortable: false,
    },
    {
        field: 'phone',
        headerName: 'Số điện thoại',
        type: 'number',
        flex: 2,
        sortable: false,
    },
    {
        field: 'email',
        headerName: 'email',
        
        sortable: false,
        flex: 2,
    },
    {
        field: 'address',
        headerName: 'Địa chỉ',
        sortable: false,
        flex: 2,
    },
    {
        field: 'role',
        headerName: 'Chức vụ',
        sortable: false,
        flex: 2,
        renderCell: (params) => <p>{getRole(params.value)}</p>
    },
];

const initState = {
    name: '',
    phone: '',
    email: '',
    address: '',
    username: '',
    password: '',
    role: '',
};
export default function Staff() {
    const navigate = useNavigate()
    const [show, setShow] = React.useState('');
    const [newStaff, setNewStaff] = React.useState(initState);
    const [staffs, setStaffs] = React.useState([])
    const handleCloseModal = () => {
        setShow('');
    };
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('sapo'));
        if(user !== null) {

            if(user.role !== 'ADMIN') {
                alert("Chức năng chỉ dành cho chủ cửa hàng")
                navigate(`/dashboard`)
            }
        }
        const fetchData = async () => {
            const response = await axios.get(`${apiBaseUrl}/list-staff`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const result = response.data.filter(data => data!== null)
            setStaffs(result)
        };
        fetchData();
    },[]);
    const handleChangeInfo = (title, value) => {
        setNewStaff(() => {
            return {
                ...newStaff,
                [title]: value,
            };
        });
    };
    const handleAddStaff = async () => {
        const user = JSON.parse(localStorage.getItem('sapo'));
        try {
            const response = await axios.post(
                `${apiBaseUrl}/creating`,
                {
                    ...newStaff,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );
            setStaffs(() => {
                return [...staffs, response.data];
            })
        } catch(e) {
            console.log(e);
        }

    };
    console.log(staffs);
    return (
        <div className="staff">
            <Box className="staff-headding">
                <Button variant="contained" onClick={() => setShow('add')}>
                    Thêm nhân viên
                </Button>
            </Box>
            <DataGrid columns={columns} rows = {staffs.map((staff, index) => {
                return {
                    ...staff,
                    id: index + 1
                    
                }
            })}/>
            <AddStaffModal open={show === 'add'} onClose={handleCloseModal} onConfirm = {handleAddStaff} changeInfo={handleChangeInfo} staff = {newStaff}/>
        </div>
    );
}
