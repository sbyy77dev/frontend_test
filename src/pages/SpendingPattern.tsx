import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { analyzeSpendingPattern, convertToChartData } from '../utils/cardRecommendation';
import { benefitCategoryNames, benefitCategoryColors } from '../data/mockData';

const SpendingPattern = () => {
  const navigate = useNavigate();
  
  // ... (기존 로직 동일) ...
  const spendingData = analyzeSpendingPattern([]);
  const chartData = convertToChartData(spendingData.categories);
  
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
    // ... (기존 로직 동일) ...
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
          onClick={() => navigate('/app/chat')} // 경로 수정
          className="mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">내 소비패턴</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* ... (기존 UI 동일) ... */}
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
            {/* ... (차트 및 범례 UI 동일) ... */}
          </CardContent>
        </Card>

        {/* 월별 소비 트렌드 */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">월별 소비 트렌드</CardTitle>
          </CardHeader>
          <CardContent>
            {/* ... (차트 UI 동일) ... */}
          </CardContent>
        </Card>

        {/* 인사이트 */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">소비 인사이트</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
           {/* ... (인사이트 UI 동일) ... */}
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Button 
            className="w-full btn-gradient"
            onClick={() => navigate('/app/chat')} // 경로 수정
          >
            맞춤 카드 추천받기
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/app/performance')} // 경로 수정
          >
            카드 실적 현황 보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpendingPattern;