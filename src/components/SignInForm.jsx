import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

import api from '../api';
import { useAuthContext } from './AuthProvider';

const singInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const { setToken } = useAuthContext();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setError,
  } = useForm({ resolver: zodResolver(singInFormSchema) });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/signin', data);
      setToken(response.data.accessToken);
    } catch (e) {
      setError('root', {
        message: e.response.data.message,
      });
    }
  };
  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div>
            <Input {...register('email')} placeholder='name@example' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <Input {...register('password')} placeholder='password' />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors.password.message}
              </div>
            )}
          </div>
          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Loading...' : 'Sign In'}
          </Button>
          {errors.root && (
            <div className='text-center text-sm text-red-500'>
              {errors.root.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
