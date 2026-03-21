import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-8 text-xl text-muted-foreground">Página não encontrada.</p>
      <Link href="/" className="text-primary hover:underline">
        Voltar para a home
      </Link>
    </div>
  );
}
