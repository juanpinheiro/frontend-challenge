import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingSpinner } from '@/components/ui/loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSignupData, useSignupActions } from '@/stores/form-store';
import { useColors } from '@/services/queries';
import { capitalize } from '@/utils/formatters';
import { colorValidator, termsValidator } from '@/utils/zod';

export const step2Schema = z.object({
  color: colorValidator,
  terms: termsValidator,
});

const TERMS_URL =
  'https://www.upgrade.com/funnel/borrower-documents/TERMS_OF_USE';

const StepTwo = () => {
  const navigate = useNavigate();
  const signupData = useSignupData();
  const { completePersonalInfo } = useSignupActions();
  const {
    data: colors = [],
    isPending: colorsLoading,
    error: colorsError,
  } = useColors();

  const form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      color: signupData.color,
      terms: signupData.terms,
    },
  });

  const onSubmit = data => {
    completePersonalInfo(data);
    navigate('/confirmation');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (colorsError) {
    return (
      <div className="max-w-md mx-auto">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load colors. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Additional Information</h1>
        <p className="text-muted-foreground">
          Read the terms and conditions and select your favorite color.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your favorite color</FormLabel>
                <FormControl className>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a color..." />
                    </SelectTrigger>
                    <SelectContent>
                      {colorsLoading ? (
                        <div className="p-2">
                          <LoadingSpinner text="Loading colors..." />
                        </div>
                      ) : (
                        colors.map(color => (
                          <SelectItem key={color} value={color}>
                            {capitalize(color)}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div>
                  <FormLabel>
                    <p>
                      I agree to the{' '}
                      <a
                        href={TERMS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 underline"
                      >
                        terms and conditions
                      </a>
                    </p>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button type="submit" disabled={colorsLoading} className="flex-1">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepTwo;
