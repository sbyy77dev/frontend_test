import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { sampleCards } from '../data/mockData';

const CardPerformance = () => {
  const navigate = useNavigate();
  
  // 샘플 카드 실적 데이터
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
    {
      card: sampleCards[1],
      currentMonth: {
        requiredAmount: 200000,
        currentAmount: 220000,
        isAchieved: true,
        benefits: ['카페 15% 할인', '배달앱 10% 할인']
      },
      lastMonth: {
        requiredAmount: 200000,
        currentAmount: 150000,
        isAchieved: false,
        benefits: []
      }
    },
    {
      card: sampleCards[2],
      currentMonth: {
        requiredAmount: 500000,
        currentAmount: 420000,
        isAchieved: false,
        benefits: ['백화점 5% 적립', '주유 3% 적립']
      },
      lastMonth: {
        requiredAmount: 500000,
        currentAmount: 480000,
        isAchieved: false,
        benefits: []
      }
    }
  ];

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100);
  };

  const getStatusIcon = (isAchieved: boolean, current: number, required: number) => {
    if (isAchieved) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (current / required >= 0.8) {
      return <Clock className="w-5 h-5 text-orange-500" />;
    } else {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (isAchieved: boolean, current: number, required: number) => {
    if (isAchieved) {
      return '달성 완료';
    } else if (current / required >= 0.8) {
      return '달성 임박';
    } else {
      return '달성 필요';
    }
  };

  const getStatusColor = (isAchieved: boolean, current: number, required: number) => {
    if (isAchieved) {
      return 'bg-green-100 text-green-800';
    } else if (current / required >= 0.8) {
      return 'bg-orange-100 text-orange-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/chat')}
          className="mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">카드 실적 현황</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* 요약 정보 */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">
                {userCards.filter(card => card.currentMonth.isAchieved).length}
              </div>
              <div className="text-xs text-muted-foreground">달성 완료</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-orange-600">
                {userCards.filter(card => !card.currentMonth.isAchieved && card.currentMonth.currentAmount / card.currentMonth.requiredAmount >= 0.8).length}
              </div>
              <div className="text-xs text-muted-foreground">달성 임박</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-red-600">
                {userCards.filter(card => !card.currentMonth.isAchieved && card.currentMonth.currentAmount / card.currentMonth.requiredAmount < 0.8).length}
              </div>
              <div className="text-xs text-muted-foreground">달성 필요</div>
            </CardContent>
          </Card>
        </div>

        {/* 카드별 실적 현황 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">이번 달 실적 현황</h2>
          
          {userCards.map((userCard, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{userCard.card.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{userCard.card.bank}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(
                      userCard.currentMonth.isAchieved,
                      userCard.currentMonth.currentAmount,
                      userCard.currentMonth.requiredAmount
                    )}
                    <Badge className={getStatusColor(
                      userCard.currentMonth.isAchieved,
                      userCard.currentMonth.currentAmount,
                      userCard.currentMonth.requiredAmount
                    )}>
                      {getStatusText(
                        userCard.currentMonth.isAchieved,
                        userCard.currentMonth.currentAmount,
                        userCard.currentMonth.requiredAmount
                      )}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* 진행률 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>실적 진행률</span>
                    <span className="font-medium">
                      {userCard.currentMonth.currentAmount.toLocaleString()}원 / {userCard.currentMonth.requiredAmount.toLocaleString()}원
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(userCard.currentMonth.currentAmount, userCard.currentMonth.requiredAmount)}
                    className="h-2"
                  />
                  <div className="text-right text-xs text-muted-foreground">
                    {getProgressPercentage(userCard.currentMonth.currentAmount, userCard.currentMonth.requiredAmount).toFixed(1)}% 달성
                  </div>
                </div>

                {/* 남은 금액 */}
                {!userCard.currentMonth.isAchieved && (
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>남은 금액:</strong> {(userCard.currentMonth.requiredAmount - userCard.currentMonth.currentAmount).toLocaleString()}원
                    </p>
                  </div>
                )}

                {/* 혜택 정보 */}
                {userCard.currentMonth.benefits.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">달성 시 혜택</p>
                    <div className="space-y-1">
                      {userCard.currentMonth.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="text-xs text-muted-foreground flex items-center">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 지난 달 실적 요약 */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">지난 달 실적 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userCards.map((userCard, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{userCard.card.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {userCard.lastMonth.currentAmount.toLocaleString()}원 / {userCard.lastMonth.requiredAmount.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                  <Badge className={userCard.lastMonth.isAchieved ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {userCard.lastMonth.isAchieved ? '달성' : '미달성'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Button 
            className="w-full btn-gradient"
            onClick={() => navigate('/chat')}
          >
            실적 달성을 위한 카드 추천받기
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/spending-pattern')}
          >
            소비패턴 분석 보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardPerformance;