function SinhVien (_maSV, _tenSV, _email, _matKhau, _ngaySinh, _khoaHoc, _toan, _ly, _hoa) {
    this.maSV = _maSV;
    this.tenSV = _tenSV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngaySinh = _ngaySinh;
    this.khoaHoc = _khoaHoc;
    this.toan = _toan;
    this.ly = _ly;
    this.hoa = _hoa;
    this.dtb = 0;

    this.tinhDTB = function () {
        this.dtb = (Number(this.toan) + Number(this.ly) + Number(this.hoa)) / 3;
    };
}