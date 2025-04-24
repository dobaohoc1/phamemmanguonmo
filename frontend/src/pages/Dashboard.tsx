import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Coffee, Users, ShoppingBag, DollarSign } from "lucide-react";

const mockSalesData = [
  { name: "T2", value: 43 },
  { name: "T3", value: 58 },
  { name: "T4", value: 65 },
  { name: "T5", value: 74 },
  { name: "T6", value: 87 },
  { name: "T7", value: 98 },
  { name: "CN", value: 76 },
];

const mockProductData = [
  { name: "Cà phê đen", value: 120 },
  { name: "Cappuccino", value: 98 },
  { name: "Latte", value: 86 },
  { name: "Americano", value: 72 },
  { name: "Mocha", value: 60 },
];

const StatCard = ({ title, value, icon, trend, className }: { title: string; value: string; icon: React.ReactNode; trend?: string; className?: string }) => (
  <Card className={`overflow-hidden ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className="text-xs text-muted-foreground mt-1">
          {trend}
        </p>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  useEffect(() => {
    const loadDashboardData = async () => {
      // await dashboardApi.getData();
    };
    
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-coffee-800">Chào mừng đến với Bảng điều khiển Quán Cà phê</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Tổng doanh thu" 
          value="12.456.000đ" 
          icon={<DollarSign className="h-4 w-4" />} 
          trend="+12.3% so với tháng trước"
          className="animate-slideInFromLeft delay-100"
        />
        <StatCard 
          title="Khách hàng" 
          value="1.234" 
          icon={<Users className="h-4 w-4" />} 
          trend="+5.3% khách hàng mới"
          className="animate-slideInFromLeft delay-200"
        />
        <StatCard 
          title="Sản phẩm" 
          value="25" 
          icon={<Coffee className="h-4 w-4" />} 
          trend="3 sản phẩm mới trong tháng"
          className="animate-slideInFromLeft delay-300"
        />
        <StatCard 
          title="Đơn hàng" 
          value="846" 
          icon={<ShoppingBag className="h-4 w-4" />} 
          trend="+18.2% so với tuần trước"
          className="animate-slideInFromLeft delay-400"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="animate-slideInFromBottom delay-500">
          <CardHeader>
            <CardTitle>Doanh thu theo tuần</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#a68057" strokeWidth={2} dot={{ stroke: '#a68057', strokeWidth: 2, r: 4 }} activeDot={{ stroke: '#a68057', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-slideInFromBottom delay-600">
          <CardHeader>
            <CardTitle>Sản phẩm phổ biến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockProductData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#a68057" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 animate-slideInFromBottom delay-700">
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                  <div>
                    <div className="font-medium">Đơn hàng #{Math.floor(Math.random() * 10000)}</div>
                    <div className="text-sm text-muted-foreground">Khách hàng: Nguyễn Văn A</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{Math.floor(Math.random() * 100)}.000đ</div>
                    <div className="text-sm text-muted-foreground">Hôm nay, {new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-slideInFromBottom delay-800">
          <CardHeader>
            <CardTitle>Tình trạng kho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Hạt cà phê", "Sữa", "Đường", "Ly", "Nắp"].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    index % 3 === 0 ? "bg-red-100 text-red-700" : 
                    index % 3 === 1 ? "bg-yellow-100 text-yellow-700" : 
                    "bg-green-100 text-green-700"
                  }`}>
                    {index % 3 === 0 ? "Thấp" : index % 3 === 1 ? "Trung bình" : "Tốt"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
