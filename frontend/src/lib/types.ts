export interface NguoiDung {
  maKhachHang: string;
  tenKhachHang: string;
  soDienThoai: string;
  matKhau: string;
  email: string;
}

export interface PhanQuyen {
  maQuyen: string;
  tenQuyen: string;
}

export interface NhanVien {
  maNhanVien: string;
  tenNhanVien: string;
  ngaySinh: string;
}

export interface ThanhToan {
  maThanhToan: string;
  tenPhuongThucThanhToan: string;
}

export interface KhachHang {
  id?: string;
  name: string;
  phonenumber: string;
  address: string;
  sex: string;
}

export interface LoaiSanPham {
  maLoai: string;
  tenLoai: string;
}

export interface SanPham {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  status: string;
  type: any;
  supplier: string;
  receipt: string;
}



export interface PhieuKhuyenMai {
  maPhieuKhuyenMai: string;
  tenPhieuKhuyenMai: string;
}

export interface KhaCungCap {
  maKhaCungCap: string;
  tenNhaCungCap: string;
}

export interface PhanVu {
  maPhanVu: string;
}

export interface ThucUong {
  maThucUong: string;
}

export interface Quantity {
  maQuanLy: string;
}

export interface HoaDon {
  maHoaDon: string;
}

export interface Employee {
  id?: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  workpostion: string;
  phoneNumber: number;
  address: string;
  workStatus: string;
  role?: string;
  startDate?: string;
  avatar?: string;
  salary?: number;
}
