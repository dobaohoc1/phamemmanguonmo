
import { useState, useEffect } from "react";
import { DataTable } from "@/components/tables/DataTable";
import { KhachHang } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { customerAPI } from "@/lib/api";


const customerSchema = z.object({
  name: z.string().min(2, {
    message: "Tên khách hàng phải có ít nhất 2 ký tự.",
  }),
  phonenumber: z.string().regex(new RegExp("^0[0-9]{9}$"), {
    message: "Số điện thoại không hợp lệ.",
  }),
  address: z.string().min(5, {
    message: "Địa chỉ phải có ít nhất 5 ký tự.",
  }),
  sex: z.enum(["Nam", "Nữ"], {
    required_error: "Vui lòng chọn giới tính.",
  }),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

const Customers = () => {
  const [customers, setCustomers] = useState<KhachHang[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<KhachHang | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      phonenumber: "",
      address: "",
      sex: "Nam",
    },
  });


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response: any = await customerAPI.getAll();
        setCustomers(response);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách khách hàng.",
        });
      }
    };

    fetchCustomers();
  }, []);


  useEffect(() => {
    if (selectedCustomer) {
      const formValues: CustomerFormValues = {
        name: selectedCustomer.name,
        phonenumber: selectedCustomer.phonenumber,
        address: selectedCustomer.address,
        sex: selectedCustomer.sex as "Nam" | "Nữ",
      };
      form.reset(formValues);
      setIsEditMode(true);
    } else {
      form.reset({
        name: "",
        phonenumber: "",
        address: "",
        sex: "Nam",
      });
      setIsEditMode(false);
    }
  }, [selectedCustomer, form]);


  const columns = [
    { key: "id", label: "Mã KH" },
    { key: "name", label: "Tên KH" },
    { key: "phonenumber", label: "SĐT" },
    { key: "address", label: "Địa chỉ" },
    { key: "sex", label: "Giới tính" },
  ];

  const onSubmit = async (values: CustomerFormValues) => {
    if (isEditMode && selectedCustomer) {
      try {
        const updatedCustomer = { ...selectedCustomer, ...values };
        const response = await customerAPI.update(updatedCustomer.id, updatedCustomer);
        setCustomers(customers.map((customer: any) => customer.id === selectedCustomer.id ? response : customer));
        toast({
          title: "Cập nhật thành công.",
          description: "Thông tin khách hàng đã được cập nhật.",
        });
      } catch (error) {
        console.error("Error updating customer:", error);
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật thông tin khách hàng.",
        });
      }
    } else {
      const newCustomer: KhachHang = {
        name: values.name,
        phonenumber: values.phonenumber,
        address: values.address,
        sex: values.sex,
      };
      try {
        const response: any = await customerAPI.create(newCustomer);
        setCustomers([...customers, response]);
        toast({
          title: "Thêm mới thành công.",
          description: "Khách hàng mới đã được thêm vào danh sách.",
        });
      } catch (error) {
        console.error("Error creating customer:", error);
        toast({
          title: "Lỗi",
          description: "Không thể thêm khách hàng mới.",
        });
      }
    }
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleEdit = (customer: KhachHang) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleDelete = async (customer: KhachHang) => {
    await customerAPI.delete(customer.id);
    setCustomers(customers.filter((c) => c.id !== customer.id));
    toast({
      title: "Xóa thành công.",
      description: "Khách hàng đã được xóa khỏi danh sách.",
    });
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={customers}
        title="Danh sách khách hàng"
        onAdd={() => {
          setSelectedCustomer(null);
          setOpen(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Chỉnh sửa khách hàng" : "Thêm khách hàng"}
            </DialogTitle>
            <DialogDescription>
              Điền đầy đủ thông tin vào form bên dưới.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khách hàng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khách hàng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
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
                      <Input placeholder="Nhập địa chỉ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {isEditMode ? "Cập nhật" : "Thêm mới"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
