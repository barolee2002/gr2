import React from 'react';
import Box from '@mui/material/Box';
import './ResultSearch.scss';
import DeleteIcon from '@mui/icons-material/Delete';
export function ResultSupllierSearch(props) {
    const supllier = props.supllier;
    console.log(supllier);
    return (
        <div className="result-search" onClick={props.onClick}>
            <p>{supllier.name}</p>
        </div>
    );
}
export function ResultCheckLineSearch(props) {
    const checkLine = props.checkLine;
    console.log(checkLine);
    return (
        <div className="result-search" onClick={props.onClick}>
            <p>{checkLine.name}</p>
        </div>
    );
}
export function ResultCheckRequestSearch(props) {
    const checkRequest = props.checkRequest;
    return (
        <div className="result-search" onClick={props.onClick}>
            <p>{checkRequest.code}</p>
            <p>{checkRequest.staffName}</p>
        </div>
    );
}
export function ResultCustomerSearch(props) {
    const customer = props.customer;
    return (
        <div className="result-search" onClick={props.onClick}>
            <p>{customer?.name}</p>
            <p>{customer?.email}</p>
            <p>{customer?.phone}</p>
        </div>
    );
}

export function Customer(props) {
    const customer = props.customer;
    const handleDeleteCustomer = props.handleDeleteCustomer;
    return (
        <div className="result-search customer" onClick={props.onClick}>
            <div>
                <p>{customer?.name}</p>
                <p>{customer?.email}</p>
                <p>{customer?.phone}</p>
            </div>
            <div className="delete_icon">
                <DeleteIcon onClick={handleDeleteCustomer} />
            </div>
        </div>
    );
}

export function ResultProductSearch(props) {
    const {product, onClick} = props
    return (
        <React.Fragment>
            {product?.attributes?.map((attribute) => (
                <div className="result-product-search" onClick={()=> onClick(product.code, product.name,attribute?.quantity,product.image, attribute?.price,attribute?.id,attribute?.size, attribute?.color)}>
                    <div className="image">
                        {product.image === null ? (
                            <img
                                src="https://4.bp.blogspot.com/-TS4lmqV47YE/VPB9HxU2tUI/AAAAAAAAAJE/6XhGWPODrbs/s1600/hinh-nen-de-thuong-cho-may-tinh-7.jpg"
                                alt=""
                            />
                        ) : (
                            <img src={product.image} alt="" />
                        )}
                    </div>
                    <div>
                        <p>{product.name}</p>
                        <p>Số lượng:{attribute.quantity}</p>
                    </div>
                    <div>Size&color: {attribute.size + ',' + attribute.color}</div>
                    <p>Giá:{attribute.price}</p>
                </div>
            ))}
        </React.Fragment>
    );
}
export function ResultBookProductSearch(props) {
    const {product, onClick} = props
    return (
        <React.Fragment>
                <div className="result-product-search" onClick={()=> onClick(product.code, product.name,product.image)}>
                    <div className="image">
                        {product.image === null ? (
                            <img
                                src="https://4.bp.blogspot.com/-TS4lmqV47YE/VPB9HxU2tUI/AAAAAAAAAJE/6XhGWPODrbs/s1600/hinh-nen-de-thuong-cho-may-tinh-7.jpg"
                                alt=""
                            />
                        ) : (
                            <img src={product.image} alt="" />
                        )}
                    </div>
                    <div>
                        <p>{product.name}</p>
                    </div>
                    <div>
                        <p>{product.categoryName}</p>
                    </div>
                    <div>
                        <p>{product.brand}</p>
                    </div>
                </div>
        </React.Fragment>
    );
}
export function ResultCheckProductSearch(props) {
    const {product, onClick} = props
    return (
        <React.Fragment>
            {product?.attributes?.map((attribute) => (
                <div className="result-product-search" onClick={()=> onClick(product.code, product.name,product.brand, attribute.size, attribute.color,attribute.quantity)}>
                    <div className="image">
                        {product.image === null ? (
                            <img
                                src="https://4.bp.blogspot.com/-TS4lmqV47YE/VPB9HxU2tUI/AAAAAAAAAJE/6XhGWPODrbs/s1600/hinh-nen-de-thuong-cho-may-tinh-7.jpg"
                                alt=""
                            />
                        ) : (
                            <img src={product.image} alt="" />
                        )}
                    </div>
                    <div>
                        <p>{product.name}</p>
                        <p>Số lượng:{attribute.quantity}</p>
                    </div>
                    <div>Size&color: {attribute.size + ',' + attribute.color}</div>
                    <p>Giá:{attribute.price}</p>
                </div>
            ))}
        </React.Fragment>
    );
}

export function RetailCustomers() {
    return (
        <div className="result-search">
            <p>Thêm khách lẻ</p>
        </div>
    );
}
