function DSSV () {
    this.arr = []; //Mang giup chua nhieu doi tuong

    this.themSV = function (sv) {
        this.arr.push(sv);
    };
    this.timViTri = function (maSV) {
        var index = -1;
        for (i = 0; i < this.arr.length; i++) {
            var sv = this.arr[i];
            if (sv.maSV === maSV) {
                index = i;
                break;
            }
        }
        return index;
    };
    this.xoaSV = function (maSV) {
        var index = this.timViTri(maSV);
        if (index !== -1) {
            this.arr.splice(index,1);
        }
    };
    this.layThongTinSV = function (maSV) {
        var index = this.timViTri(maSV);
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };
    this.capNhatSV = function (sv) {
        var index = this.timViTri(sv.maSV);
        if (index !== -1) {
            this.arr[index] = sv;
        }
    };

};
// Add thêm phương thức vào lớp đối tượng
DSSV.prototype.timKiemSV = function (keyword) {
    /**
     * 0. tạo mảng tìm kiếm =[]
     * 1. Duyệt mảng arr
     * 2. sv = arr [i]
     * 3. Nếu sv.tenSV trùng keyword
     *      =>true => thêm sv vô mảng tìm kiếm 
     * 4. trả về mảng tìm kiếm 
     */
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++) {
        var sv = this.arr[i];
        //Chuyển keyword về chữ viết thường
        var keywordLowerCase = keyword.toLowerCase()
        //Chuyển sv.tenSV về chữ viết thường
        var tenSVToLowerCase = sv.tenSV.toLowerCase();
        keyword = keyword.toLowerCase()
        if (tenSVToLowerCase.indexOf(keywordLowerCase) !== -1) {
            mangTimKiem.push(sv);
        }
    }
    return mangTimKiem;
};