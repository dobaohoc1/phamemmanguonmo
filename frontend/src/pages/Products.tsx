
import { useState, useEffect } from "react";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { productAPI } from "@/lib/api";
import { SanPham } from "@/lib/types";

const columns = [
  { key: "name", label: "Tên sản phẩm" },
  { key: "image", label: "Hình Ảnh" },
  { key: "price", label: "Giá (đ)" },
  { key: "description", label: "Mô tả" },
];


const Products = () => {
  const [products, setProducts] = useState<SanPham[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SanPham | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<SanPham>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await productAPI.getAll();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách sản phẩm.",
        });
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    } else {
      reset({
        name: "",
        slug: "",
        description: "",
        price: 0,
        image: "",
        status: "active",
        type: {},
        supplier: "",
        receipt: "",
      });
    }
  }, [editingProduct, reset]);

  const onSubmit = async (data: SanPham) => {
    setIsLoading(true);
    try {
      if (editingProduct) {
        const response = await productAPI.update(editingProduct.id, data);
        setProducts(products.map((product: any) => product.id === editingProduct.id ? response : product));
        toast({
          title: "Cập nhật sản phẩm",
          description: `${data.name} đã được cập nhật thành công.`,
        });
      } else {
        const response: any = await productAPI.create(data);
        setProducts([...products, response]);
        toast({
          title: "Đã thêm sản phẩm",
          description: `${data.name} đã được thêm thành công.`,
        });
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu sản phẩm.",
      });
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
      setEditingProduct(null);
    }
  };
  const handleDelete = (product: SanPham) => {
    if (confirm(`Bạn có chắc chắn muốn xóa ${product.name}?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
      toast({
        title: "Đã xóa sản phẩm",
        description: `${product.name} đã được xóa thành công.`,
        variant: "destructive",
      });
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEdit = (product: SanPham) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <DataTable
        data={products}
        columns={columns}
        title="Danh sách Sản phẩm"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Chỉnh sửa Sản phẩm" : "Thêm Sản phẩm Mới"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Cập nhật thông tin sản phẩm bên dưới."
                : "Điền thông tin để thêm sản phẩm mới."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Tên sản phẩm là bắt buộc" }}
                  render={({ field }) => (
                    <Input id="name" {...field} />
                  )}
                />
              </div>
              {/* Add additional fields for slug, description, image, etc. */}
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Controller
                  name="slug"
                  control={control}
                  rules={{ required: "Slug là bắt buộc" }}
                  render={({ field }) => (
                    <Input id="slug" {...field} />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Mô tả là bắt buộc" }}
                  render={({ field }) => (
                    <Input id="description" {...field} />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Giá (đ)</Label>
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: "Giá là bắt buộc",
                    pattern: {
                      value: /^\d+$/,
                      message: "Nhập giá hợp lệ"
                    }
                  }}
                  render={({ field }) => (
                    <Input id="price" type="number" {...field} />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Hình ảnh</Label>
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: "Hình ảnh là bắt buộc" }}
                  render={({ field }) => (
                    <Input id="image" {...field} />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Trạng thái là bắt buộc" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Có hàng</SelectItem>
                        <SelectItem value="closed">Hết hàng</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supplier">Nhà cung cấp</Label>
                <Controller
                  name="supplier"
                  control={control}
                  rules={{ required: "Nhà cung cấp là bắt buộc" }}
                  render={({ field }) => (
                    <Input id="supplier" {...field} />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="receipt">Biên nhận</Label>
                <Controller
                  name="receipt"
                  control={control}
                  rules={{ required: "Biên nhận là bắt buộc" }}
                  render={({ field }) => (
                    <Input id="receipt" {...field} />
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  "Lưu"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;