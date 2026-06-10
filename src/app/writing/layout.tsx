// The writing pages still use Font Awesome <i> icons in their content.
// The icon CSS is loaded here (instead of the root layout) so the homepage
// doesn't pay for it.
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
