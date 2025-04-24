
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Cog, MessageSquare, FileText, Bell, ShieldCheck, Database, Globe } from "lucide-react";

// Schema for general settings form
const generalSettingsSchema = z.object({
  shopName: z.string().min(2, { message: "Tên cửa hàng phải có ít nhất 2 ký tự." }),
  email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ." }),
  phone: z.string().min(10, { message: "Số điện thoại phải có ít nhất 10 số." }),
  address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự." }),
  logoUrl: z.string().url({ message: "Vui lòng nhập URL hợp lệ." }).optional(),
  currencySymbol: z.string().min(1, { message: "Ký hiệu tiền tệ là bắt buộc." }),
  timezone: z.string(),
});

// Schema for notification settings form
const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  orderConfirmations: z.boolean(),
  inventoryAlerts: z.boolean(),
  marketingEmails: z.boolean(),
  dailyReports: z.boolean(),
});

// Schema for chatbot settings form
const chatbotSettingsSchema = z.object({
  enabled: z.boolean(),
  welcomeMessage: z.string().min(10, { message: "Lời chào tối thiểu 10 kí tự." }),
  aiModel: z.string(),
  maxTokens: z.number().int().min(100).max(4000),
  temperature: z.number().min(0).max(1).step(0.1),
  knowledgeBase: z.string().min(5, { message: "Nhập ít nhất 5 ký tự cho cơ sở kiến ​​thức của bạn." }),
  offlineMessage: z.string(),
});

