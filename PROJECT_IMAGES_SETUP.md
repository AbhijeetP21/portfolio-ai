# Featured project visuals

Featured cards use the optional `visual` field in `src/data/projects.ts`.

## Screenshot

Reuse a real project image under `public/` and include accurate alt text and its original dimensions:

```typescript
visual: {
  kind: 'screenshot',
  src: '/projects/my-project/demo.png',
  width: 1200,
  height: 800,
  alt: 'Describe the interface and the evidence shown.',
  caption: 'Project interface · open full-size image',
},
```

`Work.tsx` renders an optimized, lazy-loaded Next.js image. The image link opens the original at full size in a new tab. There is no lightbox or swipe gallery.

## Architecture preview

When a screenshot is unavailable, use a short, accurate flow based on the project implementation:

```typescript
visual: {
  kind: 'architecture',
  steps: [
    { title: 'Input', detail: 'Describe the input.' },
    { title: 'Process', detail: 'Describe the main step.' },
    { title: 'Output', detail: 'Describe the result.' },
  ],
  caption: 'Simplified architecture · project workflow',
},
```

Architecture previews inherit light and dark theme colors and keep their labels as accessible HTML text.

## Outcome callout

Use `outcome: { value, label, context }` to surface a supported result or capability. Include the benchmark scope in `context` for metrics. Do not invent a metric when the project has no measured result.

## Verification

Check image loading, full-size links, wrapping, and disclosure controls on desktop and mobile. Check light and dark themes. Keep screenshots free of private data and credentials.
