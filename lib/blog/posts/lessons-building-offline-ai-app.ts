import type { Post } from '../types';

/**
 * Product facts come from content.ts `products` (MyPixel Guard). TODO(owner): review the technical lessons
 * against how MyPixel Guard is actually built and adjust any detail that does not match.
 */
export const post: Post = {
  slug: 'lessons-building-offline-ai-app',
  title: 'What we learned building an offline AI app',
  metaTitle: 'Lessons from Building an Offline, On-Device AI App',
  excerpt:
    'MyPixel Guard runs its AI on your own device and never uploads your photos. Building it that way taught us a lot about privacy, performance and honest design.',
  category: 'Lessons',
  tags: ['On-device AI', 'Privacy', 'MyPixel Guard'],
  keywords: ['offline AI app', 'on-device AI', 'privacy-first AI', 'AI in the browser', 'remove image metadata'],
  date: '2026-10-29',
  cover: 'offline',
  takeaways: [
    'Privacy is strongest when it is architecture, not a policy: if files never leave the device, there is nothing to leak.',
    'On-device AI trades raw model size for privacy and instant response, so models must be small and focused on one job.',
    'The slowest device your users own is your real test machine.',
    'AI detection should suggest, not decide. Show what was found and let the person confirm.',
  ],
  services: ['custom-software', 'integrations'],
  body: [
    {
      type: 'p',
      text: '[MyPixel Guard](https://mypixelguard.agentiqbd.com) started as a tool we wanted for ourselves. Every photo taken on a phone carries hidden data: often the GPS location where it was taken, the device model, sometimes the author’s name. Share that photo and you share all of it. We wanted a simple way to see that data, remove it, blur faces and sensitive text, and batch-process a folder of images. So we built it and made it free for everyone.',
    },
    {
      type: 'p',
      text: 'The interesting part is not what it does but where it does it. MyPixel Guard runs on your device. Your photos are never uploaded. That one decision shaped almost everything else, and taught us lessons we now bring to client projects.',
    },
    { type: 'figure', art: 'offline', caption: 'Detection, cleaning and redaction all happen on the device. Nothing goes to a server.' },
    { type: 'h2', text: 'Why offline at all?' },
    {
      type: 'p',
      text: 'The people who need a metadata remover most are people who care about privacy. Asking them to upload their personal photos to our server so we can "make them private" would be a contradiction. So the rule was set on day one: files stay on the device, full stop.',
    },
    { type: 'h2', text: 'Lesson 1: Make privacy a property of the design' },
    {
      type: 'p',
      text: 'A privacy policy is a promise. Architecture is a guarantee. If there is no upload endpoint, there is no server full of user photos to breach, no storage bill growing every month, and no question about how long files are kept. Users do not have to trust us. They can check the network tab.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Ask this early',
      text: 'Before designing any AI feature, ask: does this data actually need to leave the device? If it does not, an on-device design can be more private, faster to respond and cheaper to run.',
    },
    { type: 'h2', text: 'Lesson 2: Small models, chosen for one job' },
    {
      type: 'p',
      text: 'In the cloud you can run enormous models. On a user’s device you are limited by download size, memory and whatever processor they happen to have. That forces a healthy discipline: instead of asking which model is the most powerful, you ask which is the smallest model that does this one job well enough.',
    },
    {
      type: 'p',
      text: 'For tasks like finding faces or text in an image, compact purpose-built detection models do the job far better per megabyte than a general-purpose giant. Two practical habits follow from that:',
    },
    {
      type: 'list',
      items: [
        '**Load models only when needed.** Someone who only wants to strip GPS data should not wait for a face-detection model to download.',
        '**Download once, then cache.** The first use pays the download; every use after that should start instantly, even without a connection.',
      ],
    },
    { type: 'h2', text: 'Lesson 3: The slowest device is your real user' },
    {
      type: 'p',
      text: 'A developer laptop lies to you. Everything is fast on it. The real test is a budget Android phone or a five-year-old office laptop, which is what many people actually use. Processing a batch of fifty images in the browser can freeze the page completely if you are careless.',
    },
    {
      type: 'list',
      items: [
        'Move heavy work off the main thread (for example into web workers) so the interface stays responsive.',
        'Process in chunks and show real progress, not a spinner that might be lying.',
        'Let people cancel. A batch job you cannot stop feels broken, even when it is working.',
        'Test on the cheapest hardware you can find, not just the best.',
      ],
    },
    { type: 'h2', text: 'Lesson 4: AI should suggest; the person decides' },
    {
      type: 'p',
      text: 'Detection models are probabilistic. They can miss a face turned sideways or mark a patterned shirt as text. In most apps a miss is a minor annoyance. In a privacy tool, a silent miss is the worst possible outcome: the user believes they are protected when they are not.',
    },
    {
      type: 'p',
      text: 'So detection results should be shown, not hidden. Every detected face or text region appears as a box the user can see, remove or add to, with a preview before anything is exported. This is the same principle we apply to AI agents in business systems: the AI does the tedious first pass, and a person stays in control of the outcome.',
    },
    { type: 'h2', text: 'Lesson 5: Metadata is messier than you think' },
    {
      type: 'p',
      text: 'Image metadata is not one thing. There are several standards (EXIF, IPTC and XMP among them), different phone and camera makers write them differently, and some files carry an embedded thumbnail that can still show the original image even after the main picture has been cropped or blurred.',
    },
    {
      type: 'p',
      text: 'The lesson: never assume cleaning worked. Inspect, clean, then inspect the result again. Building that verification into the flow turned a "probably clean" tool into one people can rely on.',
    },
    { type: 'h2', text: 'Lesson 6: Offline changes the economics' },
    {
      type: 'p',
      text: 'When the user’s device does the work, there is no server cost per image. That is a large part of why a tool like this can stay free. The trade-off is visibility: with no central logs, you learn less about where things fail. You make up for it with more careful testing before release and by listening closely to user feedback.',
    },
    { type: 'h2', text: 'When on-device AI is the wrong choice' },
    {
      type: 'p',
      text: 'Offline is not always better. It is the wrong fit when:',
    },
    {
      type: 'list',
      items: [
        'The task needs a large model, such as long-form reasoning or high-quality text generation.',
        'Users need to share data with each other, or the business needs one central record.',
        'You need a central audit trail of every action for compliance.',
        'Your users’ devices simply cannot run the model at an acceptable speed.',
      ],
    },
    {
      type: 'p',
      text: 'Many real systems end up hybrid: sensitive pre-processing on the device, heavier work on a server, and only the minimum data crossing the line between them.',
    },
    { type: 'h2', text: 'What this means for client projects' },
    {
      type: 'p',
      text: 'Building MyPixel Guard made one question a habit in every project we scope: **does this data need to leave the device, or the building, at all?** Sometimes the answer changes the whole architecture, and the bill that comes with it. If you are planning software that handles sensitive information, we are happy to think it through with you as part of our [custom software](/services/custom-software) work.',
    },
  ],
};
