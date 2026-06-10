'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';

export default function TasaArticle() {
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
                                Biometric Security
                            </p>

                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5 text-zinc-950 dark:text-zinc-50">
                                How I Built TASA: Face Authentication for a Virtual Assistant
                            </h1>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Implementing hierarchical access control and real-time face recognition with CNN + HOG for a privacy-aware virtual assistant. A legacy project retrospective.
                            </p>

                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-5">
                                Jan 2024 · 10 min read
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {['Python', 'OpenCV', 'TensorFlow', 'Security'].map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </header>

                        {/* Article Body */}
                        <div className="space-y-14">

                            {/* Section: The Problem Space */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Problem Space
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Back in 2023, I worked on TASA as my undergraduate research project. The motivation was straightforward: virtual assistants like Alexa and Siri had a fundamental security flaw. They couldn&apos;t distinguish between users. Anyone within earshot could access your calendar, messages, or smart home controls. There was no concept of <strong className="text-zinc-950 dark:text-zinc-50">ownership or privacy</strong>.
                                    </p>
                                    <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                        <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            TASA (Trusted Assistant with Secure Access) explored whether we could build a virtual assistant with proper authentication and hierarchical access control, without sacrificing the hands-free convenience that makes these systems useful.
                                        </p>
                                    </blockquote>
                                </div>
                            </section>

                            {/* Section: Legacy Project Note */}
                            <section>
                                <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 mb-2">
                                        Legacy Project Note
                                    </p>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        This was an academic research project completed in 2023. The code is no longer publicly available, but the technical approach and lessons learned remain relevant for anyone interested in biometric authentication or secure system design.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Authentication Pipeline */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    The Authentication Pipeline
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The core challenge was building a multi-layered authentication system that worked in real-time. We settled on a <strong className="text-zinc-950 dark:text-zinc-50">two-factor approach</strong>:
                                    </p>
                                    <div className="space-y-4">
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Primary: Face Recognition</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">CNN with HOG (Histogram of Oriented Gradients) feature descriptors for real-time face identification</p>
                                        </div>
                                        <div className="border-l-2 border-amber-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Secondary: Secret Passphrase</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">User-specific passphrase prevents photo-based spoofing and adds a knowledge factor</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Why HOG? */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Why HOG for Feature Extraction?
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Most modern face recognition systems use deep feature extractors like FaceNet or ArcFace. We chose Histogram of Oriented Gradients for specific reasons:
                                    </p>

                                    <div className="grid gap-4 mb-8">
                                        {[
                                            { title: 'Computational Efficiency', desc: 'Significantly lighter than end-to-end deep learning. Critical for real-time on a Raspberry Pi.' },
                                            { title: 'Interpretability', desc: 'HOG captures structural features: gradient orientations that correspond to edges and contours. More transparent than black-box deep features.' },
                                            { title: 'Low Training Requirements', desc: 'Requires far fewer training samples per user. Realistic when each user only provides 50–100 registration images.' },
                                        ].map((item) => (
                                            <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pipeline Diagram */}
                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <div className="mb-4">
                                            <span className="text-zinc-500">// HOG Feature Extraction Pipeline</span>
                                        </div>
                                        <div className="text-emerald-400">
                                            Image → Preprocessing → Gradient Calculation → Cell Division →
                                        </div>
                                        <div className="text-emerald-400">
                                            Histogram Generation → Block Normalization → Feature Vector → CNN
                                        </div>
                                        <div className="mt-4">
                                            <span className="text-zinc-500">// Per-pixel gradient computation</span>
                                        </div>
                                        <div>
                                            <span className="text-purple-400">Magnitude</span>: G = √(Gx² + Gy²)
                                        </div>
                                        <div>
                                            <span className="text-purple-400">Orientation</span>: θ = arctan(Gy/Gx)
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The image is divided into 8×8 pixel cells. For each cell, we build a <strong className="text-zinc-950 dark:text-zinc-50">9-bin histogram of gradient orientations</strong>. These histograms are then normalized using L2 normalization across overlapping blocks to handle lighting variations. The result is a feature descriptor that&apos;s robust to illumination changes but sensitive to facial structure.
                                    </p>
                                </div>
                            </section>

                            {/* Section: CNN Architecture */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The CNN Architecture
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The HOG descriptors feed into a relatively shallow CNN (3 convolutional layers + 2 fully connected layers). The network learns to classify users into three tiers, detect invalid authentication attempts, and handle <strong className="text-zinc-950 dark:text-zinc-50">temporal information across video frames</strong>.
                                    </p>

                                    <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-red-600 dark:text-red-400 mb-2">
                                            Anti-Spoofing
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Rather than processing single images, we extract features from multiple consecutive frames. The CNN learns patterns that only appear in live video feeds: micro-movements, subtle lighting changes, natural head motion. Static photos fail this temporal consistency check.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Multi-Level Access Control */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Multi-Level Access Control
                                </h2>
                                <div className="space-y-6">
                                    <div className="border-l-2 border-amber-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                                            Admin (Owner)
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">Full system access: personalized data, system configuration, user management, and all standard assistant features.</p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                                            Sub-Admin
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">Configurable partial access: general assistant features, limited personal data, no system configuration rights.</p>
                                    </div>
                                    <div className="border-l-2 border-zinc-400 dark:border-zinc-600 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                                            Guest
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">Minimal access: public information queries, basic entertainment. Zero access to personal data or system settings.</p>
                                    </div>

                                    <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                                            Key Design
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            This hierarchy is enforced at the backend API level, not just in the UI. Critical for actual security.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Implementation Challenges */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Implementation Challenges
                                </h2>
                                <div className="space-y-8">
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-4">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg">
                                            Real-Time Performance
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Face recognition needed to happen in &lt;500ms to feel seamless. Our initial implementation took 2–3 seconds.
                                        </p>
                                        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                                            {[
                                                'Reduced HOG cell size from 16×16 to 8×8',
                                                'Implemented frame skipping: authenticate every 3rd frame',
                                                'Used OpenCV Haar Cascade for initial face detection (very fast) before HOG+CNN',
                                                'Moved histogram normalization to GPU',
                                            ].map((item) => (
                                                <div key={item} className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-4">
                                            Result: ~400ms on a Raspberry Pi 4
                                        </p>
                                    </div>

                                    <div className="border-l-2 border-red-500 pl-6 space-y-4">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg">
                                            Static Image Bypass
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Early testing showed users could authenticate using printed photos, defeating the entire purpose.
                                        </p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            <strong className="text-zinc-950 dark:text-zinc-50">Solution:</strong> Multi-frame temporal analysis. The CNN looks for consistency across 5–10 consecutive frames. A static image shows perfect consistency (too perfect), while a real face shows natural micro-variations. We also added a liveness check: prompting users to turn their head slightly.
                                        </p>
                                    </div>

                                    <div className="border-l-2 border-amber-500 pl-6 space-y-4">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg">
                                            False Rejection Rate
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Initial accuracy was 90%, but false rejections were frustrating. Users would get denied despite being registered.
                                        </p>
                                        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                                            {[
                                                'Histogram equalization during preprocessing',
                                                'Multiple registration sessions under different lighting',
                                                'Confidence thresholding: 70-85% triggers passphrase instead of rejecting',
                                            ].map((item) => (
                                                <div key={item} className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold mt-4">
                                            False rejections reduced from ~10% to ~3%
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Results & Performance */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Results &amp; Performance
                                </h2>
                                <div>
                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {[
                                            { value: '90%', label: 'Recognition Accuracy' },
                                            { value: '92%', label: 'Precision' },
                                            { value: '<1%', label: 'False Positive Rate' },
                                            { value: '420ms', label: 'Avg Authentication Time' },
                                        ].map((item) => (
                                            <div key={item.label} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{item.value}</div>
                                                <div className="text-xs text-zinc-600 dark:text-zinc-400">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Compared to consumer products (Alexa, Siri, Google Assistant), TASA offered user authentication, hierarchical access control, anti-spoofing protection, and transparent data access policies. Features none of them had at the time.
                                    </p>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The tradeoff was requiring users to authenticate before each session, but for security-sensitive use cases (banking queries, medical data, confidential work), this seemed reasonable.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Lessons Learned / What I'd Do Differently */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    What I&apos;d Do Differently Today
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                        <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 text-base mb-4">
                                            Improvements
                                        </h3>
                                        <ul className="space-y-3">
                                            {[
                                                'Use pre-trained face embeddings (FaceNet/dlib)',
                                                'Add voice biometrics for stronger multi-modal auth',
                                                'Edge ML optimization with TFLite or ONNX Runtime',
                                                'Differential privacy for stored biometrics',
                                            ].map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300 text-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                        <h3 className="font-semibold text-amber-600 dark:text-amber-400 text-base mb-4">
                                            Key Takeaways
                                        </h3>
                                        <ul className="space-y-3">
                                            {[
                                                'Security and UX are in constant tension',
                                                'Traditional CV techniques still have real value',
                                                'Temporal information from video is underutilized',
                                                '90% accuracy ≠ 90% user satisfaction',
                                            ].map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300 text-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Philosophy */}
                            <section>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                                    TASA taught me a fundamental lesson:
                                </p>
                                <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                    <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        &quot;Build security that people will actually use.&quot;
                                    </p>
                                </blockquote>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
                                    The safest system is useless if users bypass it out of frustration.
                                </p>
                            </section>

                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mb-4">Published &amp; Patented</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                                TASA was published at IEEE ICCUBEA 2023 and filed as an Indian patent (202221066577).
                            </p>
                            <div className="flex flex-wrap items-center gap-6">
                                <a
                                    href="https://ieeexplore.ieee.org/document/10392101"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    IEEE ICCUBEA 2023
                                    <Icon name="arrow-up-right" size={12} />
                                </a>
                                <a
                                    href="https://iprsearch.ipindia.gov.in/publicsearch"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    Indian Patent Filed
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
