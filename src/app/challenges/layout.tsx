
type ChallengesLayoutProps = {
  children: React.ReactNode;
}

/**
 * Shared layout for all challenges screens (e.g. a header, sidebar, breadcrumb trail, etc.)
 */
export default function ChallengesLayout({
  children,
}: ChallengesLayoutProps) {
  return (
    <main>
      <nav>
        <div>
          Header Goes Here
        </div>
      </nav>
      {children}
    </main>
  )
}
