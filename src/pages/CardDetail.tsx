import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Gift, AlertCircle, Star, ExternalLink } from 'lucide-react';
import { sampleCards, benefitCategoryNames, benefitCategoryColors } from '../data/mockData';

const CardDetail = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  
  // ... (기존 로직 동일) ...
  const card = sampleCards.find(c => c.id === cardId);
  
  if (!card) {
    // ... (기존 로직 동일) ...
  }

  const getBenefitTypeText = (benefit: any) => {
    // ... (기존 로직 동일) ...
  };

  const getCategoryColor = (category: string) => {
    // ... (기존 로직 동일) ...
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)} // 뒤로가기
          className="mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">카드 상세정보</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* ... (기존 UI 동일) ... */}
        {/* 카드 기본 정보 */}
        <Card className="shadow-card">
          {/* ... */}
        </Card>

        {/* 연회비 정보 */}
        <Card className="shadow-card">
          {/* ... */}
        </Card>

        {/* 혜택 정보 */}
        <Card className="shadow-card">
          {/* ... */}
        </Card>

        {/* 혜택 시뮬레이션 */}
        <Card className="shadow-card">
          {/* ... */}
        </Card>

        {/* 추천 이유 */}
        <Card className="shadow-card">
          {/* ... */}
        </Card>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Button className="w-full btn-gradient">
            <ExternalLink className="w-4 h-4 mr-2" />
            카드 신청하기
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              onClick={() => navigate('/app/chat')} // 경로 수정
            >
              다른 카드 추천받기
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/recommendations')} // 추천 결과로 돌아가기 (이 경로는 root에 유지됨)
            >
              추천 결과로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;