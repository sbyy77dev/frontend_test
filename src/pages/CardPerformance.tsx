import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { sampleCards } from '../data/mockData';

const CardPerformance = () => {
  const navigate = useNavigate();
  
  // ... (기존 로직 동일) ...
  const userCards = [
    {
      card: sampleCards[0],
      currentMonth: {
        requiredAmount: 300000,
        currentAmount: 180000,
        isAchieved: false,
        benefits: ['온라인 쇼핑 5% 적립', '대중교통 10% 적립']
      },
      lastMonth: {
        requiredAmount: 300000,
        currentAmount: 350000,
        isAchieved: true,
        benefits: ['온라인 쇼핑 5% 적립', '대중교통 10% 적립']
      }
    },
    // ... (기타 카드 데이터)
  ];

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100);
  };

  const getStatusIcon = (isAchieved: boolean, current: number, required: number) => {
    // ... (기존 로직 동일) ...
  };

  const getStatusText = (isAchieved: boolean, current: number, required: number) => {
    // ... (기존 로직 동일) ...
  };

  const getStatusColor = (isAchieved: boolean, current: number, required: number) => {
    // ... (기존 로직 동일) ...
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/app/chat')} // 경로 수정
          className="mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">카드 실적 현황</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* ... (기존 UI 동일) ... */}
        {/* 요약 정보 */}
        <div className="grid grid-cols-3 gap-3">
          {/* ... */}
        </div>

        {/* 카드별 실적 현황 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">이번 달 실적 현황</h2>
          
          {userCards.map((userCard, index) => (
            <Card key={index} className="shadow-card">
              {/* ... (카드 UI 동일) ... */}
            </Card>
          ))}
        </div>

        {/* 지난 달 실적 요약 */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">지난 달 실적 요약</CardTitle>
          </CardHeader>
          <CardContent>
            {/* ... (카드 UI 동일) ... */}
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Button 
            className="w-full btn-gradient"
            onClick={() => navigate('/app/chat')} // 경로 수정
          >
            실적 달성을 위한 카드 추천받기
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/app/spending')} // 경로 수정
          >
            소비패턴 분석 보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardPerformance;