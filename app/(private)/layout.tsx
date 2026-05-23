import AuthGuard from "@/app/components/auth/AuthGuard"

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
