function layDiem(id) {
    let o = document.getElementById(id);

    if (!o || o.value.trim() === "") {
        return null;
    }

    return Number(o.value);
}


// ======================================================
// TÍNH ĐIỂM CÓ TRỌNG SỐ
// Nếu một môn bị bỏ trống -> bỏ môn đó và tự cân lại trọng số
// ======================================================
function tinhCoTrongSo(cacMon) {
    let tongTrongSo = 0;
    let tongDiem = 0;

    for (let mon of cacMon) {
        if (mon.diem !== null && !isNaN(mon.diem)) {
            tongTrongSo += mon.trongSo;
            tongDiem += mon.diem * mon.trongSo;
        }
    }

    if (tongTrongSo === 0) {
        return 0;
    }

    return tongDiem / tongTrongSo;
}


// ======================================================
// GIỚI HẠN ĐIỂM TỪ 0 -> 10
// ======================================================
function gioiHanDiem(diem) {
    if (diem < 0) return 0;
    if (diem > 10) return 10;
    return diem;
}


// ======================================================
// ĐIỂM KHẢO SÁT
// ======================================================
function layDiemCau(soCau) {
    let cau = document.querySelector(
        'input[name="cau' + soCau + '"]:checked'
    );

    if (!cau) {
        return null;
    }

    return Number(cau.value);
}


// ======================================================
// TÍNH TRUNG BÌNH CÁC CÂU
// ======================================================
function trungBinhCau(danhSach) {
    let tong = 0;
    let dem = 0;

    for (let x of danhSach) {
        if (x !== null) {
            tong += x;
            dem++;
        }
    }

    if (dem === 0) {
        return 0;
    }

    // Câu khảo sát từ 1 -> 5
    // Đổi thành thang 10
    return (tong / dem) * 2;
}


