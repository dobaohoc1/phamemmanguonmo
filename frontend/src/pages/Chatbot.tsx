
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal, Bot, User, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const mockBotResponses = [
  "Tôi có thể giúp bạn quản lý kho hàng của quán cà phê.",
  "Thức uống phổ biến nhất hôm nay là Cappuccino.",
  "Sữa của bạn sắp hết. Bạn có muốn tôi thêm vào danh sách đặt hàng không?",
  "Doanh số bán hàng hôm nay cao hơn 15% so với hôm qua.",
  "Bạn có 5 đơn hàng mới đang chờ xử lý.",
  "Các món theo mùa mới đã rất được ưa chuộng trong tuần này.",
  "Tôi đã phân tích dữ liệu bán hàng và khuyến nghị tăng lượng cà phê cold brew cho những tháng hè sắp tới.",
  "Bạn có muốn tôi tạo báo cáo dữ liệu bán hàng tuần này không?",
  "Nhiệt độ hiện tại là 22°C. Đây là thời tiết lý tưởng để quảng bá các loại cà phê đá của bạn.",
  "Tôi có thể giúp bạn tối ưu hóa lịch làm việc của nhân viên dựa trên giờ cao điểm của khách hàng."
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Xin chào! Tôi là trợ lý AI của quán cà phê. Tôi có thể giúp gì cho việc quản lý quán cà phê của bạn hôm nay?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate API call to AI service
    setTimeout(() => {
      const randomResponse = mockBotResponses[Math.floor(Math.random() * mockBotResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Xin chào! Tôi là trợ lý AI của quán cà phê. Tôi có thể giúp gì cho việc quản lý quán cà phê của bạn hôm nay?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    
    toast({
      title: "Đã dọn tin nhắn",
      description: "Tin nhắn trước đó đã được xóa toàn bộ.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Trợ lí Chatbot AI</h1>
          <p className="text-muted-foreground">
            Bạn có thể hỏi tôi về quản lý quán cà phê của mình.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleClearChat}
        >
          <RefreshCw className="h-4 w-4" />
          Dọn tin nhắn
        </Button>
      </div>

      <Card className="h-[calc(100vh-220px)] flex flex-col">
        <CardHeader>
          <CardTitle>Coffee Shop AI</CardTitle>
          <CardDescription>
            Chatbot AI của chúng tôi sẽ giúp bạn quản lý quán cà phê của mình.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className={message.sender === "bot" ? "bg-coffee-100 text-coffee-800" : "bg-primary text-primary-foreground"}>
                      <AvatarFallback>
                        {message.sender === "bot" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 shadow-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="mt-4 relative">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="gap-1"
              >
                {isLoading ? 
                  <RefreshCw className="h-4 w-4 animate-spin" /> : 
                  <SendHorizonal className="h-4 w-4" />
                }
                <span className="sm:inline hidden">Gửi</span>
              </Button>
            </form>
            {isLoading && (
              <p className="text-xs text-muted-foreground mt-2">
                Đang gửi...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
