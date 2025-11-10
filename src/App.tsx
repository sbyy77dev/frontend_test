import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// 레이아웃 및 페이지 임포트
import MainLayout from "./components/MainLayout";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Register from "./pages/Register";
import LinkMyData from "./pages/LinkMyData";
import RegisterCards from "./pages/RegisterCards";
import Wallet from "./pages/Wallet";
import Chat from "./pages/Chat";
// import SpendingPattern from "./pages/SpendingPattern";
import CardPerformance from "./pages/CardPerformance";
import Survey from "./pages/Survey";
import Recommendations from "./pages/Recommendations";
import CardDetail from "./pages/CardDetail";
import NotFound from "./pages/NotFound";
import VerifyCard from "./pages/VerifyCard"; 
import SpendingPattern from "./pages/SpendingPattern";
import SpendingDetail from "./pages/SpendingDetail"; // 1. SpendingDetail 페이지 임포트

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* ... (Splash, Login 등 기존 인증 라우트) ... */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/link-mydata" element={<LinkMyData />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/recommendations" element={<Recommendations />} />

          {/* 메인 앱 플로우 (하단 탭바 레이아웃 적용) */}
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Navigate to="wallet" replace />} />
            <Route path="chat" element={<Chat />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="wallet/add" element={<RegisterCards />} />
            <Route path="wallet/verify" element={<VerifyCard />} />
            
            {/* [수정됨] '분석' 탭 라우팅 */}
            <Route path="spending" element={<SpendingPattern />} /> {/* 2. 이 페이지는 이제 메뉴입니다. */}
            <Route path="spending/detail" element={<SpendingDetail />} /> {/* 3. 상세 페이지(차트) 라우트 추가 */}

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