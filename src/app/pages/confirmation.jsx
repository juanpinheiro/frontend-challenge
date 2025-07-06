import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSignupData, useSignupActions } from '@/stores/form-store';
import { useSubmitForm } from '@/services/queries';
import { capitalize, maskPassword } from '@/utils/formatters';

const Confirmation = () => {
  const navigate = useNavigate();
  const signupData = useSignupData();
  const { submitSignup } = useSignupActions();
  const {
    mutateAsync: submitMutation,
    isError,
    error,
    isPending,
  } = useSubmitForm();

  const handleSubmit = async () => {
    try {
      await submitMutation(signupData);
      submitSignup(true);
      navigate('/success');
    } catch (error) {
      submitSignup(false, error.message);
      navigate('/error');
    }
  };

  const handleBack = () => {
    navigate('/more-info');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Confirmation</h1>
        <p className="text-muted-foreground">
          Please review your information before submitting.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Personal Information</h3>
          <div className="text-sm text-muted-foreground">
            <p className="mb-1">
              <strong>Name:</strong> {signupData.name}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {signupData.email}
            </p>
            <p className="mb-1">
              <strong>Password:</strong> {maskPassword(signupData.password)}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold mb-2">Additional Information</h3>
          <div className="text-sm text-muted-foreground">
            <p className="mb-1">
              <strong>Favorite Color:</strong> {capitalize(signupData.color)}
            </p>
            <p className="mb-1">
              <strong>Terms Agreed:</strong> {signupData.terms ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
        {isError && (
          <Alert variant="destructive">
            <AlertDescription>
              {error?.message || 'An error occurred during submission'}
            </AlertDescription>
          </Alert>
        )}
        <div className="flex gap-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isPending}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1"
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
