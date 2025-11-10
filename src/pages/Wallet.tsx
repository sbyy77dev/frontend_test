import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Loader2, CheckCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import { sampleCards } from '@/data/mockData';

// public/images/에 저장한 새 이미지로 목업 데이터 생성
const mockCards = [
  { ...sampleCards[0], cardImage: '/images/13card.png' },
  { ...sampleCards[1], cardImage: '/images/51card.png' },
  { ...sampleCards[2], cardImage: '/images/2885card.png' }, // 기존 이미지 재활용
];

const Wallet = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'activating' | 'activated'>('idle');

  useEffect(() => {
    if (!api) return;
    
    setActiveIndex(api.selectedScrollSnap());
    
    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handlePayment = () => {
    setPaymentStatus('activating'); 
    
    setTimeout(() => {
      setPaymentStatus('activated'); 
      
      setTimeout(() => {
        setIsModalOpen(false);
        setPaymentStatus('idle'); 
      }, 1500);
    }, 2000);
  };

  const onModalOpenChange = (open: boolean) => {
    if (!open) {
      setPaymentStatus('idle');
    }
    setIsModalOpen(open);
  }

  const getCardToShow = () => mockCards[activeIndex] || mockCards[0];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <h1 className="text-lg font-semibold flex-1 text-center">월렛</h1>
      </div>

      {/* --- 카드 캐러셀 --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 space-y-8 overflow-hidden">
        
        <Carousel 
          setApi={setApi} 
          className="w-full max-w-xs" 
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {mockCards.map((card) => (
              <CarouselItem key={card.id}>
                {/* [수정됨]
                  1. Card의 aspect-ratio를 가로(85.6 / 53.98)로 변경.
                  2. <img>에 -rotate-90 (시계 반대방향 90도) 및 object-contain 추가.
                  3. <img> 스케일을 살짝 조정해 가로 프레임에 맞춤.
                  4. Card에 flex, items-center, justify-center 추가.
                */}
                <Card 
                  className="shadow-elevated overflow-hidden rounded-lg bg-white flex items-center justify-center"
                  style={{
                    aspectRatio: '85.6 / 53.98' // 가로 카드 비율
                  }}
                >
                  <img 
                    src={card.cardImage} 
                    alt={card.name} 
                    className="w-full h-full object-contain -rotate-90 scale-[1.15]" // 90도 회전, 잘림 방지
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 캐러셀 인디케이터 (점) */}
        <div className="flex justify-center gap-2">
          {mockCards.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "w-4 bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* 결제하기 버튼 (AlertDialog 트리거) */}
        <AlertDialog open={isModalOpen} onOpenChange={onModalOpenChange}>
          <AlertDialogTrigger asChild>
            <Button className="w-full max-w-xs mx-auto btn-gradient h-12 text-lg font-medium shadow-lg">
              결제하기
            </Button>
          </AlertDialogTrigger>
          
          {/* --- 결제 모달 (이 부분은 수정 없음) --- */}
          {/* 결제 시에는 카드가 다시 세로로 서서 애니메이션됩니다. */}
          <AlertDialogContent className="max-w-[300px]">
            {paymentStatus === 'idle' && (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle>결제하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {getCardToShow().name}(으)로 1,000원(테스트)을 결제합니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePayment} className="btn-gradient">
                    결제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            )}
            
            {(paymentStatus === 'activating' || paymentStatus === 'activated') && (
              <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 perspective-1000">
                
                {/* "세로로 서는" 카드 애니메이션 */}
                <div 
                  className={cn(
                    "relative w-48 rounded-lg overflow-hidden shadow-elevated transform-style-3d",
                    "animate-card-stand-up", 
                    paymentStatus === 'activated' && "animate-card-activated"
                  )}
                  style={{
                    aspectRatio: '53.98 / 85.6' // 세로 카드 비율
                  }}
                >
                  <img
                    src={getCardToShow().cardImage}
                    alt={getCardToShow().name}
                    className="w-full h-full object-cover backface-hidden"
                  />
                </div>
                
                {paymentStatus === 'activating' && (
                  <div className="flex items-center space-x-2 text-muted-foreground pt-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>결제 중...</span>
                  </div>
                )}
                {paymentStatus === 'activated' && (
                  <div className="flex items-center space-x-2 text-success font-semibold pt-4">
                    <CheckCircle className="w-5 h-5" />
                    <span>결제 완료!</span>
                  </div>
                )}
              </div>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* 카드 추가 버튼 (+) */}
      <Link to="/app/wallet/add" className="absolute bottom-24 right-6 z-10">
        <Button size="icon" className="rounded-full w-14 h-14 btn-gradient shadow-elevated">
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
};

export default Wallet;