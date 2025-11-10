import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// 가상 카드사 목록
const mockCardIssuers = [
  { id: 'kb', name: '국민카드' },
  { id: 'shinhan', name: '신한카드' },
  { id: 'samsung', name: '삼성카드' },
  { id: 'hyundai', name: '현대카드' },
  { id: 'lotte', name: '롯데카드' },
  { id: 'woori', name: '우리카드' },
];

const RegisterCards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);

  const handleIssuerClick = (issuerId: string) => {
    setSelectedIssuers((prevSelected) =>
      prevSelected.includes(issuerId)
        ? prevSelected.filter((id) => id !== issuerId) // 이미 있으면 제거
        : [...prevSelected, issuerId] // 없으면 추가
    );
  };

  const handleRegister = () => {
    if (selectedIssuers.length === 0) {
      toast({
        title: "선택 필요",
        description: "등록할 카드사를 하나 이상 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    toast({
      title: "카드 정보 연동 중...",
      description: `${selectedIssuers.length}개 카드사의 정보를 불러옵니다.`,
    });

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "등록 완료",
        description: "카드 등록이 완료되었습니다.",
      });
      // 완료 후 월렛 페이지로 이동
      navigate('/app/wallet');
    }, 2000);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/app/wallet')} // 뒤로가기 시 월렛으로
          className="mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">보유 카드 등록</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Card className="shadow-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">카드 등록</CardTitle>
            <CardDescription>
              정확한 추천을 위해 보유 카드를 연동해주세요. (다중 선택 가능)
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {mockCardIssuers.map((issuer) => (
                <Button
                  key={issuer.id}
                  variant={selectedIssuers.includes(issuer.id) ? "default" : "outline"}
                  className="flex-col h-20"
                  onClick={() => handleIssuerClick(issuer.id)}
                >
                  <CreditCard className="w-6 h-6 mb-1" />
                  <span className="text-xs">{issuer.name}</span>
                </Button>
              ))}
            </div>

            <Button 
              className="w-full btn-gradient h-11"
              disabled={isLoading || selectedIssuers.length === 0}
              onClick={handleRegister}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "등록 중..." : `선택한 ${selectedIssuers.length}개 카드사 등록하기`}
            </Button>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/app/wallet')} // 다음에 하기 시 월렛으로
            >
              다음에 하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterCards;