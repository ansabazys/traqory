"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Github } from "lucide-react";
import { login } from "@/lib/api/services/auth.api";
import { useAuthStore } from "@/lib/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await login({ email, password });

      setUser(data.user);

      router.push("/overview");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm" />
          </div>
          <span className="font-sans font-medium text-white text-lg tracking-tight">tracpy</span>
        </div>
        <h1 className="text-2xl font-sans font-medium text-white mb-2">Welcome back</h1>
        <p className="text-[#a1a1aa] text-sm">Enter your credentials to access your dashboard.</p>
      </div>

      <div className="space-y-4 font-sans">
        <div className="space-y-2">
          <div className="flex">
            <label className="text-xs font-medium text-[#a1a1aa] uppercase tracking-wider">
              Email Address
            </label>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-4 py-2.5 bg-[#09090b]/50 border border-[#27272a] rounded-lg text-white placeholder:text-[#52525b] focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[#a1a1aa] uppercase tracking-wider">
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 pr-10 bg-[#09090b]/50 border border-[#27272a] rounded-lg text-white placeholder:text-[#52525b] focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all font-mono text-sm"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* minimal error (no UI redesign) */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2.5 px-4 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group mt-6 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-[#27272a]"></div>
          <span className="flex-shrink-0 mx-4 text-[#52525b] text-xs uppercase tracking-wider bg-black px-2">
            Or continue with
          </span>
          <div className="flex-grow border-t border-[#27272a]"></div>
        </div>

        <button className="w-full py-2.5 px-4 bg-[#18181b]/50 border border-[#27272a] text-white font-medium rounded-lg hover:bg-[#27272a] transition-colors flex items-center justify-center gap-3">
          <Github className="w-5 h-5" />
          GitHub
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-[#71717a] font-sans">
        {"Don't have an account? "}
        <Link
          href="/register"
          className="text-white hover:text-purple-400 transition-colors font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
