import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/api';

export function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  

  const emailInbox = 'Your email inbox';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try{
        await auth.verifyEmail(email, verificationCode);
        setIsVerified(true);
    } catch (error){
        setError('Invalid email or password');
    }finally {
        setIsSubmitting(false);
      }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Email Verified!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your email has been successfully verified. You can now access all features of your account.
            </p>
          </div>

          <div className="mt-8">
            <Link to="/login">
              <Button className="w-full">
                Continue to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to <span className="font-medium text-blue-600">{emailInbox}</span>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                placeholder='Email'
              />
              <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="verification-code"
                name="verification-code"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter 6-digit code"
              />
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || verificationCode.length < 6}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button type="button" className="font-medium text-blue-600 hover:text-blue-500">
                Resend code
              </button>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Code expires in </span>
              <span className="font-medium text-gray-900">10:00</span>
            </div>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Need help?</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              If you didn't receive a code, check your spam folder or
            </p>
            <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 inline-flex items-center">
              Contact support <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}