// ======================================================
// HÀM CHÍNH
// ======================================================
function phanTich() {

    // ==================================================
    // 1. LẤY THÔNG TIN CÁ NHÂN
    // ==================================================
    let hoten = document.getElementById("hoten").value.trim();

    if (hoten === "") {
        alert("Vui lòng nhập họ và tên.");
        return;
    }


    // ==================================================
    // 2. LẤY 10 MÔN HỌC
    // ==================================================
    let toan = layDiem("toan");
    let ly = layDiem("ly");
    let hoa = layDiem("hoa");
    let sinh = layDiem("sinh");
    let tin = layDiem("tin");
    let van = layDiem("van");
    let anh = layDiem("anh");
    let su = layDiem("su");
    let dia = layDiem("dia");
    let ktpl = layDiem("ktpl");


    // ==================================================
    // 3. KIỂM TRA ĐIỂM
    // Môn bỏ trống được phép
    // ==================================================
    let cacMon = [
        { ten: "Toán", diem: toan },
        { ten: "Vật lý", diem: ly },
        { ten: "Hóa học", diem: hoa },
        { ten: "Sinh học", diem: sinh },
        { ten: "Tin học", diem: tin },
        { ten: "Ngữ văn", diem: van },
        { ten: "Tiếng Anh", diem: anh },
        { ten: "Lịch sử", diem: su },
        { ten: "Địa lý", diem: dia },
        { ten: "Kinh tế và Pháp luật", diem: ktpl }
    ];

    for (let mon of cacMon) {

        if (mon.diem !== null) {

            if (isNaN(mon.diem) || mon.diem < 0 || mon.diem > 10) {
                alert(
                    "Điểm " + mon.ten +
                    " phải nằm trong khoảng từ 0 đến 10."
                );
                return;
            }
        }
    }


    // ==================================================
    // 4. LẤY SỞ THÍCH
    // ==================================================
    let congnghe = 0;
    let toanhoc = 0;
    let khoahoc = 0;
    let kyThuat = 0;
    let sinhhoc = 0;
    let kinhdoanh = 0;
    let nghethuat = 0;
    let ngonngu = 0;

    if (document.getElementById("congnghe")?.checked) {
        congnghe = 10;
    }

    if (document.getElementById("toanhoc")?.checked) {
        toanhoc = 10;
    }

    if (document.getElementById("khoahoc")?.checked) {
        khoahoc = 10;
    }

    if (document.getElementById("kythuat")?.checked) {
        kyThuat = 10;
    }

    if (document.getElementById("sinhhoc")?.checked) {
        sinhhoc = 10;
    }

    if (document.getElementById("kinhdoanh")?.checked) {
        kinhdoanh = 10;
    }

    if (document.getElementById("nghethuat")?.checked) {
        nghethuat = 10;
    }

    if (document.getElementById("ngonngu")?.checked) {
        ngonngu = 10;
    }


    // ==================================================
    // 5. ĐỌC MÔ TẢ SỞ THÍCH
    // ==================================================
    let moTa = document.getElementById("mota")?.value.toLowerCase() || "";


    // ==================================================
    // 6. PHÂN TÍCH TỪ KHÓA
    // ==================================================

    // Công nghệ
    let tuKhoaCongNghe = [
        "công nghệ",
        "cong nghe",
        "lập trình",
        "lap trinh",
        "code",
        "coding",
        "máy tính",
        "may tinh",
        "phần mềm",
        "phan mem",
        "ai",
        "trí tuệ nhân tạo",
        "tri tue nhan tao",
        "robot",
        "web",
        "website",
        "javascript",
        "python",
        "c++",
        "tin học",
        "tin hoc"
    ];

    // Toán
    let tuKhoaToan = [
        "toán",
        "toan",
        "số học",
        "so hoc",
        "logic",
        "tính toán",
        "tinh toan",
        "phân tích dữ liệu",
        "phan tich du lieu"
    ];

    // Khoa học
    let tuKhoaKhoaHoc = [
        "khoa học",
        "khoa hoc",
        "thí nghiệm",
        "thi nghiem",
        "nghiên cứu",
        "nghien cuu",
        "vật lý",
        "vat ly",
        "hóa học",
        "hoa hoc",
        "môi trường",
        "moi truong"
    ];

    // Kỹ thuật
    let tuKhoaKyThuat = [
        "kỹ thuật",
        "ky thuat",
        "máy móc",
        "may moc",
        "cơ khí",
        "co khi",
        "điện",
        "điện tử",
        "dien tu",
        "lắp ráp",
        "lap rap",
        "sửa chữa",
        "sua chua",
        "thiết kế máy",
        "thiet ke may"
    ];

    // Sinh học - Y sinh
    let tuKhoaSinh = [
        "sinh học",
        "sinh hoc",
        "y học",
        "y hoc",
        "bác sĩ",
        "bac si",
        "dược",
        "duoc",
        "sức khỏe",
        "suc khoe",
        "cơ thể người",
        "co the nguoi",
        "động vật",
        "dong vat",
        "thực vật",
        "thuc vat"
    ];

    // Kinh doanh
    let tuKhoaKinhDoanh = [
        "kinh doanh",
        "kinh tế",
        "kinh te",
        "marketing",
        "bán hàng",
        "ban hang",
        "quản lý",
        "quan ly",
        "tài chính",
        "tai chinh",
        "quảng cáo",
        "quang cao",
        "doanh nghiệp",
        "doanh nghiep"
    ];

    // Nghệ thuật
    let tuKhoaNgheThuat = [
        "nghệ thuật",
        "nghe thuat",
        "vẽ",
        "ve",
        "thiết kế",
        "thiet ke",
        "âm nhạc",
        "am nhac",
        "viết",
        "viet",
        "sáng tạo",
        "sang tao",
        "nhiếp ảnh",
        "nhiep anh",
        "video",
        "truyền thông",
        "truyen thong"
    ];

    // Ngôn ngữ - xã hội
    let tuKhoaNgonNgu = [
        "tiếng anh",
        "tieng anh",
        "ngoại ngữ",
        "ngoai ngu",
        "ngôn ngữ",
        "ngon ngu",
        "tiếng nhật",
        "tieng nhat",
        "tiếng hàn",
        "tieng han",
        "tiếng trung",
        "tieng trung",
        "lịch sử",
        "lich su",
        "địa lý",
        "dia ly",
        "pháp luật",
        "phap luat",
        "xã hội",
        "xa hoi"
    ];


    function coTuKhoa(text, danhSach) {

        for (let tu of danhSach) {

            if (text.includes(tu)) {
                return true;
            }

        }

        return false;
    }


    if (coTuKhoa(moTa, tuKhoaCongNghe)) {
        congnghe = 10;
    }

    if (coTuKhoa(moTa, tuKhoaToan)) {
        toanhoc = 10;
    }

    if (coTuKhoa(moTa, tuKhoaKhoaHoc)) {
        khoahoc = 10;
    }

    if (coTuKhoa(moTa, tuKhoaKyThuat)) {
        kyThuat = 10;
    }

    if (coTuKhoa(moTa, tuKhoaSinh)) {
        sinhhoc = 10;
    }

    if (coTuKhoa(moTa, tuKhoaKinhDoanh)) {
        kinhdoanh = 10;
    }

    if (coTuKhoa(moTa, tuKhoaNgheThuat)) {
        nghethuat = 10;
    }

    if (coTuKhoa(moTa, tuKhoaNgonNgu)) {
        ngonngu = 10;
    }


    // ==================================================
    // 7. LẤY 20 CÂU KHẢO SÁT
    // ==================================================
    let q = [];

    for (let i = 1; i <= 20; i++) {

        let diem = layDiemCau(i);

        if (diem === null) {
            alert(
                "Bạn chưa trả lời câu " +
                i +
                " trong phần khảo sát."
            );
            return;
        }

        q[i] = diem;
    }


    // ==================================================
    // 8. TÍNH ĐIỂM KHẢO SÁT CHO 7 NHÓM
    // ==================================================

    // Công nghệ
    let ksCongNghe = trungBinhCau([
        q[1],
        q[8],
        q[13],
        q[20]
    ]);

    // Kỹ thuật
    let ksKyThuat = trungBinhCau([
        q[3],
        q[12],
        q[18]
    ]);

    // Khoa học
    let ksKhoaHoc = trungBinhCau([
        q[4],
        q[13],
        q[15],
        q[20]
    ]);

    // Sinh học - Y sinh
    let ksSinhHoc = trungBinhCau([
        q[5],
        q[6],
        q[14]
    ]);

    // Kinh doanh
    let ksKinhDoanh = trungBinhCau([
        q[7],
        q[10],
        q[16],
        q[19]
    ]);

    // Nghệ thuật - Truyền thông
    let ksNgheThuat = trungBinhCau([
        q[9],
        q[17]
    ]);

    // Ngôn ngữ - Xã hội
    let ksNgonNgu = trungBinhCau([
        q[11],
        q[19]
    ]);


    // ==================================================
    // 9. TÍNH ĐIỂM CÁC MÔN CHO TỪNG NHÓM
    // ==================================================

    // -----------------------------
    // CÔNG NGHỆ THÔNG TIN
    // -----------------------------
    let monCongNghe = tinhCoTrongSo([
        { diem: toan, trongSo: 0.25 },
        { diem: tin, trongSo: 0.40 },
        { diem: ly, trongSo: 0.15 },
        { diem: anh, trongSo: 0.20 }
    ]);

    // -----------------------------
    // KỸ THUẬT
    // -----------------------------
    let monKyThuat = tinhCoTrongSo([
        { diem: toan, trongSo: 0.30 },
        { diem: ly, trongSo: 0.30 },
        { diem: tin, trongSo: 0.15 },
        { diem: hoa, trongSo: 0.15 },
        { diem: anh, trongSo: 0.10 }
    ]);

    // -----------------------------
    // KHOA HỌC TỰ NHIÊN
    // -----------------------------
    let monKhoaHoc = tinhCoTrongSo([
        { diem: toan, trongSo: 0.20 },
        { diem: ly, trongSo: 0.20 },
        { diem: hoa, trongSo: 0.25 },
        { diem: sinh, trongSo: 0.20 },
        { diem: dia, trongSo: 0.15 }
    ]);

    // -----------------------------
    // SINH HỌC - Y SINH
    // -----------------------------
    let monSinhHoc = tinhCoTrongSo([
        { diem: sinh, trongSo: 0.40 },
        { diem: hoa, trongSo: 0.30 },
        { diem: toan, trongSo: 0.10 },
        { diem: anh, trongSo: 0.10 },
        { diem: van, trongSo: 0.10 }
    ]);

    // -----------------------------
    // KINH DOANH - KINH TẾ
    // -----------------------------
    let monKinhDoanh = tinhCoTrongSo([
        { diem: toan, trongSo: 0.15 },
        { diem: anh, trongSo: 0.20 },
        { diem: van, trongSo: 0.15 },
        { diem: ktpl, trongSo: 0.30 },
        { diem: su, trongSo: 0.10 },
        { diem: dia, trongSo: 0.10 }
    ]);

    // -----------------------------
    // NGHỆ THUẬT - TRUYỀN THÔNG
    // -----------------------------
    let monNgheThuat = tinhCoTrongSo([
        { diem: van, trongSo: 0.35 },
        { diem: anh, trongSo: 0.20 },
        { diem: tin, trongSo: 0.15 },
        { diem: su, trongSo: 0.10 },
        { diem: dia, trongSo: 0.10 },
        { diem: ktpl, trongSo: 0.10 }
    ]);

    // -----------------------------
    // NGOẠI NGỮ - XÃ HỘI
    // -----------------------------
    let monNgonNgu = tinhCoTrongSo([
        { diem: anh, trongSo: 0.35 },
        { diem: van, trongSo: 0.20 },
        { diem: su, trongSo: 0.15 },
        { diem: dia, trongSo: 0.15 },
        { diem: ktpl, trongSo: 0.15 }
    ]);


    // ==================================================
    // 10. TÍNH ĐIỂM CUỐI CÙNG
    // ==================================================

    // Công nghệ
    let diemCongNghe =
        monCongNghe * 0.50 +
        Math.max(congnghe, toanhoc) * 0.15 +
        ksCongNghe * 0.35;


    // Kỹ thuật
    let diemKyThuat =
        monKyThuat * 0.50 +
        Math.max(kyThuat, toanhoc) * 0.15 +
        ksKyThuat * 0.35;


    // Khoa học
    let diemKhoaHoc =
        monKhoaHoc * 0.50 +
        khoahoc * 0.15 +
        ksKhoaHoc * 0.35;


    // Sinh học - Y sinh
    let diemSinhHoc =
        monSinhHoc * 0.50 +
        sinhhoc * 0.15 +
        ksSinhHoc * 0.35;


    // Kinh doanh
    let diemKinhDoanh =
        monKinhDoanh * 0.50 +
        kinhdoanh * 0.15 +
        ksKinhDoanh * 0.35;


    // Nghệ thuật - Truyền thông
    let diemNgheThuat =
        monNgheThuat * 0.50 +
        nghethuat * 0.15 +
        ksNgheThuat * 0.35;


    // Ngoại ngữ - Xã hội
    let diemNgonNgu =
        monNgonNgu * 0.50 +
        ngonngu * 0.15 +
        ksNgonNgu * 0.35;


    // ==================================================
    // 11. TẠO DANH SÁCH KẾT QUẢ
    // ==================================================
    let ketQua = [

        {
            ten: "Công nghệ thông tin",
            diem: diemCongNghe,
            moTa: "Phù hợp với lập trình, phần mềm, AI, dữ liệu và công nghệ số.",
            nganh: "Công nghệ thông tin, Khoa học máy tính, AI, Kỹ thuật phần mềm, Khoa học dữ liệu"
        },

        {
            ten: "Kỹ thuật",
            diem: diemKyThuat,
            moTa: "Phù hợp với máy móc, kỹ thuật, điện - điện tử và công nghệ.",
            nganh: "Kỹ thuật cơ khí, Kỹ thuật điện, Điện tử - Viễn thông, Cơ điện tử"
        },

        {
            ten: "Khoa học tự nhiên",
            diem: diemKhoaHoc,
            moTa: "Phù hợp với nghiên cứu, thí nghiệm và khám phá các quy luật tự nhiên.",
            nganh: "Vật lý, Hóa học, Sinh học, Khoa học môi trường, Công nghệ sinh học"
        },

        {
            ten: "Sinh học - Y sinh",
            diem: diemSinhHoc,
            moTa: "Phù hợp với sinh học, sức khỏe, cơ thể người và nghiên cứu y sinh.",
            nganh: "Y khoa, Dược học, Điều dưỡng, Công nghệ sinh học, Sinh học"
        },

        {
            ten: "Kinh doanh - Kinh tế",
            diem: diemKinhDoanh,
            moTa: "Phù hợp với kinh doanh, quản lý, marketing, tài chính và kinh tế.",
            nganh: "Quản trị kinh doanh, Marketing, Tài chính - Ngân hàng, Kinh tế"
        },

        {
            ten: "Nghệ thuật - Truyền thông",
            diem: diemNgheThuat,
            moTa: "Phù hợp với sáng tạo, thiết kế, viết, hình ảnh và truyền thông.",
            nganh: "Thiết kế đồ họa, Truyền thông, Báo chí, Thiết kế, Sáng tạo nội dung"
        },

        {
            ten: "Ngoại ngữ - Xã hội",
            diem: diemNgonNgu,
            moTa: "Phù hợp với ngôn ngữ, giao tiếp, xã hội và các lĩnh vực nhân văn.",
            nganh: "Ngôn ngữ Anh, Ngôn ngữ khác, Quan hệ quốc tế, Du lịch, Xã hội học"
        }

    ];


    // ==================================================
    // 12. GIỚI HẠN ĐIỂM
    // ==================================================
    for (let nhom of ketQua) {
        nhom.diem = gioiHanDiem(nhom.diem);
    }


    // ==================================================
    // 13. SẮP XẾP TỪ CAO XUỐNG THẤP
    // ==================================================
    ketQua.sort(function(a, b) {
        return b.diem - a.diem;
    });


    // ==================================================
    // 14. HIỂN THỊ KẾT QUẢ
    // ==================================================
    let html = "";

    html += "<h2>Kết quả phân tích của " + hoten + "</h2>";

    html += `
        <div class="thongbao">
            Điểm được tính dựa trên điểm các môn học,
            sở thích và kết quả khảo sát.
            Các môn không nhập điểm sẽ không được tính như điểm 0.
        </div>
    `;


    // ==================================================
    // TOP 3
    // ==================================================
    html += "<div class='top3'>";
    html += "<h3>TOP 3 NHÓM NGÀNH PHÙ HỢP</h3>";

    for (let i = 0; i < 3; i++) {

        let nhom = ketQua[i];

        html += `
            <div class="ketqua-item">
                <h3>${i + 1}. ${nhom.ten}</h3>

                <div class="diem">
                    Mức độ phù hợp: ${nhom.diem.toFixed(2)}/10
                </div>

                <p>
                    <strong>Định hướng:</strong>
                    ${nhom.moTa}
                </p>

                <p>
                    <strong>Ngành có thể tham khảo:</strong>
                    ${nhom.nganh}
                </p>
            </div>
        `;
    }

    html += "</div>";


    // ==================================================
    // TẤT CẢ NHÓM
    // ==================================================
    html += "<h3>Chi tiết các nhóm ngành</h3>";

    for (let i = 0; i < ketQua.length; i++) {

        let nhom = ketQua[i];

        html += `
            <div class="ketqua-item">

                <h3>${i + 1}. ${nhom.ten}</h3>

                <div class="diem">
                    ${nhom.diem.toFixed(2)}/10
                </div>

                <p>${nhom.moTa}</p>

                <p>
                    <strong>Ngành tham khảo:</strong>
                    ${nhom.nganh}
                </p>

            </div>
        `;
    }


    // ==================================================
    // GHI CHÚ VỀ MÔ TẢ
    // ==================================================
    if (moTa !== "") {

        html += `
            <div class="thongbao">
                <strong>Phân tích sở thích:</strong>
                Hệ thống đã sử dụng nội dung bạn nhập để
                bổ sung thông tin về sở thích nghề nghiệp.
            </div>
        `;
    }


    // ==================================================
    // LƯU Ý
    // ==================================================
    html += `
        <div class="thongbao">

            <strong>Lưu ý:</strong>
            Kết quả của FutureAI chỉ mang tính chất tham khảo.
            Việc lựa chọn ngành nghề nên kết hợp với sở thích,
            năng lực, điều kiện học tập và tìm hiểu thực tế
            về từng ngành nghề.

        </div>
    `;


    // ==================================================
    // HIỂN THỊ RA TRANG
    // ==================================================
    document.getElementById("ketqua").innerHTML = html;


    // Cuộn xuống kết quả
    document.getElementById("ketqua").scrollIntoView({
        behavior: "smooth"
    });
}