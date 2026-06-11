'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import { ArrowRight, Eye, EyeOff } from 'lucide-react';

import { useLogin } from '@/hooks/auth/use-login';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/hooks/auth/use-session';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const loginMutation = useLogin();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) redirect('/overview');
  }, [session, router]);

  async function handleLogin() {
    setError(null);

    try {
      await loginMutation.mutateAsync({
        email,
        password,
      });

      await queryClient.invalidateQueries({
        queryKey: ['session'],
      });

      router.replace('/overview');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm border border-[#1a1a1a] bg-[#0a0a0a]">
        {/* Header */}
        <div className="border-b border-[#1a1a1a] p-5">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

            <span className="text-white font-semibold text-lg">traqory</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5 p-5">
          <div>
            <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
              Email Address
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="
                w-full
                border
                border-[#1a1a1a]
                bg-[#111111]
                px-3
                py-3
                text-sm
                text-white
                placeholder:text-[#555555]
                outline-none
                transition-colors
                focus:border-white
              "
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                Password
              </p>

              <Link
                href="#"
                className="text-[10px] font-mono uppercase tracking-widest text-[#888888] hover:text-white"
              >
                Reset
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="
                  w-full
                  border
                  border-[#1a1a1a]
                  bg-[#111111]
                  px-3
                  py-3
                  pr-10
                  text-sm
                  text-white
                  placeholder:text-[#555555]
                  outline-none
                  transition-colors
                  focus:border-white
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="border border-red-500/20 bg-red-500/5 px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-wide text-red-400">{error}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loginMutation.isPending}
            className="
  flex
  h-10
  w-full
  items-center
  justify-center
  gap-2
  border
  border-[#14532d]
  bg-[#052e16]
  px-4
  text-xs
  font-mono
  uppercase
  tracking-widest
  text-[#86efac]
  transition-colors
  hover:bg-[#064e23]
  hover:border-[#166534]
  disabled:opacity-50
"
          >
            {loginMutation.isPending ? 'Authenticating...' : 'Sign In'}

            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1a1a1a] p-5">
          <p className="text-xs text-[#888888]">
            Don't have an account?{' '}
            <Link href="/register" className="text-white transition-colors hover:text-[#d1d5db]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
