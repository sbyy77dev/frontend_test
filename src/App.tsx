import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// 레이아웃 및 페이지 임포트
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Register from "./pages/Register";
import LinkMyData from "./pages/LinkMyData";
import RegisterCards from "./pages/RegisterCards";
import Wallet from "./pages/Wallet";
import Chat from "./pages/Chat";
import SpendingPattern from "./pages/SpendingPattern";
import CardPerformance from "./pages/CardPerformance";
import Survey from "./pages/Survey";
import Recommendations from "./pages/Recommendations";
import CardDetail from "./pages/CardDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* 인증 및 온보딩 플로우 (탭바 없음) */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/link-mydata" element={<LinkMyData />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/recommendations" element={<Recommendations />} />

          {/* 메인 앱 플로우 (하단 탭바 레이아웃 적용) */}
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Navigate to="chat" replace />} />
            <Route path="chat" element={<Chat />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="wallet/add" element={<RegisterCards />} />
            <Route path="spending" element={<SpendingPattern />} />
            <Route path="performance" element={<CardPerformance />} />
            <Route path="card/:cardId" element={<CardDetail />} />
          </Route>

          {/* CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;