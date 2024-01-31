export const getRole = (role) => {
    if(role === "INVENTORY") {return "Nhân viên kho"}
    if(role === "SALE") {return "Nhân viên bán hàng"}
    if(role === "CUSTOMER") {return "Nhân viên chăm sóc khách hàng"}
}