import RegisterForm from "@/components/auth/RegisterForm";
import AuthSideBanner from "@/components/auth/AuthWrapper";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-5">
        <div className="hidden lg:col-span-2 lg:block">
          <AuthSideBanner />
        </div>

        <div className="flex items-center justify-center p-8 lg:col-span-3">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
