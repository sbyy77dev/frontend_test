import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, CreditCard, ArrowLeft } from 'lucide-react';
import { sampleCards } from '../data/mockData'; // 샘플 데이터 임포트

// CardPerformance 페이지의 카드 UI와 유사하게 샘플 카드 목록을 표시합니다.
const MockRegisteredCards = [
  {
    card: sampleCards[0],
    currentMonth: { currentAmount: 180000, requiredAmount: 300000 },
  },
  {
    card: sampleCards[1],
    currentMonth: { currentAmount: 220000, requiredAmount: 200000 },
  },
];

const Wallet = () => {
  const navigate = useNavigate();

  return (
    // h-full과 app-container 클래스 제거 (MainLayout이 담당)
    <div className="flex flex-col">
      {/* Header (배경색 제거) */}
      <div className="flex items-center p-4 border-b">
        <h1 className="text-lg font-semibold flex-1 text-center">월렛</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">내 카드 목록</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {MockRegisteredCards.map((userCard, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted"
                onClick={() => navigate(`/app/card/${userCard.card.id}`)} // 상세 페이지로 이동
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{userCard.card.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {userCard.currentMonth.currentAmount.toLocaleString()}원 / {userCard.currentMonth.requiredAmount.toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
             {MockRegisteredCards.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  등록된 카드가 없습니다.
                </p>
             )}
          </CardContent>
        </Card>

        {/* 카드 추가 버튼 (위치 조정 및 새 스타일 적용) */}
        <Link to="/app/wallet/add" className="absolute bottom-24 right-6">
          <Button size="icon" className="rounded-full w-14 h-14 btn-gradient shadow-elevated">
            <Plus className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Wallet;