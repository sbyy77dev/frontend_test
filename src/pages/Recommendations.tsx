import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Users, TrendingUp, Star } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { SurveyResponse, UserGroup, Card as CardType } from '../types';
import { benefitCategoryNames } from '../data/mockData';
const Recommendations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    surveyResponse,
    userGroup,
    cardCombinations
  } = location.state as {
    surveyResponse: SurveyResponse;
    userGroup: UserGroup;
    cardCombinations: CardType[][];
  };

  // 방사형 차트 데이터 생성
  const radarData = Object.entries(benefitCategoryNames).map(([category, name]) => ({
    category: name,
    user: surveyResponse.spendingCategories.includes(category as any) ? 5 : 1,
    group: userGroup.spendingPattern.categories[category as keyof typeof userGroup.spendingPattern.categories] || 1
  }));
  const handleCardClick = (cardId: string) => {
    navigate(`/app/card/${cardId}`); // 경로 수정
  };
  return <div className="app-container">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">추천 결과</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* 사용자 그룹 정보 */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">당신의 소비 그룹</CardTitle>
                <p className="text-sm text-muted-foreground">비슷한 소비 패턴을 가진 사용자들</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-[rgb(129,119,230)]">
              <h3 className="font-semibold mb-2 text-[rgb(255,255,255)]">{userGroup.name}</h3>
              <div className="space-y-2">
                {userGroup.characteristics.map((characteristic, index) => <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                    {characteristic}
                  </div>)}
              </div>
            </div>

            {/* 소비 성향 비교 차트 */}
            <div>
              <h4 className="font-medium mb-3">소비 성향 비교</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" tick={{
                    fontSize: 10
                  }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} />
                    <Radar name="나의 성향" dataKey="user" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} strokeWidth={2} />
                    <Radar name="그룹 평균" dataKey="group" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.1} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-xs text-muted-foreground">나의 성향</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span className="text-xs text-muted-foreground">그룹 평균</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 카드 조합 추천 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            추천 카드 조합
          </h2>
          
          {cardCombinations.map((combination, index) => <Card key={index} className="shadow-card">
              <CardHeader className="flex flex-col space-y-1.5 p-6 bg-[rgb(227,225,248)]">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    조합 {index + 1}: {index === 0 ? '맞춤 혜택 조합' : index === 1 ? '균형 잡힌 조합' : '인기 카드 조합'}
                  </CardTitle>
                  <Badge variant="secondary" className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground hover:bg-secondary/80 bg-[rgb(129,119,230)]">
                    {combination.length}장
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-3 bg-[rgb(129,119,230)] pt-2.5 pb-2.5">
                {combination.map((card, cardIndex) => <div key={cardIndex} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleCardClick(card.id)}>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{card.name}</h4>
                      <p className="text-xs text-muted-foreground">{card.bank}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-xs text-muted-foreground">
                          인기도 {card.popularityScore}점
                        </span>
                      </div>
                    </div>
                    <div className="text-primary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>)}
                
                {/* 조합 설명 */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {index === 0 && '선호하는 혜택 카테고리에 최적화된 카드들로 구성했습니다.'}
                    {index === 1 && '다양한 혜택을 골고루 받을 수 있는 균형잡힌 조합입니다.'}
                    {index === 2 && '많은 사용자들이 선택한 인기 카드들로 구성했습니다.'}
                  </p>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* 그룹 인기 카드 */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-col space-y-1.5 p-6 bg-[rgb(227,225,248)]">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              {userGroup.name}이 많이 사용하는 카드
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-3 bg-[rgb(129,119,230)] pt-2.5 pb-2.5">
            {userGroup.popularCards.map((card, index) => <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleCardClick(card.id)}>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{card.name}</h4>
                  <p className="text-xs text-muted-foreground">{card.bank}</p>
                  <div className="flex items-center mt-1">
                    <Users className="w-3 h-3 text-accent mr-1" />
                    <span className="text-xs text-muted-foreground">
                      그룹 내 인기 카드
                    </span>
                  </div>
                </div>
                <div className="text-accent">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>)}
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Button className="w-full btn-gradient" onClick={() => navigate('/login')}>
            회원가입하고 더 정확한 추천받기
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/survey')}>
            설문 다시하기
          </Button>
        </div>
      </div>
    </div>;
};
export default Recommendations;