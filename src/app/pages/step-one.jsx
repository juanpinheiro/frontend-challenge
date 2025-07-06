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
import { Input } from '@/components/ui/input';
import { emailValidator, nameValidator, passwordValidator } from '@/utils/zod';
import { useSignupData, useSignupActions } from '@/stores/form-store';

const step1Schema = z.object({
  name: nameValidator,
  email: emailValidator,
  password: passwordValidator,
});

const StepOne = () => {
  const navigate = useNavigate();
  const signupData = useSignupData();
  const { completeSignupInfo } = useSignupActions();

  const form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
    },
  });

  const onSubmit = data => {
    completeSignupInfo(data);
    navigate('/more-info');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
        <p className="text-muted-foreground">
          Enter your information to get started.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
          <div className="mt-6">
            <Button type="submit" className="w-full">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepOne;
