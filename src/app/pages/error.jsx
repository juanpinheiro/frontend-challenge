import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';
import { useSignupActions, useSignupSubmission } from '@/stores/form-store';

const Error = () => {
  const navigate = useNavigate();
  const { resetSignup } = useSignupActions();
  const { error } = useSignupSubmission();

  const handleTryAgain = () => {
    navigate('/confirmation');
  };

  const handleRestart = () => {
    resetSignup();
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <XCircle className="h-16 w-16 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-red-600">
          Submission Error
        </h1>
        <p className="text-muted-foreground">Uh, oh! Something went wrong.</p>
      </div>
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive" className="flex justify-center">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <p className="text-sm text-muted-foreground text-center">
          Please try submitting again, or you can start over with a new form.
        </p>
        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={handleRestart} className="flex-1">
            Start Over
          </Button>
          <Button onClick={handleTryAgain} className="flex-1">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
