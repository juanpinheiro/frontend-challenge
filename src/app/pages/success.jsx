import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useSignupActions } from '@/stores/form-store';

const Success = () => {
  const navigate = useNavigate();
  const { resetSignup } = useSignupActions();

  const handleRestart = () => {
    resetSignup();
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-800" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-green-800">Success!</h1>
      </div>
      <div className="text-center">
        <p className="text-muted-foreground mb-6">
          Thank you for completing the form. You should receive a confirmation
          email soon.
        </p>
        <div className="mt-6">
          <Button onClick={handleRestart} className="w-full">
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
