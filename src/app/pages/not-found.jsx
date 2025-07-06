import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16" />
        </div>
        <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <div className="mt-6">
        <Button onClick={handleGoHome} className="w-full">
          <Home />
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
