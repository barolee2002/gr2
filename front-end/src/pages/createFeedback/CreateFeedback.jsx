import { red } from '@mui/material/colors';
import './CreateFeedback.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchCustomer from './searchCustomer/SearchCustomer';
import { useContext, useRef, useState } from 'react';
import APIapp from '../../components/APIapp/APIapp';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { display } from '@mui/system';
import { AuthContext } from '../../context/AuthContext';

function CreateFeedback() {
    const [resultByCode, setResultByCode] = useState([]);
    const [resultByPhone, setResultByPhone] = useState([]);
    const [viewResultByCode, setViewResultByCode] = useState(false);
    const [viewResultByPhone, setViewResultByPhone] = useState(false);
    const [code, setCode] = useState('');

    const [customerCode, setCustomerCode] = useState('');
    const [phone, setPhone] = useState('');
    const [customer, setCustomer] = useState({});
    const [feedback, setFeedback] = useState({
        customerCode: '',
        phone: '',
        staffCode: 'S003',
        content: '',
        status: 'S1',
    });
    const [baseInforStyle, setBaseInfor] = useState({
        display: 'block',
    });
    const [fixedInforStyle, setFixedInfor] = useState({
        display: 'none',
    });
    const navigate = useNavigate();
    const urlSearchParam = new URLSearchParams(window.location.search);
    const param = urlSearchParam.get('code');
    useEffect(() => {
        if (localStorage.getItem('sapo').length > 0) {
            const user = JSON.parse(localStorage.getItem('sapo'));
            console.log(user);
            setCode(user.code);
        }
        if (param !== null) {
            const getCurrentCustomer = async () => {
                const res = await APIapp.get(`/admin/care/customers/` + param);
                console.log(res);
                setCustomer(res.data);
                setCustomerCode(res.data.code);
                setPhone(res.data.phone);
            };
            getCurrentCustomer();
            setBaseInfor({ ...baseInforStyle, display: 'none' });
            setFixedInfor({ ...fixedInforStyle, display: 'block' });
            console.log(localStorage.getItem('sapo'));
        }
    }, []);
    console.log(code);
    const getCustomerbyCode = async (code) => {
        const res = await APIapp.get(`/admin/care/customers/search/code?code=${code}`);
        console.log(res);
        setResultByCode(res.data);
    };

    const handleSearchByCode = () => {
        if (customerCode !== '' && customerCode !== customer.code) {
            getCustomerbyCode(customerCode);
            setViewResultByCode(true);
        } else setViewResultByCode(false);
    };

    const handleSearchByPhone = async () => {
        if (phone !== '' && phone !== customer.phone) {
            const res = await APIapp.get(`/admin/care/customers/search?phone=${phone}`);
            console.log(res);
            setResultByPhone(res.data);
            setViewResultByPhone(true);
        } else setViewResultByPhone(false);
    };

    const handleChangeCustomer = (thisCustomer) => {
        console.log(thisCustomer);
        setCustomer(thisCustomer);
        setCustomerCode(thisCustomer.code);
        setPhone(thisCustomer.phone);
        setFeedback({ ...feedback, customerCode: thisCustomer.code, phone: thisCustomer.phone, staffCode: code });
        setViewResultByCode(false);
        setViewResultByPhone(false);
    };
    // useEffect(()=>{
    //     )
    // },[customerCode,phone])

    const handleCreateFeeback = async () => {
        try {
            const res = await APIapp.post(`/admin/care/feedbacks`, {
                ...feedback,
                staffCode: code,
            });
            console.log(res);
            window.alert('Create success!');
            navigate(`/care/feedbacks/${res.data.feedback.id}`);
        } catch (e) {
            window.alert('Yếu cầu điền đúng thông tin khách hàng tồn tại trên hệ thống');
        }
    };

    const handleReturn = () => {
        navigate(`/care/feedbacks`);
    };
    return (
        <div className="createfeedback">
            <div className="header">
                <span className="return" onClick={handleReturn}>
                    <ChevronLeftIcon className="icon" />
                    Quay lại trang danh sách
                </span>
                <div className="btn">
                    <button className="createbtn" onClick={handleCreateFeeback}>
                        Tạo phản hồi
                    </button>
                </div>
            </div>
            <div className="fixedinfor" style={fixedInforStyle}>
                <div className="title">
                    <span>Thông tin khởi tạo</span>
                    {/* <a href="">Cập nhật</a> */}
                </div>
                <div className="infor">
                    <div className="leftname">
                        <p>Mã khách hàng</p>
                    </div>
                    <div className="leftcontent">
                        <p>: {customerCode}</p>
                    </div>
                    <div className="rightname">
                        <p>SDT khách hàng</p>
                    </div>
                    <div className="rightcontent">
                        <p>: {phone}</p>
                    </div>
                </div>
            </div>
            <div className="baseinfor" style={baseInforStyle}>
                <div className="title">
                    <span>Thông tin khởi tạo</span>
                </div>
                <div className="infor">
                    <label>
                        Mã khách hàng<span className="redstar">*</span>
                    </label>
                    <input
                        type="text"
                        value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                        onMouseEnter={handleSearchByCode}
                    />
                    {viewResultByCode && (
                        <div className="customerbycode">
                            <SearchCustomer
                                data={resultByCode}
                                onChangeCustomer={(thisCustomer) => handleChangeCustomer(thisCustomer)}
                            />
                        </div>
                    )}
                    <label>
                        SDT khách hàng<span className="redstar">*</span>
                    </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onMouseEnter={handleSearchByPhone}
                    />
                    {viewResultByPhone && (
                        <div className="customerbyphone">
                            <SearchCustomer
                                data={resultByPhone}
                                onChangeCustomer={(thisCustomer) => handleChangeCustomer(thisCustomer)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="content">
                <div className="title">
                    <span>Nội dung phản hồi</span>
                </div>
                <div className="input">
                    <label>
                        Nội dung<span className="redstar">*</span>
                    </label>
                    <textarea
                        name=""
                        id=""
                        placeholder=""
                        onChange={(e) => setFeedback({ ...feedback, content: e.target.value })}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default CreateFeedback;
