import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Cơ sở dữ liệu người dùng mẫu cho mục đích kiểm thử
const mockUsers = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' },
  { id: '2', username: 'manager', password: 'manager123', role: 'manager' },
  { id: '3', username: 'employee', password: 'employee123', role: 'employee' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log('Người dùng đã được xác thực từ localStorage:', parsedUser);
        } else {
          console.log('Không tìm thấy người dùng trong localStorage');
        }
      } catch (error) {
        console.error('Lỗi kiểm tra xác thực:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      console.log('Đang thử đăng nhập cho người dùng:', username);
      
      // Giả lập độ trễ API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Tìm người dùng trong cơ sở dữ liệu mẫu
      const foundUser = mockUsers.find(
        u => u.username === username && u.password === password
      );
      
      if (!foundUser) {
        console.error('Đăng nhập thất bại: Thông tin không hợp lệ');
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
      
      // Tạo đối tượng người dùng không có mật khẩu
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Tạo token mẫu
      const token = `mock-token-${Date.now()}`;
      
      // Lưu vào localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setUser(userWithoutPassword);
      console.log('Đăng nhập thành công cho người dùng:', userWithoutPassword);
      
      // Chuyển hướng đến trang dashboard
      navigate('/dashboard');
      
      toast({
        title: 'Đăng nhập thành công',
        description: `Chào mừng trở lại, ${userWithoutPassword.username}!`,
      });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Đang đăng xuất người dùng');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    toast({
      title: 'Đã đăng xuất',
      description: 'Bạn đã đăng xuất thành công.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
