import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { analyzeSpendingPattern, convertToChartData } from '../utils/cardRecommendation';
import { benefitCategoryNames, benefitCategoryColors } from '../data/mockData';

const SpendingPattern = () => {
  const navigate = useNavigate();
  
  // 샘플 소비 패턴 데이터
  const spendingData = analyzeSpendingPattern([]);
  const chartData = convertToChartData(spendingData.categories);
  
  // 월별 소비 트렌드 데이터
  const monthlyData = [
    { month: '1월', amount: 750000 },
    { month: '2월', amount: 820000 },
    { month: '3월', amount: 890000 },
    { month: '4월', amount: 850000 },
    { month: '5월', amount: 920000 },
    { month: '6월', amount: 850000 }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
        <h1 className="text-lg font-semibold">내 소비패턴</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* 요약 정보 */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {spendingData.totalMonthly.toLocaleString()}원
              </div>
              <div className="text-sm text-muted-foreground">월 평균 소비</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">
                {spendingData.averageTransaction.toLocaleString()}원
              </div>
              <div className="text-sm text-muted-foreground">평균 결제금액</div>
            </CardContent>
          </Card>
        </div>

        {/* 카테고리별 소비 비율 */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">카테고리별 소비 비율</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={Object.values(benefitCategoryColors)[index % Object.values(benefitCategoryColors).length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}%`, '비율']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* 범례 */}
            <div className="grid grid-cols-2 gap-2">
              {chartData.slice(0, 6).map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: Object.values(benefitCategoryColors)[index] }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 월별 소비 트렌드 */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">월별 소비 트렌드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value/10000}만`} />
                  <Tooltip formatter={(value: any) => [`${value.toLocaleString()}원`, '소비금액']} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 인사이트 */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">소비 인사이트</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>주요 소비 카테고리:</strong> 음식점(25%), 온라인 쇼핑(20%)에서 가장 많이 소비하고 있습니다.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>추천:</strong> 음식점과 온라인 쇼핑 혜택이 좋은 카드를 사용하면 월 약 2-3만원의 추가 혜택을 받을 수 있습니다.
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>절약 팁:</strong> 카페 소비(15%)를 줄이거나 할인 혜택이 있는 카드를 사용해보세요.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Button 
            className="w-full btn-gradient"
            onClick={() => navigate('/chat')}
          >
            맞춤 카드 추천받기
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/card-performance')}
          >
            카드 실적 현황 보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpendingPattern;