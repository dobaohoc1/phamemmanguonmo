import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Product = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const categories = [
        "Espresso",
        "Latte",
        "Cappuccino",
        "Mocha",
        "Macchiato",
        // Add more categories as needed
    ];

    const products = [
        {
            icon: <Coffee className="h-10 w-10 text-coffee-600" />,
            title: "Cà phê Espresso",
            description: "Một ly cà phê espresso đậm đà và thơm ngon.",
            image: "/images/espresso.jpg", // Add image path
        },
        {
            icon: <Coffee className="h-10 w-10 text-coffee-600" />,
            title: "Cà phê Latte",
            description: "Cà phê latte với sữa tươi và bọt sữa mềm mịn.",
            image: "/images/latte.jpg", // Add image path
        },
        {
            icon: <Coffee className="h-10 w-10 text-coffee-600" />,
            title: "Cà phê Cappuccino",
            description: "Cà phê cappuccino với lớp bọt sữa dày và thơm.",
            image: "/images/cappuccino.jpg", // Add image path
        },
        // Add more products as needed
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-coffee-100">
            {/* Navbar */}
            <nav className="bg-coffee-800/90 backdrop-blur-sm sticky top-0 z-50 shadow-md">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo & Brand */}
                        <Link to="/" className="flex items-center gap-2">
                            <Coffee className="h-7 w-7 text-coffee-100" />
                            <span className="text-xl font-bold text-coffee-100">Brew Bot</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-6">
                            <NavLink href="/#tinh-nang">Tính năng</NavLink>
                            <NavLink href="/san-pham">Sản Phầm</NavLink>
                            <NavLink href="/#gioi-thieu">Giới thiệu</NavLink>
                            <NavLink href="/#lien-he">Liên hệ</NavLink>
                        </div>

                        {/* Action Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button variant="ghost" className="text-coffee-100 hover:text-white hover:bg-coffee-700" asChild>
                                <Link to="/login">Đăng nhập</Link>
                            </Button>
                            <Button className="bg-coffee-600 hover:bg-coffee-700 text-white" asChild>
                                <Link to="/dashboard">Vào trang quản lý</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-coffee-100">
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-coffee-800 py-4 px-4 absolute top-full left-0 w-full shadow-md">
                        <div className="flex flex-col space-y-3">
                            <NavLink href="#features" onClick={() => setIsMenuOpen(false)}>Tính năng</NavLink>
                            <NavLink href="#pricing" onClick={() => setIsMenuOpen(false)}>Bảng giá</NavLink>
                            <NavLink href="#about" onClick={() => setIsMenuOpen(false)}>Giới thiệu</NavLink>
                            <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</NavLink>
                            <div className="pt-3 flex flex-col gap-3">
                                <Button variant="outline" className="border-coffee-500 text-coffee-100" asChild>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                                </Button>
                                <Button className="bg-coffee-600 hover:bg-coffee-700 text-white" asChild>
                                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Vào trang quản lý</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Categories Section */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-coffee-800 mb-4 text-center">Danh Sách Loại Sản Phẩm</h2>
                <div className="flex justify-center gap-4">
                    {categories.map((category, index) => (
                        <Button key={index} className="bg-coffee-600 hover:bg-coffee-700 text-white">
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Product List Section */}
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-coffee-800 mb-8 text-center">Danh Sách Sản Phẩm</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            icon={product.icon}
                            title={product.title}
                            description={product.description}
                            image={product.image}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-coffee-800 text-coffee-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <Coffee className="h-6 w-6 mr-2" />
                            <span className="text-xl font-bold">Brew Bot</span>
                        </div>
                        <div className="text-sm text-coffee-300">
                            © {new Date().getFullYear()} Brew Bot Dashboard. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
    return (
        <a
            href={href}
            className="text-coffee-100 hover:text-white transition-colors px-3 py-2 text-base font-medium"
            onClick={onClick}
        >
            {children}
        </a>
    );
};

const ProductCard = ({ icon, title, description, image }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string; // Add image property
}) => {
    return (
        <Card className="hover:shadow-md transition-shadow duration-300 border-coffee-200 bg-white">
            <CardContent className="p-6">
                <img
                    src="/placeholder.svg"
                    alt="Dashboard Preview"
                    className="w-full h-40 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold text-coffee-800 mb-2">{title}</h3>
                <p className="text-coffee-600 mb-4">{description}</p>
                <Button className="bg-coffee-600 hover:bg-coffee-700 text-white w-full mt-4">
                    Đặt Ngay
                </Button> {/* Add Order button */}
            </CardContent>
        </Card>
    );
};

export default Product;