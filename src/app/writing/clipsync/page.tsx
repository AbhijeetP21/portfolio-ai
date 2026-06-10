'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';

function CodeChip({ children }: { children: React.ReactNode }) {
    return (
        <code className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-[13px] font-mono text-emerald-600 dark:text-emerald-400">
            {children}
        </code>
    );
}

export default function ClipSyncArticle() {
    return (
        <>
            {/* Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-lg border-b border-zinc-200/60 dark:border-zinc-800/60">
                <nav className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-mono text-lg font-bold tracking-tighter text-zinc-950 dark:text-zinc-50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                        ap<span className="text-emerald-600 dark:text-emerald-400">.</span>
                    </Link>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link
                            href="/writing"
                            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                        >
                            <span className="hidden sm:inline">Back to writing</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            {/* Article Content */}
            <main className="min-h-screen pt-36 pb-20">
                <article className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto">

                        {/* Article Header */}
                        <header className="mb-16">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-4">
                                Full-Stack Engineering
                            </p>

                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5 text-zinc-950 dark:text-zinc-50">
                                ClipSync: Building a Secure, Real-Time Clipboard Manager Without a Custom Backend
                            </h1>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Syncing clipboard items, links, and files across devices instantly using PostgreSQL, RLS, and Next.js.
                            </p>

                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-5">
                                Jun 2026 · 10 min read
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel'].map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </header>

                        {/* Article Body */}
                        <div className="space-y-14">

                            {/* Section: Intro Quote */}
                            <section>
                                <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                    <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        My workaround for moving content between devices was messaging myself on WhatsApp. It worked, technically. But it buried every link and snippet inside a thread with no organization, no useful search, and no way to tell &quot;I&apos;ll need this next week&quot; from &quot;I needed this once and forgot to delete it.&quot; ClipSync is what I built instead.
                                    </p>
                                </blockquote>
                            </section>

                            {/* Section: Architecture Decision */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Architecture Decision That Shapes Everything
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Most web apps have a custom API server between the browser and the database. The browser calls the server, the server validates the request, checks permissions, and talks to the database. That chain is familiar, but for a solo project it also means writing, deploying, and maintaining an entire service that mostly exists to proxy queries.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        ClipSync takes a different approach: <strong className="text-zinc-950 dark:text-zinc-50">the browser talks directly to Supabase over HTTPS.</strong> There is no custom application server in the request path. The front end, a Next.js 15 App Router app deployed on Vercel, holds a single Supabase client instance configured with the project URL and the publishable key. All reads and writes go from the browser to Supabase directly, authenticated by the user&apos;s JWT.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        That sounds like it should be insecure. It is not, because authorization is handled at the right layer.
                                    </p>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <div className="text-zinc-500 mb-2">{'//'} Client initialization</div>
                                        <div>
                                            <span className="text-purple-400">const</span> <span className="text-blue-300">supabase</span> = <span className="text-emerald-400">createBrowserClient</span>(
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-blue-300">process</span>.<span className="text-blue-300">env</span>.<span className="text-amber-400">NEXT_PUBLIC_SUPABASE_URL</span>,
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-blue-300">process</span>.<span className="text-blue-300">env</span>.<span className="text-amber-400">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</span>
                                        </div>
                                        <div>)</div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The publishable key only allows making requests. What those requests can actually read or write is controlled entirely by Postgres Row Level Security, which is enforced at the database before any data is returned or modified. The service role key, which can bypass that security, is never shipped to the client and is not used by the application at all.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Security Without Server */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Security Without a Server in the Middle
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Row Level Security is a Postgres feature where access policies are attached to table rows. Every table in ClipSync carries a <CodeChip>user_id</CodeChip> column. Every policy checks <CodeChip>auth.uid() = user_id</CodeChip> for select, insert, update, and delete.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        When a request arrives, Postgres evaluates the policy before returning or modifying any data. Even a direct request to the Supabase endpoint with a valid JWT can only touch rows where the authenticated user id matches.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        <strong className="text-zinc-950 dark:text-zinc-50">This is the real security boundary, not the UI.</strong> The client-side route guard in <CodeChip>auth-provider.tsx</CodeChip> redirects unauthenticated users to the login page. That is a UX concern. If it were removed or bypassed, the database policies would still hold. A user cannot read or modify another user&apos;s rows regardless of what the client sends.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The practical consequence: authorization comes free at the data layer. There is no permission-checking middleware to write, no server route to forget, and no code path that might accidentally expose one user&apos;s data to another.
                                    </p>

                                    <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg mt-8 mb-4">Four tables, one security model:</h3>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { table: 'clips', policy: 'auth.uid() = user_id', desc: 'Stores clipboard content snippet and files metadata.' },
                                            { table: 'saved_pages', policy: 'auth.uid() = user_id', desc: 'Saved articles, URLs, and pages for read-later.' },
                                            { table: 'saved_notes', policy: 'auth.uid() = user_id', desc: 'User notes and organized textual snippets.' },
                                            { table: 'config', policy: 'auth.uid() is not null', desc: 'Shared system config. No user-specific data; read-only for authenticated users.' },
                                        ].map((item) => (
                                            <div key={item.table} className="flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{item.table}</span>
                                                    <span className="text-[11px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 rounded font-mono">{item.policy}</span>
                                                </div>
                                                <p className="text-xs text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Section: Keeping Files Private */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Keeping Files Private
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Files live in a private Supabase Storage bucket named <CodeChip>clips-files</CodeChip>. Every upload goes to a path namespaced by user id: <CodeChip>&#123;userId&#125;/&#123;timestamp&#125;-&#123;sanitizedFileName&#125;</CodeChip>. The bucket&apos;s RLS policy requires <CodeChip>auth.uid() = owner</CodeChip> for insert, select, and delete. The bucket itself is not public, so there is no URL to guess or enumerate.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        To display or download a file, the app calls <CodeChip>createSignedUrl</CodeChip>, which returns a time-limited URL granting temporary access to one specific storage object.
                                    </p>

                                    <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mt-8 mb-4">Access by content type:</h3>
                                    <div className="space-y-3">
                                        {[
                                            { type: 'Image clips', desc: 'Render in an img element pointed at a signed URL with a longer expiry.' },
                                            { type: 'PDF clips', desc: 'Render in an iframe using the browser\'s native PDF viewer, served through the same URL type.' },
                                            { type: 'Downloads', desc: 'Use a short-lived signed URL (about one minute) with the download option so the browser saves the file with its original name.' },
                                        ].map((item) => (
                                            <div key={item.type} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 shrink-0 sm:w-28">{item.type}</span>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 mt-6">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                                            Security Configuration
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            The Content Security Policy in <CodeChip>next.config.ts</CodeChip> was widened to allow images and frames from the Supabase domain (<CodeChip>img-src</CodeChip> and <CodeChip>frame-src</CodeChip>) and connections for Realtime (<CodeChip>connect-src</CodeChip>), while keeping all other sources locked down.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Real-Time Sync */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Real-Time Sync Across Devices
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        There is no device pairing step in ClipSync. Identity is just the signed-in user. Signing in on a second device with the same account gives the same user id, and Row Level Security returns the same rows. Cross-device identity is authentication, nothing more.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        For live updates, the <CodeChip>useClips</CodeChip> and <CodeChip>useSavedPages</CodeChip> hooks subscribe to Postgres change events via <strong className="text-zinc-950 dark:text-zinc-50">Supabase Realtime</strong>, filtered to the current user&apos;s <CodeChip>user_id</CodeChip>.
                                    </p>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <div className="text-zinc-500 mb-2">{'//'} Realtime subscription (simplified)</div>
                                        <div>
                                            <span className="text-blue-300">supabase</span>
                                        </div>
                                        <div className="pl-4">
                                            .<span className="text-emerald-400">channel</span>(<span className="text-amber-400">&apos;clips-changes&apos;</span>)
                                        </div>
                                        <div className="pl-4">
                                            .<span className="text-emerald-400">on</span>(<span className="text-amber-400">&apos;postgres_changes&apos;</span>, &#123;
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-300">event</span>: <span className="text-amber-400">&apos;*&apos;</span>,
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-300">schema</span>: <span className="text-amber-400">&apos;public&apos;</span>,
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-300">table</span>: <span className="text-amber-400">&apos;clips&apos;</span>,
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-300">filter</span>: <span className="text-amber-400">`user_id=eq.$&#123;userId&#125;`</span>
                                        </div>
                                        <div className="pl-4">
                                            &#125;, <span className="text-blue-300">handleChange</span>)
                                        </div>
                                        <div className="pl-4">
                                            .<span className="text-emerald-400">subscribe</span>()
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Insert, update, and delete events are applied to the local Zustand store directly, without a full refetch. A clip added on a phone appears on a signed-in laptop within about a second. Because Realtime also respects Row Level Security, a device only receives events for its own user&apos;s data. The subscription is set up inside each hook alongside the initial data fetch, and unsubscribed on unmount to prevent leaked channels.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Three Bugs */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Three Bugs Worth Talking About
                                </h2>
                                <div className="space-y-12">
                                    {/* Bug 1 */}
                                    <div className="border-l-2 border-amber-500 pl-6 space-y-4">
                                        <h3 className="font-semibold text-xl text-zinc-950 dark:text-zinc-50">
                                            1. The Shared-File Problem
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            When you save a clipboard clip into a saved page, ClipSync creates a new row in <CodeChip>saved_notes</CodeChip>. For file clips, the initial implementation copied the storage path from the original clip row into the new saved note row. Both records now pointed at the same underlying file.
                                        </p>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            That looks fine until you delete the original clip. Deleting a clip removes its associated storage object. The saved note row still exists, but it now references a path with no file behind it. The note has a filename and no content.
                                        </p>

                                        <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-4 overflow-x-auto text-zinc-300">
                                            <div className="text-zinc-500 mb-2">{'//'} Copy the file on save so each record owns a separate object</div>
                                            <div>
                                                <span className="text-purple-400">const</span> &#123; <span className="text-blue-300">data</span> &#125; = <span className="text-purple-400">await</span> <span className="text-blue-300">supabase</span>.<span className="text-blue-300">storage</span>
                                            </div>
                                            <div className="pl-4">
                                                .<span className="text-emerald-400">from</span>(<span className="text-amber-400">&apos;clips-files&apos;</span>)
                                            </div>
                                            <div className="pl-4">
                                                .<span className="text-emerald-400">copy</span>(<span className="text-blue-300">originalPath</span>, <span className="text-blue-300">newPath</span>)
                                            </div>
                                        </div>

                                        <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5">
                                            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 mb-2">
                                                Lesson Learned
                                            </p>
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                                This was a classic issue of shared resource ownership. When two separate database records point to the same file lifecycle, one deleting itself will silently corrupt the other. The fix was to physically copy the storage file during the save action.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bug 2 */}
                                    <div className="border-l-2 border-amber-500 pl-6 space-y-4">
                                        <h3 className="font-semibold text-xl text-zinc-950 dark:text-zinc-50">
                                            2. How to Design a Trash Bin
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Adding a trash bin for saved notes came down to a schema choice: a <CodeChip>deleted_at</CodeChip> timestamp column on the existing table, or a separate <CodeChip>saved_notes_trash</CodeChip> table.
                                        </p>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            <strong className="text-zinc-950 dark:text-zinc-50">Soft-delete won.</strong> Here is why. Active queries filter on <CodeChip>deleted_at is null</CodeChip>. The trash view filters on <CodeChip>deleted_at is not null</CodeChip> within the 7-day retention window. Restoring a note is a single update setting <CodeChip>deleted_at</CodeChip> back to null. The underlying file in storage is never touched during delete or restore, so the file is always present when the user comes back.
                                        </p>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            A separate table would have meant moving rows on delete, moving them back on restore, and deciding what to do with the storage object during each transition. That is more state to keep synchronized and more places to create a mismatch between the database row and the storage object. The simplest design that is still correct is usually the right one, especially when recovery from error is straightforward.
                                        </p>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            The purge logic runs when the saved page opens: it queries for notes past the retention window and deletes them along with their storage objects.
                                        </p>
                                    </div>

                                    {/* Bug 3 */}
                                    <div className="border-l-2 border-amber-500 pl-6 space-y-4">
                                        <h3 className="font-semibold text-xl text-zinc-950 dark:text-zinc-50">
                                            3. Drag-and-Drop Had Two Separate Bugs
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Reordering saved notes with <CodeChip>dnd-kit</CodeChip> introduced two distinct problems that looked related but were not:
                                        </p>
                                        <div className="space-y-4">
                                            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Bug A: Clicks stopped working on the note cards</p>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                                                    The drag listeners were attached to the entire card element. This intercepted pointer events, so clicking delete or any other button on the card did nothing because the drag handler saw it first.
                                                </p>
                                                <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-3">
                                                    Fix: Moved listeners to a dedicated drag handle and added a minimum drag distance constraint.
                                                </p>
                                            </div>
                                            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Bug B: The order did not persist after reordering</p>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                                                    Saving the new position used an upsert. Postgres executes the insert path of an upsert first, before checking for a conflict. The rows were missing NOT NULL columns that exist on the original insert, so Postgres errored before it ever reached the conflict resolution step.
                                                </p>
                                                <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-3">
                                                    Fix: Replaced the upsert with individual update statements targeting each row&apos;s position.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Multi-Tenancy */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Multi-Tenancy From a Single-User Start
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The project originally shipped with a single-user lock: a config table row recording the first registered email address, checked on every login. Anyone other than that email was denied, at the application level.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Removing it required no schema changes. Row Level Security was already in place and already isolated each user&apos;s data. Lifting the gate did not weaken data separation because the gate was never the isolation mechanism. It only controlled who could get a JWT. Once gone, anyone can sign up and receive their own private workspace.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The distinction matters: <strong className="text-zinc-950 dark:text-zinc-50">application-level gating and database-level multi-tenancy are different things.</strong> RLS provides the isolation. The lock was a restriction on top of it. Once I understood that, removing it was a small change. The dead lock functions were deleted afterward to prevent leaving dead code.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Email */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Email That Actually Arrives
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Supabase&apos;s default mailer is rate-limited and intended for testing. In production, magic links need to reliably reach arbitrary email addresses. The solution was to configure Resend as custom SMTP in Supabase Auth.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The sending domain is a subdomain of my portfolio domain, not the root domain. <strong className="text-zinc-950 dark:text-zinc-50">Reputation isolation</strong>: if the app&apos;s transactional email ever has deliverability problems, it does not affect email sent from the root domain. That is a simple DNS decision worth making early.
                                    </p>
                                    <div className="space-y-3 mt-6">
                                        {[
                                            { name: 'SPF', desc: 'Declares which mail servers are authorized to send email on behalf of the subdomain.' },
                                            { name: 'DKIM', desc: 'Adds a digital signature to emails, allowing receiving servers to verify they were sent by the domain owner.' },
                                            { name: 'DMARC', desc: 'Defines how the receiver should handle emails that fail SPF or DKIM checks, providing reports back.' },
                                        ].map((item) => (
                                            <div key={item.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 sm:w-28">{item.name}</span>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Section: What I'd Do Differently */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    What I&apos;d Do Differently next time
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: 'Add Tests first', desc: 'Write end-to-end and integration tests prior to adding features to catch lifecycle bugs like the shared-file issue.' },
                                        { title: 'Public Landing Page', desc: 'Build a public-facing static landing page with an app explanation and Sign In CTA, rather than putting the entire domain behind authentication.' },
                                        { title: 'Syntax Highlighting', desc: 'Utilize lightweight highlighting libraries like Shiki to improve readability of code snippets inside text clips.' },
                                        { title: 'Database Functions', desc: 'Migrate reordering calculations to a database RPC function to prevent multiple sequential client updates and preserve atomicity.' },
                                    ].map((item) => (
                                        <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                            <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mb-4">Want to try it out?</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                <a
                                    href="https://github.com/AbhijeetP21/ClipSync"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    <Icon name="github" size={14} />
                                    View Source Code
                                    <Icon name="arrow-up-right" size={12} />
                                </a>
                                <a
                                    href="https://clipsync.abhijeetpachpute.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    Live Demo
                                    <Icon name="arrow-up-right" size={12} />
                                </a>
                            </div>
                        </div>

                    </div>
                </article>
            </main>

            {/* Footer */}
            <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800/80">
                <div className="container mx-auto px-6 max-w-5xl flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} Abhijeet Sandip Pachpute</p>
                    <p>United States</p>
                </div>
            </footer>
        </>
    );
}
