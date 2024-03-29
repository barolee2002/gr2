import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import './CreateChecking.module.scss';
import CheckInventoryBody from '../../components/createCheckInventoryBody/CheckInventoryBody';
import { ResultCheckProductSearch } from '../../components/ResultSearch/ResultSearch';
import axios from 'axios';
import { apiBaseUrl } from '../../constant/constant';
import { getCookie } from '../../utils/api';
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';

const CreateChecking = () => {
    const navigate = useNavigate();
    const currentDate = new Date();
    const [code, setCode] = React.useState('');
    const [searchProduct, setSearchProduct] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const [checkInventoryBody, setCheckInventoryBody] = React.useState([]);
    const [inventories, setInventories] = React.useState([]);
    const [dateCreated, setDateCreated] = React.useState('');
    const [inventory, setInventory] = React.useState('');
    const [staffs, setStaffs] = React.useState([]);
    const [staff, setStaff] = React.useState('');
    const [userStaff,setUserStaff] = React.useState({})
   
    
    const handleChange = (event) => {
        setInventory(event.target.value);
    };
    const user = JSON.parse(localStorage.getItem('sapo') )
    const userId = user.userId
    // console.log(moment)
    React.useEffect(() => {
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
            .get(`${apiBaseUrl}/staff`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                setStaffs(response.data);
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
    const theme = useTheme();

    const handleDelete = (indexNumber) => {
        const updatedCheckInventoryItems = checkInventoryBody.filter((item,index) => index !== indexNumber);
        setCheckInventoryBody(updatedCheckInventoryItems);
    };
    

    // React.useEffect(() =>{

    //     console.log(checkInventoryBody)
    // })
    const handleSubmit = () => {
        const dataCheck = { 
                            code: code,
                            staffName: userStaff.name,
                            inventoryName: inventory,
                            createAt: dayjs(currentDate),
                            checkLines: checkInventoryBody
                        }
        axios.post(`${apiBaseUrl}/inventory/check_inventory`,dataCheck,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
            .then(res => {
                alert('Tạo phiếu kiểm hàng thành công')
                
            })
            
            .then((res) => {
                navigate(`/inventory/check_inventory/${code}`);
            })
            .catch((err) => {
                alert(err.response.data.message)
            });
        }
        // console.log(checkRequest)
        return (
            <Box>
                <Box sx={{ width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ float: 'left' }}>
                        <Button onClick={handleSubmit} size="large" variant="contained">
                            Tạo phiếu kiểm
                        </Button>
                    </Box>
                </Box>
                
                <Box mt={4} sx={{ width: 'calc(82vw - 44px)', justifyContent: 'space-between' }}>
                    <Box sx = {{display : "flex", justifyContent: 'space-between'}}>
                    <Box borderRadius={4} width={'60%'} backgroundColor={'white'}>
                        <Box ml={4}>
                            <h3>Nhập mã kiểm kho</h3>
                            <TextField
                                label="Mã kiểm kho"
                                // size="small"
                                // variant="outlined"
                                id="outlined-start-adornment"
                                onChange={(event) => {
                                    setCode(event.target.value);
                                }}
                                sx={{ m: 1, width: '40ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                        </Box>
                    </Box>

                    <Box borderRadius={4} width={'38%'} backgroundColor={'white'} paddingBottom={'8px'} >
                        <h3 style={{ marginLeft: '10px' }}>Thông tin đơn kiểm hàng</h3>
                        <List dense={true}>
                            <ListItem>
                                <ListItemText primary="Kho :" />
                                <Select size="small" sx={{ width: '50%' }} value={inventory} onChange={handleChange}>
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
                                <TextField
                                    size="small"
                                    sx={{ width: '50%' }}
                                    value={userStaff.name}
                                    onChange={(e) => {
                                        setStaff(e.target.value);
                                    }}
                                >
                                    
                                </TextField>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Ngày kiểm kho:" />
                                <LocalizationProvider  dateAdapter={AdapterDayjs} >
                                    <DatePicker  onChange={(e) => setDateCreated(e)} sx={{ width: '50%' } } defaultValue={dayjs(currentDate)} />
                                </LocalizationProvider>
                            </ListItem>
                        </List>
                    </Box></Box>
                <Box sx={{ width: 'calc(82vw - 44px)', marginTop: '16px' , position:"relative"}}>
                    <Paper
                        component="form"
                        sx={{
                            p: '2px 0',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, border: '1px' }}
                            placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                            inputProps={{ 'aria-label': 'Tìm kiếm theo tên hoặc mã sản phẩm' }}
                            onChange={(event) => {
                                setSearchProduct(event.target.value);
                            }}
                            onMouseEnter={useEffect(() => {
                                if (searchProduct !== '') {
                                    axios.get(`${apiBaseUrl}/inventory/product/search`,
                                            {
                                                params : {
                                                    searchString : searchProduct,
                                                    inventoryName : inventory
                                                },
                                                headers: {
                                                    // token: Cookies.get('token'),
                                                    Authorization: getCookie('Authorization'),
                                                },
                                            },
                                        )
                                        .then((response) => {
                                            console.log(response.data)
                                            setProducts(response.data);
                                        });
                                } else {
                                    setProducts([]);
                                }
                            }, [searchProduct,inventory])}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Paper>
                        {products.length !== 0 ? <div className="result_search" style={{position: "absolute", top : "50px" ,width : "100%", height: "400px", overflow: "hidden", zIndex : '100'}} >
                            {products.map((product, index) => {
                                // console.log(checkInventoryBody)
                                return (
                                    <Card sx={{ minWidth: '60ch' }}>
                                        <ResultCheckProductSearch
                                            key={index}
                                            product={product}
                                            onClick={(code, name,brand, size, color, quantity,actualQuantity,reason) => {
                                                const product1 = {
                                                    productCode: code,
                                                    productName: name,
                                                    brand: brand,
                                                    size: size,
                                                    color: color,
                                                    inventoryQuantity: quantity,
                                                    actualQuantity: 0,

                                                    reason: '',
                                                };
                                                var duplicate = false;
                                                
                                                for (var i = 0; i < checkInventoryBody.length; i++) {
                                                    if (checkInventoryBody[i].productCode === product1.productCode && checkInventoryBody[i].size === product1.size && checkInventoryBody[i].color === product1.color) {
                                                        <Alert severity="error">Đã có sản phẩm này</Alert>
                                                        duplicate = true;
                                                    }
                                                }
                                                if (duplicate === false) {
                                                    checkInventoryBody.push(product1);
                                                }
                                               
                                                setSearchProduct('');
                                            }}
                                        />
                                    </Card>
                                );
                            })}
                        </div> : <></>}
                </Box>
                

                    <Box sx={{ border: '1px solid #ccc', borderRadius: '6px' }}>
                        {checkInventoryBody ? (
                            <CheckInventoryBody
                                rows={checkInventoryBody}
                                // index={value}
                                setUpdateProducts={setCheckInventoryBody}
                                onDeleteProduct={handleDelete}
                            />
                        ) : (
                            <></>
                        )}
                    </Box>
                    {/* </Box> */}

                    <Box backgroundColor={'white'} marginTop={'20px'}>
                        <Box sx={{ float: 'right' }}></Box>
                    </Box>
                </Box>
            </Box>
        );
    };


export default CreateChecking;
