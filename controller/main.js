//Tạo đối tượng dssv từ lớp đối tượng DSSV
var dssv = new DSSV();
function getEle(id) {
    return document.getElementById(id);
};
/**
 * Them Sinh Vien
 * Callback function: hàm có tham số là 1 hàm khác (or tham số của hàm là 1 hàm)
 */
//Lay thong tin sinh vien
function layThongTinSV() {
    //Lấy thông tin từ User
    var _maSV = getEle("txtMaSV").value;
    var _tenSV = getEle("txtTenSV").value;
    var _email = getEle("txtEmail").value;
    var _matKhau = getEle("txtPass").value;
    var _ngaySinh = getEle("txtNgaySinh").value;
    var _khoaHoc = getEle("khSV").value; //Select Option nếu không đặt Value thì sẽ lấy trực tiếp string 
    var _toan = getEle("txtDiemToan").value;
    var _ly = getEle("txtDiemLy").value;
    var _hoa = getEle("txtDiemHoa").value;

    //Tao doi tuong sv tu lop doi tuong SinhVien
    var sv = new SinhVien(_maSV, _tenSV, _email, _matKhau, _ngaySinh, _khoaHoc, _toan, _ly, _hoa);
    //Tính điểm trung bình
    sv.tinhDTB();
    return sv;
};
getEle("btnThemSV").addEventListener("click", function () {
    //Lấy thông tin Sinh viên
    var sv = layThongTinSV();
    //Thêm sinh viên vào mảng arr cua DSSV
    dssv.themSV(sv);
    //Render data ra table
    renderTable(dssv.arr);
    setLocalStorage();
});

// function renderTable (data) {
//     /**
//      * Render data ra table
//      * Tạo dòng <=> dv đc thêm
//      * Trong dòng => có cột (6)
//      * 
//      * 0. tạo biến tích luỹ content = string
//      * 1. duyệt mảng data
//      * 2. lấy object sv thông qua data[i] <=> sv = data[i]
//      * 3. tạo dòng
//      * 4. tạo cột
//      * 5. tích luỹ dòng vào biến content
//      * 6. DOM tới tbodySinhVien gán content
//      */

//     var content = "";
//     for (var i = 0; i < data.length; i++) {
//         var sv = data[i];
//         content += "<tr>";
//         content += "<td>" + sv.maSV +"</td>";
//         content += "<td>" + sv.tenSV +"</td>";
//         content += "<td>" + sv.email +"</td>";
//         content += "<td>" + sv.ngaySinh +"</td>";
//         content += "<td>" + sv.khoaHoc +"</td>";
//         content += "<td>" + sv.dtb +"</td>";
//         content += "</tr>"
//     }
//     getEle("tbodySinhVien").innerHTML = content;
// };
// Sử dụng string template
function renderTable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var sv = data[i];
        content += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                <td>${sv.ngaySinh}</td>
                <td>${sv.khoaHoc}</td>
                <td>${sv.dtb}</td>
                <td>
                    <button class="btn btn-info" onclick="editSV('${sv.maSV}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteSV('${sv.maSV}')">Delete</button>
                </td>
            </tr>
        `;
    }
    getEle("tbodySinhVien").innerHTML = content;
};
//Xoá Sinh viên
function deleteSV(maSV) {
    dssv.xoaSV(maSV);
    renderTable(dssv.arr);
    setLocalStorage();
};
//Sua Sinh Vien
function editSV(maSV) {
    var sv = dssv.layThongTinSV(maSV);
    if (sv) {
        //display btnCapNhatSV
        getEle("btnCapNhatSV").style.display = "inline-block";
        getEle("btnReSetSV").style.display = "inline-block";
        //hide btnThemSV
        getEle("btnThemSV").style.display = "none";
        //Dom toi cac the Input => show value tu sv
        getEle("txtMaSV").value = sv.maSV;
        //disable MaSV
        getEle("txtMaSV").disabled = true;
        getEle("txtTenSV").value = sv.tenSV;
        getEle("txtEmail").value = sv.email;
        getEle("txtPass").value = sv.matKhau;
        getEle("txtNgaySinh").value = sv.ngaySinh;
        getEle("khSV").value = sv.khoaHoc;
        getEle("txtDiemToan").value = sv.toan;
        getEle("txtDiemLy").value = sv.ly;
        getEle("txtDiemHoa").value = sv.hoa;
    }
    //console.log(maSV);
};
// Cap nhat Sinh Vien 
getEle("btnCapNhatSV").addEventListener("click", function () {
    var sv = layThongTinSV();
    dssv.capNhatSV(sv);
    renderTable(dssv.arr);
    setLocalStorage();

});
// Reset Sinh Vien 
getEle("btnReSetSV").addEventListener("click", function () {
    //display btnCapNhatSV
    getEle("btnThemSV").style.display = "inline-block";
    //hide btnThemSV
    getEle("btnCapNhatSV").style.display = "none";
    getEle("btnReSetSV").style.display = "none";
})
//Tim kiem sinh vien
getEle("txtSearch").addEventListener("keyup", function () {
    var keyword = getEle("txtSearch").value;
    var mangTimKiem = dssv.timKiemSV(keyword);
    renderTable(mangTimKiem);
});
getLocalStorage();
//Set Local Storage
function setLocalStorage() {
    //convert JSON => string
    var dataString = JSON.stringify(dssv.arr);
    //set local storage
    localStorage.setItem("DSSV", dataString);
};
//Get Local Storage
function getLocalStorage() {
    if (localStorage.getItem("DSSV")) {
        var dataString = localStorage.getItem("DSSV");
        //convert String => Json
        dssv.arr = JSON.parse(dataString);
        //render lại Table
        renderTable(dssv.arr);
    }
};

