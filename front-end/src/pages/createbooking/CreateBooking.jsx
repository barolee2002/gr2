import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ResultBookProductSearch } from '../../components/ResultSearch/ResultSearch';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { NumericFormat } from 'react-number-format';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Numeral from 'react-numeral';
import { apiBaseUrl } from '../../constant/constant';
import { color, margin } from '@mui/system';
import { getCookie } from '../../utils/api';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import { parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import AddSupplierModal from '../../components/modal/AddSupplierModal';
import AddStorageModal from '../../components/modal/AddStorage';

const initSupplierState = {
    name: '',
    phone: '',
    email: '',
    address: '',
    debtMoney: 0,
};
const storageState = {
    name: '',
    address: '',
};

function CreateBooking() {
    const navigate = useNavigate();
    const [searchProduct, setSearchProduct] = React.useState('');
    const [search, setSearch] = useState([]);
    const [orders, setOrders] = useState([]);
    const [code, setCode] = useState();
    const [inventories, setInventories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState(null);
    const [inventory, setInventory] = useState('');
    const [dataSupplier, setDataSupplier] = useState({});
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [originalCost, setOriginalCost] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [userStaff, setUserStaff] = useState({});
    const [storage, setStorage] = useState(storageState);
    const [show, setShow] = useState('');
    const handleChange = (event) => {
        setInventory(event.target.value);
    };
    const user = JSON.parse(localStorage.getItem('sapo'));
    const [newSupplier, setNewSupplier] = useState(initSupplierState);
    const userId = user.userId;
    const currentDate = new Date();

    const changeSupplierInfo = (title, value) => {
        setNewSupplier(() => {
            return {
                ...newSupplier,
                [title]: value,
            };
        });
    };
    const changeStorageInfo = (title, value) => {
        setStorage(() => {
            return {
                ...storage,
                [title]: value,
            };
        });
    };
    const handleCloseModal = () => {
        setNewSupplier(initSupplierState);
        setStorage(storageState);
        setShow('');
    };
    React.useEffect(() => {
        let count = 0;
        for (let order of orders) {
            count += order.quantity;
        }
        setTotalQuantity(count);
    }, [quantity]);
    React.useEffect(() => {
        console.log(originalCost);
        for (let order of orders) {
            handleEditProduct(order.productName, order.size, order.color, 'price', order.originalCost * order.quantity);
        }
    }, [quantity, originalCost]);
    React.useEffect(() => {
        let count = 0;
        for (let order of orders) {
            let price = 0;
            price = order.quantity * order.originalCost;
            count += price;
        }
        setTotal(count);
        console.log(count);
    }, [quantity, originalCost]);

    const handleEditProduct = (name, size, color, field, value) => {
        console.log(orders);
        const updatedProducts = orders.map((row) =>
            row.productName === name && row.size === size && row.color === color ? { ...row, [field]: value } : row,
        );
        setOrders(updatedProducts);
    };

    const handleSubmitRequest = () => {
        let count = 0;
        for (let order of orders) {
            count += order.price;
        }
        setTotal(count);
        const dataSubmit = {
            code: code,
            inventoryName: inventory,
            staffName: userStaff.name,
            supplierName: dataSupplier.name,
            total: total,
            bookingDate: dayjs(currentDate),
            bookinglines: orders,
        };
        axios
            .post(`${apiBaseUrl}/inventory/bookings`, dataSubmit, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((res) => {
                alert('Tạo đơn đặt hàng thành công');
                navigate(`/inventory/receipt_inventory/${code}`);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    const errorMessage = error.response.data.message;
                    alert(error.response.data.message);
                } else {
                    console.error(error);
                }
            });
    };
    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/inventory/inventories`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                setInventories(response.data);
            });
        axios
            .get(`${apiBaseUrl}/inventory/suppliers`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                console.log(response?.data);
                setSuppliers(response.data);
            });
        axios
            .get(`${apiBaseUrl}/staff`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {});
        axios
            .get(`${apiBaseUrl}/inventory/product/size`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                setSizes(response.data);
            });
        axios
            .get(`${apiBaseUrl}/inventory/product/color`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                setColors(response.data);
            });
        axios
            .get(`${apiBaseUrl}/staff/${userId}`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((res) => setUserStaff(res.data));
    }, []);
    const handleOpenAddSupplier = () => {
        setShow('supplier');
        console.log(show);
    };
    const handleAddSuppier = async () => {
        try {
            const response = await axios.post(
                `${apiBaseUrl}/inventory/Suppliers`,
                {
                    ...newSupplier,
                },
                {
                    headers: {
                        Authorization: getCookie('Authorization'),
                    },
                },
            );
            setSuppliers(() => {
                return [...suppliers, response.data];
            });
            handleCloseModal();
        } catch (e) {
            console.log(e);
        }
    };
    const handleAddStorage = async () => {
        try {
            const response = await axios.post(
                `${apiBaseUrl}/inventory/inventories`,
                {
                    ...storage,
                },
                {
                    headers: {
                        Authorization: getCookie('Authorization'),
                    },
                },
            );
            setInventories(() => {
                return [...inventories, response.data];
            });
            handleCloseModal();
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Box>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <Button
                    sx={{ padding: '8px', width: '20%' }}
                    size="large"
                    variant="contained"
                    onClick={handleSubmitRequest}
                >
                    Đặt hàng
                </Button>
            </Grid>
            <Box
                sx={{
                    width: 'calc(82vw - 44px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: '6px',
                }}
            >
                <Box borderRadius={'6px'} width={'58%'} backgroundColor={'white'}>
                    <h3 style={{ marginLeft: '20px' }}>Nhập mã đặt hàng</h3>
                    <TextField
                        sx={{ marginLeft: '20px' }}
                        type="text"
                        onChange={(e) => setCode(e.target.value)}
                    ></TextField>

                    <h3 style={{ marginLeft: '20px' }}>Chọn nhà cung cấp</h3>
                    <Select
                        size="small"
                        sx={{ width: '40%', marginLeft: '20px' }}
                        value={supplier}
                        onChange={(e) => {
                            setSupplier(e.target.value);
                        }}
                    >
                        <MenuItem>
                            <p onClick={handleOpenAddSupplier}>Thêm Nhà cung cấp</p>{' '}
                        </MenuItem>
                        {suppliers?.map((item, index) => {
                            return (
                                <MenuItem onClick={() => setDataSupplier(item)} key={index} value={item?.code}>
                                    {item?.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {supplier ? (
                        <List dense={true}>
                            <ListItem sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Điện thoại :" />
                                    {/* <span>{suppliers?.find(item => item.code === supplier)}</span> */}
                                    <span>{dataSupplier.phone}</span>
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Email :" />
                                    <span>{dataSupplier.email}</span>
                                </Box>
                            </ListItem>
                            <ListItem sx={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Địa chỉ :" />
                                    <span>{dataSupplier.address}</span>
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Tiền nợ :" />
                                    <Numeral value={dataSupplier.debtMoney} format={'0,0'} />
                                </Box>
                            </ListItem>
                        </List>
                    ) : (
                        ''
                    )}
                </Box>
                <Box width={'38%'} backgroundColor={'white'} paddingBottom={'8px'} borderRadius={'4px'}>
                    <h3 style={{ marginLeft: '10px' }}>Thông tin đơn đặt hàng</h3>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText primary="Kho :" />
                            <Select size="small" sx={{ width: '50%' }} value={inventory} onChange={handleChange}>
                                <MenuItem>
                                    <p
                                        onClick={() => {
                                            setShow('storage');
                                        }}
                                    >
                                        Thêm Kho
                                    </p>
                                </MenuItem>
                                {inventories?.map((item) => {
                                    return (
                                        <MenuItem key={item.name} value={item?.name}>
                                            {item?.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Nhân viên :" />
                            <TextField size="small" sx={{ width: '50%' }} value={userStaff.name}></TextField>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Ngày nhập :" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    onChange={(e) => {}}
                                    sx={{ width: '50%' }}
                                    defaultValue={dayjs(currentDate)}
                                />
                            </LocalizationProvider>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box
                sx={{
                    width: 'calc(82vw - 44px)',
                    marginTop: '10px',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    position:"relative"
                }}
                borderRadius={'6px'}
            >
                <Box
                    borderRadius={'6px'}
                    component="form"
                    sx={{
                        p: '2px 0',
                        position: 'relative',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'white',
                    }}
                >
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1, border: '1px', padding: '10px' }}
                        placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                        inputProps={{ 'aria-label': 'Tìm kiếm theo tên hoặc mã sản phẩm' }}
                        // value={searchProduct}
                        onChange={(event) => {
                            setSearchProduct(event.target.value);
                        }}
                        onMouseEnter={useEffect(() => {
                            if (searchProduct !== '') {
                                axios
                                    .get(
                                        `${apiBaseUrl}/inventory/products/search-products?searchString=${searchProduct}`,
                                        {
                                            headers: {
                                                // token: Cookies.get('token'),
                                                Authorization: getCookie('Authorization'),
                                            },
                                        },
                                    )
                                    .then((response) => {
                                        setSearch(response.data);
                                    });
                            } else {
                                setSearch([]);
                            }
                        }, [searchProduct])}
                    />
                </Box>
                {search.length !== 0 ? (
                    <div
                        className="result_search"
                        style={{ position: 'absolute', width: '50%', height: '400px', overflow: 'hidden', zIndex: "100", top: "50px" }}
                    >
                        {search?.map((product, key) => {
                            return (
                                <Box key={key} sx={{ minWidth: '60ch', backgroundColor: 'white' }}>
                                    <ResultBookProductSearch
                                        key={key}
                                        product={product}
                                        onClick={() => {
                                            const productOder = {
                                                productCode: product.code,
                                                productName: product.name,
                                                category: product.categoryName,
                                                brand: product.brand,
                                                bookingCode: code,
                                                originalCost: 0,
                                                size: '',
                                                color: '',
                                                price: 0,
                                                quantity: 0,
                                            };
                                            setOrders((prevState) => [...prevState, productOder]);
                                            setSearch([]);
                                            setSearchProduct('');
                                        }}
                                    />
                                </Box>
                            );
                        })}
                    </div>
                ) : (
                    <></>
                )}
            </Box>{' '}
            <Box>
                <Box>
                    <TableContainer component={Box}>
                        <Table sx={{ minWidth: 650, overflow: 'scroll' }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                                <TableRow>
                                    <TableCell width="5%">STT</TableCell>
                                    <TableCell width="8%" align="center">
                                        Tên
                                    </TableCell>
                                    <TableCell width="3%" align="center"></TableCell>
                                    <TableCell width="10%" align="center">
                                        Thương hiệu
                                    </TableCell>
                                    <TableCell width="12%" align="center">
                                        Kích cỡ{' '}
                                    </TableCell>
                                    <TableCell width="8%" align="center">
                                        Màu sắc{' '}
                                    </TableCell>
                                    <TableCell width="14%" align="center">
                                        Đơn giá
                                    </TableCell>
                                    <TableCell width="10%" align="center">
                                        Số lượng
                                    </TableCell>
                                    <TableCell width="14%" align="center">
                                        Thành tiền
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ backgroundColor: '#fff' }}>
                                {orders?.map((row, key) => (
                                    <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th">{key + 1}</TableCell>
                                        <TableCell align="center">{row.productName}</TableCell>
                                        <TableCell align="center">
                                            <DeleteIcon
                                                onClick={() => {
                                                    // setOrders(() => orders.splice(orders.indexOf(row), 1));

                                                    setOrders((prevState) => prevState.filter((_, i) => i !== key));
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{row.brand}</TableCell>

                                        <TableCell align="center">
                                            <Autocomplete
                                                disablePortal
                                                freeSolo
                                                id="combo-box-demo"
                                                options={sizes}
                                                onChange={(event, e) => {
                                                    handleEditProduct(row.productName, row.size, row.color, 'size', e);
                                                }}
                                                onInputChange={(e, value) => handleEditProduct(row.productName, row.size, row.color, 'size', value)}
                                                sx={{ width: '80%' }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        // onChange={(e) => handleEditProduct(row.productName, row.size, row.color, "size" , e.target.value)}
                                                        sx={{ width: '80%' }}
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            <Autocomplete
                                                disablePortal
                                                freeSolo
                                                id="combo-box-demo"
                                                options={colors}
                                                onChange={(event, e) => {
                                                    handleEditProduct(row.productName, row.size, row.color, 'color', e);
                                                }}
                                                onInputChange={(e, value) => handleEditProduct(row.productName, row.size, row.color, 'color', value)}
                                                sx={{ width: '100%' }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        onChange={(e) =>
                                                            handleEditProduct(
                                                                row.productName,
                                                                row.size,
                                                                row.color,
                                                                'color',
                                                                e.target.value,
                                                            )
                                                        }
                                                        sx={{ width: '100%' }}
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            <TextField
                                                align="center"
                                                type="text"
                                                sx={{ width: '100%' }}
                                                variant="standard"
                                                value={row.originalCost !== 0 ? row.originalCost.toLocaleString() : ''}
                                                onChange={(e) => {
                                                    const valueWithoutCommas = e.target.value.replace(/,/g, '');
                                                    setOriginalCost(valueWithoutCommas);
                                                    handleEditProduct(
                                                        row.productName,
                                                        row.size,
                                                        row.color,
                                                        'originalCost',
                                                        parseInt(valueWithoutCommas),
                                                    );
                                                }}
                                            ></TextField>
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                align="center"
                                                type="text"
                                                sx={{ width: '100%' }}
                                                variant="standard"
                                                value={row.quantity !== 0 ? row.quantity.toLocaleString() : ''}
                                                onChange={(e) => {
                                                    const valueWithoutCommas = e.target.value.replace(/,/g, '');
                                                    setQuantity(valueWithoutCommas);
                                                    handleEditProduct(
                                                        row.productName,
                                                        row.size,
                                                        row.color,
                                                        'quantity',
                                                        parseInt(valueWithoutCommas),
                                                    );
                                                }}
                                            ></TextField>
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                align="center"
                                                type="text"
                                                sx={{ width: '100%' }}
                                                value={row.price != 0 ? row.price.toLocaleString() : ''}
                                                onChange={(e) => {
                                                    const valueWithoutCommas = e.target.value.replace(/,/g, '');
                                                    setQuantity(valueWithoutCommas);
                                                    handleEditProduct(
                                                        row.productName,
                                                        row.size,
                                                        row.color,
                                                        'price',
                                                        parseInt(valueWithoutCommas),
                                                    );
                                                }}
                                            ></TextField>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {orders.length === 0 ? (
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: '200px',
                            }}
                        >
                            <MoveToInboxIcon
                                sx={{ width: '60px', height: '60px', color: '#e8eaeb', marginBottom: '10px' }}
                            />
                            <span>Đơn đặt hành chưa có sản phẩm nào</span>
                        </Box>
                    ) : (
                        ''
                    )}
                </Box>
            </Box>
            <Box backgroundColor={'white'} marginTop={'20px'}>
                <Box sx={{ float: 'right', width: '500px', backgroundColor: 'white', borderRadius: '4px' }}>
                    <div style={{ marginLeft: '10px', paddingTop: '6px' }}>
                        <div style={{ margin: '6px' }}>
                            Số lượng: {totalQuantity ? totalQuantity.toLocaleString() : 0}
                        </div>{' '}
                        <br />
                        <div style={{ margin: '6px' }}>Thành tiền: {total ? total.toLocaleString() : 0}</div> <br />
                    </div>
                </Box>
            </Box>
            <AddSupplierModal
                open={show === 'supplier'}
                onClose={handleCloseModal}
                newSupplier={newSupplier}
                changeInfo={changeSupplierInfo}
                onConfirm={handleAddSuppier}
            />
            <AddStorageModal
                open={show === 'storage'}
                onClose={handleCloseModal}
                storage={storage}
                changeInfo={changeStorageInfo}
                onConfirm = {handleAddStorage}
            />
        </Box>
    );
}

export default CreateBooking;