// Schema for report settings form
const reportSettingsSchema = z.object({
  dailyReportEnabled: z.boolean(),
  weeklyReportEnabled: z.boolean(),
  monthlyReportEnabled: z.boolean(),
  reportEmail: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ." }),
  includeSales: z.boolean(),
  includeInventory: z.boolean(),
  includeCustomers: z.boolean(),
  customReportName: z.string().optional(),
});

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  // General settings form
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      shopName: "Coffee Shop",
      email: "contact@coffeeshop.com",
      phone: "0123456789",
      address: "123 Coffee Street, City",
      logoUrl: "https://example.com/logo.png",
      currencySymbol: "$",
      timezone: "UTC+7",
    },
  });

  // Notification settings form
  const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      orderConfirmations: true,
      inventoryAlerts: true,
      marketingEmails: false,
      dailyReports: true,
    },
  });

  // Chatbot settings form
  const chatbotForm = useForm<z.infer<typeof chatbotSettingsSchema>>({
    resolver: zodResolver(chatbotSettingsSchema),
    defaultValues: {
      enabled: true,
      welcomeMessage: "Xin chào! Chào mừng đến với quán cà phê của chúng tôi. Tôi có thể giúp gì cho bạn hôm nay??",
      aiModel: "gpt-4o-mini",
      maxTokens: 2000,
      temperature: 0.7,
      knowledgeBase: "Thực đơn cà phê, phương pháp pha chế, địa điểm cửa hàng, giờ mở cửa",
      offlineMessage: "Xin lỗi, chatbot của chúng tôi hiện đang ngoại tuyến. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.",
    },
  });

  // Report settings form
  const reportForm = useForm<z.infer<typeof reportSettingsSchema>>({
    resolver: zodResolver(reportSettingsSchema),
    defaultValues: {
      dailyReportEnabled: true,
      weeklyReportEnabled: true,
      monthlyReportEnabled: true,
      reportEmail: "reports@coffeeshop.com",
      includeSales: true,
      includeInventory: true,
      includeCustomers: true,
      customReportName: "Báo cáo hiệu suất quán cà phê",
    },
  });

  // Handle form submissions
  const onSubmitGeneral = (data: z.infer<typeof generalSettingsSchema>) => {
    console.log("General settings:", data);
    toast({
      title: "Cài đặt chung đã được cập nhật",
      description: "Cài đặt chung đã được cập nhật.",
    });
  };

  const onSubmitNotifications = (data: z.infer<typeof notificationSettingsSchema>) => {
    console.log("Cài đặt thông báo:", data);
    toast({
      title: "Cài đặt thông báo đã được cập nhật",
      description: "Tùy chọn thông báo của bạn đã được lưu thành công.",
    });
  };

  const onSubmitChatbot = (data: z.infer<typeof chatbotSettingsSchema>) => {
    console.log("Cài đặt Chatbot:", data);
    toast({
      title: "Cài đặt Chatbot đã được cập nhật",
      description: "Cài đặt chatbot AI của bạn đã được lưu thành công.",
    });
  };

  const onSubmitReports = (data: z.infer<typeof reportSettingsSchema>) => {
    console.log("Cài đặt báo cáo:", data);
    toast({
      title: "Cài đặt báo cáo đã được cập nhật",
      description: "Cấu hình báo cáo của bạn đã được lưu thành công.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Quản lý cài đặt và tùy chọn hệ thống quán cà phê của bạn
        </p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            <span className="hidden md:inline">Tổng quan</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Thông báo</span>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">AI Chatbot</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Báo cáo</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
              <CardDescription>
                Cấu hình thông tin cơ bản cho quán cà phê của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-6">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="shopName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shop Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Quán cà phê của bạn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contact@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input placeholder="+84 339731606" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="currencySymbol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Đơn vị tiền tệ</FormLabel>
                          <FormControl>
                            <Input placeholder="VND" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Múi giờ</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn múi giờ" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="UTC+7">UTC+7 (Bangkok, Jakarta)</SelectItem>
                              <SelectItem value="UTC+8">UTC+8 (Beijing, Hong Kong)</SelectItem>
                              <SelectItem value="UTC+9">UTC+9 (Tokyo, Seoul)</SelectItem>
                              <SelectItem value="UTC+0">UTC+0 (London, Lisbon)</SelectItem>
                              <SelectItem value="UTC-5">UTC-5 (New York, Toronto)</SelectItem>
                              <SelectItem value="UTC-8">UTC-8 (Los Angeles, Vancouver)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/logo.png" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={generalForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ cửa hàng</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập địa chỉ cửa hàng của bạn"
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">Lưu thay đổi</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>
                Quản lý các thông báo bạn muốn nhận
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onSubmitNotifications)} className="space-y-6">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Thông báo qua Email</FormLabel>
                          <FormDescription>
                            Nhận thông báo qua email cho các sự kiện quan trọng
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="orderConfirmations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Xác nhận đơn hàng</FormLabel>
                          <FormDescription>
                            Nhận thông báo khi có đơn hàng mới
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="inventoryAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Cảnh báo tồn kho</FormLabel>
                          <FormDescription>
                            Thông báo khi hàng hóa sắp hết
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email tiếp thị</FormLabel>
                          <FormDescription>
                            Nhận email quảng cáo và khuyến mãi
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="dailyReports"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Báo cáo hàng ngày</FormLabel>
                          <FormDescription>
                            Nhận báo cáo doanh thu và hiệu suất hàng ngày
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">Lưu cài đặt thông báo</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Chatbot Settings */}
        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt Chatbot AI</CardTitle>
              <CardDescription>
                Cấu hình hành vi và phản hồi của chatbot AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...chatbotForm}>
                <form onSubmit={chatbotForm.handleSubmit(onSubmitChatbot)} className="space-y-6">
                  <FormField
                    control={chatbotForm.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Bật Chatbot AI</FormLabel>
                          <FormDescription>
                            Hiển thị chatbot AI trên trang web của bạn
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={chatbotForm.control}
                      name="aiModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mô hình AI</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn mô hình AI" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                              <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                              <SelectItem value="llama-3.1-sonar-small-128k">Llama 3.1 Sonar Small 128k</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Chọn mô hình AI để vận hành chatbot của bạn
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={chatbotForm.control}
                      name="maxTokens"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Tokens</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={100}
                              max={4000}
                              placeholder="2000"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Độ dài tối đa của phản hồi chatbot (100-4000)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={chatbotForm.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Temperature ({field.value})</FormLabel>
                          <FormControl>
                            <Input
                              type="range"
                              min={0}
                              max={1}
                              step={0.1}
                              className="cursor-pointer"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Thấp hơn cho câu trả lời dễ đoán, cao hơn cho câu trả lời sáng tạo hơn
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={chatbotForm.control}
                    name="welcomeMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lời Chào</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Xin chào! Tôi có thể giúp gì cho bạn hôm nay?"
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Tin nhắn ban đầu hiển thị khi khách hàng mở chat
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={chatbotForm.control}
                    name="offlineMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tin Nhắn Ngoại Tuyến</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Xin lỗi, chatbot của chúng tôi hiện đang ngoại tuyến."
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Tin nhắn hiển thị khi chatbot bị vô hiệu hóa hoặc không khả dụng
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={chatbotForm.control}
                    name="knowledgeBase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cơ Sở Kiến Thức</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập thông tin về quán cà phê của bạn tại đây..."
                            className="min-h-48"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Thông tin chính cần đưa vào phản hồi của chatbot (menu, giờ mở cửa, chính sách, v.v.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">Lưu Cài Đặt Chatbot</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Settings */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt báo cáo</CardTitle>
              <CardDescription>
                Cấu hình báo cáo tùy chỉnh và tùy chọn báo cáo của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...reportForm}>
                <form onSubmit={reportForm.handleSubmit(onSubmitReports)} className="space-y-6">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={reportForm.control}
                      name="reportEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email nhận báo cáo</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="reports@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Địa chỉ email để nhận báo cáo tự động
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={reportForm.control}
                      name="customReportName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên báo cáo tùy chỉnh</FormLabel>
                          <FormControl>
                            <Input placeholder="Hiệu suất quán cà phê" {...field} />
                          </FormControl>
                          <FormDescription>
                            Tên cho các báo cáo tùy chỉnh của bạn
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={reportForm.control}
                      name="dailyReportEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Báo cáo hàng ngày</FormLabel>
                            <FormDescription>
                              Gửi báo cáo tổng hợp mỗi ngày
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={reportForm.control}
                      name="weeklyReportEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Báo cáo hàng tuần</FormLabel>
                            <FormDescription>
                              Gửi báo cáo chi tiết mỗi tuần
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={reportForm.control}
                      name="monthlyReportEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Báo cáo hàng tháng</FormLabel>
                            <FormDescription>
                              Gửi báo cáo toàn diện mỗi tháng
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Nội dung báo cáo</h3>
                    <p className="text-sm text-muted-foreground">Chọn dữ liệu để đưa vào báo cáo của bạn</p>
                  </div>

                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <FormField
                      control={reportForm.control}
                      name="includeSales"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Dữ liệu bán hàng</FormLabel>
                            <FormDescription>
                              Bao gồm phân tích bán hàng
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={reportForm.control}
                      name="includeInventory"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Kho hàng</FormLabel>
                            <FormDescription>
                              Bao gồm dữ liệu kho hàng
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={reportForm.control}
                      name="includeCustomers"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Dữ liệu khách hàng</FormLabel>
                            <FormDescription>
                              Bao gồm số liệu khách hàng
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2 mt-6">
                    <h3 className="text-lg font-medium">Báo cáo có sẵn</h3>
                    <p className="text-sm text-muted-foreground">Danh sách báo cáo có thể được tạo</p>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên báo cáo</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Tần suất</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Tổng quan bán hàng</TableCell>
                        <TableCell>Tổng quan về hiệu suất bán hàng</TableCell>
                        <TableCell>Hàng ngày</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Tạo báo cáo</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Trạng thái kho hàng</TableCell>
                        <TableCell>Mức tồn kho hiện tại</TableCell>
                        <TableCell>Hàng tuần</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Tạo báo cáo</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Thông tin khách hàng</TableCell>
                        <TableCell>Phân tích hành vi khách hàng</TableCell>
                        <TableCell>Hàng tháng</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Tạo báo cáo</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hiệu suất sản phẩm</TableCell>
                        <TableCell>Phân tích doanh số sản phẩm</TableCell>
                        <TableCell>Hàng tháng</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Tạo báo cáo</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="flex justify-end">
                    <Button type="submit">Lưu cài đặt báo cáo</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bảo mật</CardTitle>
              <CardDescription>
                Quản lý cài đặt bảo mật và quyền riêng tư của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Mật khẩu</h3>
                  <p className="text-sm text-muted-foreground">Cập nhật mật khẩu tài khoản của bạn</p>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium">Mật khẩu hiện tại</label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium">Mật khẩu mới</label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">Xác nhận mật khẩu mới</label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Cập nhật mật khẩu</Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Xác thực hai yếu tố</h3>
                  <p className="text-sm text-muted-foreground">Thêm một lớp bảo mật cho tài khoản của bạn</p>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Xác thực hai yếu tố</h4>
                    <p className="text-sm text-muted-foreground">Bảo vệ tài khoản của bạn với 2FA</p>
                  </div>
                  <Button variant="outline">Kích hoạt</Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Truy cập API</h3>
                  <p className="text-sm text-muted-foreground">Quản lý khóa API cho tích hợp</p>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Khóa API chính</h4>
                      <p className="text-sm text-muted-foreground">Được tạo ngày 10 tháng 4, 2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Hiện</Button>
                      <Button variant="outline" size="sm">Tạo lại</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline">Tạo khóa API mới</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
