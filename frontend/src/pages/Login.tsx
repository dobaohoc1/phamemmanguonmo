
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Lock, User, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("Tên đăng nhập và mật khẩu là bắt buộc");
      return;
    }
    
    try {
      console.log("Đang gửi form đăng nhập với tên đăng nhập:", username);
      await login(username, password);
    } catch (err) {
      console.error("Lỗi đăng nhập trong component:", err);
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-coffee-50 to-coffee-100 p-4">
      <div className="w-full max-w-md opacity-0 animate-fadeIn" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-white rounded-full shadow-md mb-4">
            <Coffee className="h-12 w-12 text-coffee-600" />
          </div>
          <h1 className="text-3xl font-bold text-coffee-800 mb-2">Quản Lý Quán Cà Phê</h1>
          <p className="text-coffee-600">Đăng nhập để truy cập bảng điều khiển</p>
        </div>
        
        <Card className="glass-card border-coffee-100">
          <CardHeader>
            <CardTitle className="text-xl text-center text-coffee-800">Đăng Nhập Quản Trị</CardTitle>
            <CardDescription className="text-center text-coffee-500">
              Nhập thông tin đăng nhập của bạn để tiếp tục
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="text-xs text-amber-600 border border-amber-200 bg-amber-50 p-2 rounded">
                <p><strong>Tài khoản demo:</strong></p>
                <p>Tên đăng nhập: admin | Mật khẩu: admin123</p>
                <p>Tên đăng nhập: manager | Mật khẩu: manager123</p>
                <p>Tên đăng nhập: employee | Mật khẩu: employee123</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-coffee-700">Tên đăng nhập</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-4 w-4 text-coffee-400" />
                  </div>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-white/50 border-coffee-200 focus:border-coffee-400 focus:ring-coffee-400"
                    placeholder="Nhập tên đăng nhập"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-coffee-700">Mật khẩu</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-coffee-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/50 border-coffee-200 focus:border-coffee-400 focus:ring-coffee-400"
                    placeholder="Nhập mật khẩu"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-coffee-600 hover:bg-coffee-700 focus:ring-coffee-500"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang đăng nhập...
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-6 text-coffee-500 text-sm">
          © {new Date().getFullYear()} Quản Lý Quán Cà Phê. LQH,NQY,DBH.
        </p>
      </div>
    </div>
  );
};

export default Login;