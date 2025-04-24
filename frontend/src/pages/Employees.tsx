
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Filter } from "lucide-react";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Employee } from "@/lib/types";

const mockEmployees: Employee[] = [
  {
    id: "1",
    username: "nguyenvana",
    password: "123456",
    fullName: "Nguyễn Văn A",
    workpostion: "Barista",
    phoneNumber: 901234567,
    address: "123 Đường A, Quận 1",
    email: "nguyenvana@example.com",
    startDate: "2023-01-15",
    workStatus: "active",
    role: "employee",
    avatar: "/placeholder.svg",
    salary: 8000000
  },
  {
    id: "2",
    username: "tranthib",
    password: "123456",
    fullName: "Trần Thị B",
    workpostion: "Manager",
    phoneNumber: 907654321,
    address: "456 Đường B, Quận 2",
    email: "tranthib@example.com",
    startDate: "2022-05-10",
    workStatus: "active",
    role: "manager",
    avatar: "/placeholder.svg",
    salary: 12000000
  },
  {
    id: "3",
    username: "levanc",
    password: "123456",
    fullName: "Lê Văn C",
    workpostion: "Cashier",
    phoneNumber: 909876543,
    address: "789 Đường C, Quận 3",
    email: "levanc@example.com",
    startDate: "2023-03-20",
    workStatus: "inactive",
    role: "employee",
    avatar: "/placeholder.svg",
    salary: 7000000
  },
  {
    id: "4",
    username: "phamthid",
    password: "123456",
    fullName: "Phạm Thị D",
    workpostion: "Barista",
    phoneNumber: 908765432,
    address: "321 Đường D, Quận 4",
    email: "phamthid@example.com",
    startDate: "2023-02-01",
    workStatus: "active",
    role: "employee",
    avatar: "/placeholder.svg",
    salary: 8500000
  },
  {
    id: "5",
    username: "hoangvane",
    password: "123456",
    fullName: "Hoàng Văn E",
    workpostion: "Server",
    phoneNumber: 901122334,
    address: "654 Đường E, Quận 5",
    email: "hoangvane@example.com",
    startDate: "2022-11-05",
    workStatus: "active",
    role: "employee",
    avatar: "/placeholder.svg",
    salary: 7500000
  }
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(employee =>
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.workpostion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = (employee: Employee) => {
    setEmployees([...employees, { ...employee, id: String(Date.now()) }]);
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEmployees(employees.map(e => e.id === employee.id ? employee : e));
    setIsEditDialogOpen(false);
    setCurrentEmployee(null);
    document.body.style.pointerEvents = "auto";
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const openEditDialog = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle>Danh sách Nhân viên</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Tìm kiếm nhân viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[250px]"
              />
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            </div>

            <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2" >
              <UserPlus size={18} />
              <span>Thêm Mới</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <EmployeeList
            employees={filteredEmployees}
            onEdit={openEditDialog}
            onDelete={handleDeleteEmployee}
          />
        </CardContent>
      </Card>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Thêm Nhân viên Mới</DialogTitle>
            <DialogDescription>
              Điền thông tin vào mẫu dưới đây để thêm nhân viên mới vào hệ thống.
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm onSubmit={handleAddEmployee} />
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => { setIsEditDialogOpen(open); setTimeout(() => { document.body.style.pointerEvents = "auto"; }, 300) }}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Nhân viên</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin nhân viên trong mẫu dưới đây.
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm
            employee={currentEmployee}
            onSubmit={handleEditEmployee}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default Employees;