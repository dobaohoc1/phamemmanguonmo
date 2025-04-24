import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Employee } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Form validation schema phù hợp với model User
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Tên phải có ít nhất 3 ký tự" }),
  workpostion: z.string().min(2, { message: "Vị trí là bắt buộc" }),
  phoneNumber: z.string().min(9, { message: "Số điện thoại không hợp lệ" }),
  address: z.string().min(5, { message: "Địa chỉ là bắt buộc" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  startDate: z.string(),
  workStatus: z.enum(["active", "inactive"]),
  role: z.string().min(2, { message: "Vai trò là bắt buộc" }),
  avatar: z.string().optional(),
  salary: z.string().optional(),
  password: z.string().min(3, { message: "Mật khẩu phải có ít nhất 3 ký tự" }),
  username: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: Employee) => void;
}

export const EmployeeForm = ({ employee, onSubmit }: EmployeeFormProps) => {
  const isEditing = !!employee;

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      fullName: "",
      workpostion: "",
      phoneNumber: "",
      address: "",
      email: "",
      startDate: new Date().toISOString().split('T')[0],
      workStatus: "active",
      role: "employee",
      avatar: "/placeholder.svg",
      salary: ""
    }
  });

  // Update form values when editing an existing employee
  useEffect(() => {
    if (employee) {
      form.reset({
        username: employee.username || "",
        password: employee.password || "",
        fullName: employee.fullName || "",
        workpostion: employee.workpostion || "",
        phoneNumber: employee.phoneNumber ? String(employee.phoneNumber) : "",
        address: employee.address || "",
        email: employee.email || "",
        startDate: employee.startDate ? employee.startDate.split("T")[0] : new Date().toISOString().split('T')[0],
        workStatus: employee.workStatus as "active" | "inactive",
        role: employee.role || "employee",
        avatar: employee.avatar || "/placeholder.svg",
        salary: employee.salary ? String(employee.salary) : ""
      });
    }
  }, [employee, form]);

  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    const employeeData: Employee = {
      id: employee?.id || String(Date.now()),
      username: employee?.username || "",
      fullName: values.fullName,
      workpostion: values.workpostion,
      phoneNumber: Number(values.phoneNumber),
      address: values.address,
      email: values.email,
      startDate: values.startDate,
      workStatus: values.workStatus,
      role: values.role,
      avatar: values.avatar || "/placeholder.svg",
      salary: values.salary ? Number(values.salary) : 0,
      password: employee?.password || ""
    };

    onSubmit(employeeData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={form.watch("avatar") || "/placeholder.svg"} />
            <AvatarFallback>
              {form.watch("fullName")?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{isEditing ? "Chỉnh Sửa Hồ Sơ" : "Nhân Viên Mới"}</h3>
            <p className="text-sm text-muted-foreground">
              {isEditing ? "Cập nhật thông tin nhân viên" : "Thêm thông tin nhân viên"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên đăng nhập</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} readOnly={isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mật khẩu" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyễn Văn A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workpostion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vị Trí</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vị trí" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Barista">Pha Chế</SelectItem>
                    <SelectItem value="Manager">Quản Lý</SelectItem>
                    <SelectItem value="Cashier">Thu Ngân</SelectItem>
                    <SelectItem value="Server">Phục Vụ</SelectItem>
                    <SelectItem value="Kitchen Staff">Nhân Viên Bếp</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Điện Thoại</FormLabel>
                <FormControl>
                  <Input placeholder="0901234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder="123 Đường ABC, Quận 1, TP.HCM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày Bắt Đầu</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng Thái</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Đang Làm</SelectItem>
                    <SelectItem value="inactive">Nghỉ Việc</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vai trò</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="employee">Nhân viên</SelectItem>
                    <SelectItem value="admin">Quản trị</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lương</FormLabel>
                <FormControl>
                  <Input placeholder="5000000" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh đại diện (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="/placeholder.svg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Hủy
          </Button>
          <Button type="submit">
            {isEditing ? "Cập Nhật" : "Thêm Nhân Viên"}
          </Button>
        </div>
      </form>
    </Form>
  );
};