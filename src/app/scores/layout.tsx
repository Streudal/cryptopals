import { Header } from '@/components/Header';

type ChallengesLayoutProps = {
  children: React.ReactNode;
}

/**
 * Shared layout for all challenges screens (e.g. a header, sidebar, breadcrumb trail, etc.)
 */
export default function ScoresLayout({
  children,
}: ChallengesLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
