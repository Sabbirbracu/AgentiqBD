/**
 * Privacy policy and terms & conditions, rendered by components/sections/legal-page.tsx.
 *
 * Written on 2026-10-30 from what the site and business actually do: no forms, no analytics or tracking cookies,
 * enquiries by email / WhatsApp / phone / booking link, hosting on our own server, prices from lib/package-pages.ts.
 * Business policies the owner has not set yet are written as "stated in your quote" instead of a number.
 *
 * TODO(owner): have a lawyer in Bangladesh review both documents, add the registered legal name and trade licence
 * number to `legalEntity`, and confirm the marked items (outreach, retention periods, refunds, liability cap).
 * Bump `updated` (and lib/seo.ts `contentUpdated`) whenever the text changes.
 *
 * Text tokens, turned into links by the page: {email}, {phone}, {whatsapp}, {privacy}, {terms}, {packages}.
 */

export type LegalBlock = string | { list: string[] };
export type LegalSection = { id: string; title: string; body: LegalBlock[] };
export type LegalDoc = {
  path: '/privacy' | '/terms';
  title: string;
  metaTitle: string;
  description: string;
  /** ISO dates. */
  effective: string;
  updated: string;
  intro: string;
  /** Plain-language summary shown above the full text. Not a substitute for it. */
  summary: string[];
  sections: LegalSection[];
};

/** TODO(owner): replace with the registered business name and trade licence number once confirmed. */
export const legalEntity = 'Agentiq BD';

export const privacyPolicy: LegalDoc = {
  path: '/privacy',
  title: 'Privacy policy',
  metaTitle: 'Privacy Policy',
  description:
    'How Agentiq BD collects, uses, shares and protects personal information when you visit agentiqbd.com, contact us, book a call or work with us.',
  effective: '2026-10-30',
  updated: '2026-10-30',
  intro:
    'This policy explains what personal information Agentiq BD collects, why we collect it, who we share it with and the choices you have. It covers our website at agentiqbd.com, enquiries, discovery calls, the free AI Business Audit and the projects we deliver for clients.',
  summary: [
    'We only collect what you choose to send us, plus basic server logs that keep the website secure.',
    'This website does not use advertising or analytics cookies, and it does not track you across other sites.',
    'We never sell your personal information, and we do not use your data to train AI models without your written permission.',
    'You can ask us at any time to see, correct or delete what we hold about you.',
  ],
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: [
        `${legalEntity} ("Agentiq BD", "we", "us") is an AI engineering and software company based at Pragati Sarani, Merul Badda, Dhaka, Bangladesh. We decide how and why personal information collected through our website and our own business activities is used.`,
        'Some of our products, such as MyPixel Guard and BatchPilot, may have their own privacy notices. Where a product has its own notice, that notice applies to the product.',
        'Questions about this policy can be sent to {email}.',
      ],
    },
    {
      id: 'what-we-collect',
      title: 'Information we collect',
      body: [
        'Information you give us. When you email us, message us on WhatsApp, call us or ask for a quote or audit, we receive what you choose to share. This usually includes:',
        {
          list: [
            'your name, email address and phone or WhatsApp number',
            'your company name, role and website',
            'the content of your messages, and any files you send',
            'information about your business, workflows and tools that you share for an audit, proposal or project',
          ],
        },
        'Bookings. If you book a discovery call through our scheduling link, the scheduling provider shares your name, email address, the time you chose and any answers you give with us.',
        'Information collected automatically. Like almost every website, our server records basic technical details for each request: IP address, browser and device type, the page requested, the referring page, and the date and time. We use these logs to keep the site secure and to fix problems, not to build profiles of visitors.',
        // TODO(owner): confirm this matches how outreach is done.
        'Business contact details. We may find the business contact details of companies we think could benefit from our services in public sources such as company websites, business directories and professional profiles, and contact them about our services. Every message we send explains how to tell us to stop.',
        'Please do not send us sensitive information (for example health, financial account or government ID details) through email or chat unless we have agreed a secure way to receive it for a project.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and analytics',
      body: [
        'This website does not set advertising or analytics cookies and does not use tracking pixels. Fonts and images are served from our own server.',
        'If we add analytics in the future, we will update this policy first and, where the law requires it, ask for your consent.',
        'When you follow a link to another service, such as WhatsApp, our scheduling provider or our social media pages, that service may set its own cookies under its own privacy policy.',
      ],
    },
    {
      id: 'how-we-use',
      title: 'How we use your information',
      body: [
        'We use personal information to:',
        {
          list: [
            'reply to your enquiries and hold discovery calls',
            'prepare your free AI Business Audit, proposals and quotes',
            'deliver, support and maintain the projects you hire us for',
            'send invoices, keep business and tax records and meet our legal obligations',
            'keep our website and systems secure and working properly',
            'contact businesses about our services, as described above',
          ],
        },
        'We only send newsletters or marketing updates to people who ask for them, and you can unsubscribe at any time.',
      ],
    },
    {
      id: 'legal-bases',
      title: 'Legal bases for using your information',
      body: [
        'If you are in a country whose law requires a legal basis for processing personal information (such as the EU or the UK), we rely on:',
        {
          list: [
            'Contract: to take steps you ask for before a project and to deliver the project.',
            'Legitimate interests: to answer enquiries, contact businesses about relevant services, run and secure our website, and improve our services, balanced against your rights.',
            'Legal obligation: to keep financial and tax records.',
            'Consent: where we ask for it, for example for newsletters. You can withdraw consent at any time.',
          ],
        },
      ],
    },
    {
      id: 'client-data',
      title: 'Data in client projects',
      body: [
        'When we build or run systems for a client, we may handle personal information that belongs to the client, such as their customers, staff or students. In those cases the client decides how that information is used, and we act on the client’s written instructions as their service provider.',
        'For client projects we:',
        {
          list: [
            'access only the data needed for the agreed work, and only for as long as needed',
            'use test or sample data wherever real data is not required',
            'agree with the client which outside services, including AI model providers, will process their data',
            'do not use client data to train AI models without the client’s written permission',
            'return or delete client data at the end of the project, unless the client asks us to keep it or the law requires us to',
          ],
        },
        'A data processing agreement is available on request.',
      ],
    },
    {
      id: 'sharing',
      title: 'Who we share information with',
      body: [
        'We do not sell or rent personal information. We share it only with:',
        {
          list: [
            'service providers that help us run the business, such as our hosting provider, email provider, scheduling provider, messaging services and banks or payment services, each only for the job they do for us',
            'outside services used in a client project, as agreed with that client',
            'professional advisers such as accountants and lawyers, under a duty of confidentiality',
            'public authorities, when the law requires it or to protect our rights, our clients or the public',
            'a buyer or successor, if our business is ever merged or sold, under the protections of this policy',
          ],
        },
      ],
    },
    {
      id: 'international',
      title: 'International transfers',
      body: [
        'We are based in Bangladesh and work with clients around the world. Some of our service providers store or process information in other countries. When we transfer personal information across borders, we use providers with strong security practices and, where the law requires it, appropriate contractual safeguards.',
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep information',
      body: [
        'We keep personal information only as long as we need it for the reasons above:',
        {
          list: [
            'Enquiries that do not lead to a project: up to 24 months after our last contact.',
            'Client and project records: for the length of the relationship, and afterwards for as long as tax, accounting or other laws require.',
            'Server logs: normally no longer than 90 days, unless needed to investigate a security issue.',
          ],
        },
        // TODO(owner): confirm these retention periods.
        'After that, we delete the information or make it anonymous.',
      ],
    },
    {
      id: 'security',
      title: 'How we protect information',
      body: [
        'We protect information with encrypted connections (HTTPS), access limited to the people who need it, separate credentials for each system, and regular updates to our servers and software. For client systems we design permissions, approvals and audit trails as part of the build.',
        'No system can be guaranteed to be completely secure. If a security incident affects your personal information, we will tell you and the relevant authorities when the law requires it.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your choices and rights',
      body: [
        'Depending on where you live, you may have the right to:',
        {
          list: [
            'ask for a copy of the personal information we hold about you',
            'ask us to correct information that is wrong or incomplete',
            'ask us to delete your information',
            'object to, or ask us to limit, how we use it, including for outreach',
            'withdraw any consent you have given',
            'receive your information in a portable format',
            'complain to the data protection authority where you live',
          ],
        },
        'To use any of these rights, email {email}. We may need to confirm your identity first, and we aim to reply within 30 days. If your information came to us through a client project, we will pass your request to that client and help them answer it.',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      body: [
        'Our website and services are meant for businesses and adults. We do not knowingly collect personal information from children through this website. If you believe a child has sent us personal information, contact us and we will delete it.',
      ],
    },
    {
      id: 'other-sites',
      title: 'Links to other websites',
      body: [
        'Our website links to other websites and services, including our products, our social media pages, WhatsApp and our scheduling provider. Their own privacy policies apply when you use them.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: [
        'We may update this policy when our services or the law change. We will post the new version on this page with a new "last updated" date, and tell clients directly about important changes.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: [
        'For any privacy question or request, email {email}, call {phone} or message us on {whatsapp}. Our address is Pragati Sarani, Merul Badda, Dhaka, Bangladesh.',
        'Our {terms} explain the rules for using our website and services.',
      ],
    },
  ],
};

export const termsAndConditions: LegalDoc = {
  path: '/terms',
  title: 'Terms & conditions',
  metaTitle: 'Terms & Conditions',
  description:
    'The terms for using agentiqbd.com and for working with Agentiq BD: quotes and payment, ownership of the work, AI outputs, support, cancellation and liability.',
  effective: '2026-10-30',
  updated: '2026-10-30',
  intro:
    'These terms apply when you use our website at agentiqbd.com and when you hire Agentiq BD for a service, including the free AI Business Audit and our paid packages. Please read them before you approve a quote.',
  summary: [
    'Prices on the website are starting ranges. You get a written quote with the exact scope, price and timeline, and nothing starts until you approve it.',
    'When you have paid in full, you own the custom work we made for you.',
    'AI can make mistakes. We build in human approval for sensitive actions, and decisions made with AI outputs remain yours.',
    'If your signed agreement or quote says something different from these terms, the agreement or quote wins.',
  ],
  sections: [
    {
      id: 'about',
      title: 'About these terms',
      body: [
        `These terms are an agreement between you and ${legalEntity} ("Agentiq BD", "we", "us"), based at Pragati Sarani, Merul Badda, Dhaka, Bangladesh. By using our website or approving a quote, you agree to them. If you accept on behalf of a company, you confirm that you are allowed to bind that company.`,
        'For a project, the contract is made up of your approved quote or proposal, any signed agreement or statement of work, and these terms. If they conflict, the signed agreement comes first, then the approved quote, then these terms.',
      ],
    },
    {
      id: 'website',
      title: 'Using our website',
      body: [
        'You may use our website to learn about our services and to contact us. You must not:',
        {
          list: [
            'use the website for anything unlawful, misleading or harmful',
            'try to break, overload or gain unauthorised access to the website or our systems',
            'copy large parts of the website, or present our content, graphics or case studies as your own',
          ],
        },
        'Articles, guides and examples on the website are general information, not professional advice for your specific situation. Example scenarios are marked as examples and do not describe real clients unless we say so.',
        'Prices, timelines and package descriptions on the website are a guide and are not an offer. A binding price exists only in a written quote we send you.',
      ],
    },
    {
      id: 'website-content',
      title: 'Our website content',
      body: [
        'The text, designs, illustrations, logos, the Agentiq BD name and our mascot on this website belong to Agentiq BD or are used with permission. You may link to our pages and quote short parts with credit to Agentiq BD. Anything more needs our written permission.',
      ],
    },
    {
      id: 'how-projects-work',
      title: 'How projects work',
      body: [
        'Every paid project follows the same order:',
        {
          list: [
            'Discovery: we learn about your business, goals and current tools.',
            'Quote: we send a written quote or proposal with the scope, deliverables, price, timeline, payment schedule and support plan.',
            'Approval: the project starts when you approve the quote in writing (email is enough) and make any first payment the quote asks for.',
            'Delivery: we share progress on a test link, then launch and hand over.',
          ],
        },
        'Our current packages are described on the {packages} page.',
      ],
    },
    {
      id: 'free-audit',
      title: 'The free AI Business Audit',
      body: [
        'The 48-Hour AI Business Audit is free and places you under no obligation to buy anything. After the discovery call and once we have received the information we need, we send a written summary of your workflows, the top three AI and automation opportunities we see, and a suggested action plan, normally within 48 hours.',
        'The audit is advice only. It does not include working prototypes or proofs of concept, detailed technical design or architecture, extensive technical research, or any implementation. Those are paid work.',
        'We may decline or delay audit requests, for example when we are fully booked or the business is outside the areas we work in.',
      ],
    },
    {
      id: 'payment',
      title: 'Quotes, prices and payment',
      body: [
        {
          list: [
            'Quotes are valid for 30 days unless the quote says otherwise.',
            'Prices are in US dollars unless the quote states another currency.',
            'You pay according to the payment schedule in your quote. Invoices are due by the date shown on the invoice.',
            'Prices do not include taxes, VAT or bank and transfer charges, unless the quote says they do.',
            'Third-party costs are separate and paid by you unless the quote includes them. These include hosting, domains, software licences and subscriptions, AI model and API usage, SMS and messaging fees, and payment gateway fees.',
            'If a payment is late, we may pause work until it is made, and the timeline moves by the length of the pause.',
          ],
        },
      ],
    },
    {
      id: 'changes-to-scope',
      title: 'Changes to the scope',
      body: [
        'You can ask for changes at any time. If a change adds work, we will tell you the effect on price and timeline in writing before we do it. The change is part of the project once you approve it.',
      ],
    },
    {
      id: 'your-part',
      title: 'Your part',
      body: [
        'Good projects need both sides. You agree to:',
        {
          list: [
            'give us accurate information, content, access and feedback in good time',
            'name one person who can make decisions and approve work',
            'open accounts in your own name where a service needs one, for example payment gateway, courier, cloud, messaging or AI provider accounts',
            'make sure you have the right to share any content and data you give us, and that using it in the project is lawful',
          ],
        },
        'If we are waiting on information, access, approvals or third-party account approvals, the timeline moves by the time we wait.',
      ],
    },
    {
      id: 'timelines',
      title: 'Timelines and acceptance',
      body: [
        'Timelines on the website and in quotes are good-faith estimates. We will tell you early if something puts the date at risk.',
        'At each delivery stage we share the work for you to review. You have 7 days to tell us about anything that does not match the agreed scope. We fix those points, and the stage is accepted when they are fixed, when 7 days pass without feedback, or when you start using the work in your business.',
      ],
    },
    {
      id: 'ownership',
      title: 'Who owns the work',
      body: [
        {
          list: [
            'Your materials: your content, data, brand and documents stay yours. You allow us to use them only to deliver the project.',
            'Custom work: when you have paid in full, you own the custom code, designs and documentation we created specifically for your project, and we hand over the source code and access.',
            'Our tools: we keep ownership of the tools, libraries, templates, components and know-how we had before the project or build for general use. Where they are part of your deliverables, you get a permanent, non-exclusive right to use and modify them as part of that work.',
            'Third-party and open-source software: these stay under their own licences, which we will tell you about.',
            'Before full payment, you may use the work for review and testing only.',
          ],
        },
        'We will only name you as a client or show your project in our portfolio with your permission.',
      ],
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      body: [
        'Both sides will keep the other’s confidential information private, use it only for the project, and share it only with people who need it and are bound to keep it confidential. This does not cover information that is already public or that the law requires us to disclose. We are happy to sign a non-disclosure agreement before discovery.',
      ],
    },
    {
      id: 'ai',
      title: 'AI systems and outputs',
      body: [
        'AI models can produce answers that are wrong, incomplete or out of date. We design the systems we build with clear permissions, human approval for sensitive actions and audit trails, and we test them before launch. Even so:',
        {
          list: [
            'you are responsible for reviewing AI outputs and for the decisions you make with them',
            'AI systems must not be used as the only basis for legal, medical, financial or safety decisions',
            'we do not guarantee specific business results, such as revenue, savings or response rates',
            'AI models and APIs from outside providers are used under those providers’ terms and may change, be priced differently or be withdrawn over time',
          ],
        },
      ],
    },
    {
      id: 'data-protection',
      title: 'Data protection',
      body: [
        'Each side follows the data protection laws that apply to it. When we handle personal information inside your systems, we act on your instructions as your service provider, as described in our {privacy}. A data processing agreement is available on request.',
      ],
    },
    {
      id: 'support',
      title: 'Support after launch',
      body: [
        'Your quote sets out the support plan for after launch. If it includes a bug-fix period, we fix defects in our own work that are reported within that period at no extra cost.',
        'Ongoing support, maintenance, monitoring, hosting management and new features are provided under a separate support plan. We are not responsible for problems caused by changes someone else makes to the system, or by changes to outside services.',
      ],
    },
    {
      id: 'third-parties',
      title: 'Outside services',
      body: [
        'Many projects connect to services we do not control, such as WhatsApp and Meta, payment gateways, couriers, hosting and cloud providers, and AI model providers. We are not responsible for their outages, policy or price changes, or for an account being refused or suspended by them. Where possible, we will help you find a workaround.',
      ],
    },
    {
      id: 'cancellation',
      title: 'Cancellation and refunds',
      body: [
        'Either side can end a project by giving written notice. If the project ends:',
        {
          list: [
            'you pay for the work done up to the end date, and for third-party costs we have already committed to on your behalf',
            'we refund any amount you paid in advance for work that has not been started',
            'once those amounts are settled, we hand over the work completed so far',
          ],
        },
        // TODO(owner): confirm the refund approach and notice period.
        'Either side may end the project straight away if the other seriously breaks these terms and does not fix it within 14 days of being told in writing.',
      ],
    },
    {
      id: 'warranties',
      title: 'Our promise and disclaimers',
      body: [
        'We will deliver our services with reasonable skill and care, to the standard expected of a professional software company.',
        'Apart from that promise and anything written in your quote or agreement, our website and services are provided "as is". We do not promise that the website or any system will always be available or completely free of errors.',
      ],
    },
    {
      id: 'liability',
      title: 'Limits on liability',
      body: [
        'To the extent the law allows:',
        {
          list: [
            'our total liability for a project is limited to the amount you paid us for that project in the 12 months before the claim',
            'neither side is liable for indirect or consequential losses, such as lost profit, lost revenue, lost data or damage to reputation',
          ],
        },
        // TODO(owner): confirm the liability cap with a lawyer.
        'Nothing in these terms limits liability that cannot be limited by law, such as liability for fraud.',
        'You agree to cover our reasonable losses if a claim is made against us because content or data you gave us breaks someone else’s rights or the law.',
      ],
    },
    {
      id: 'force-majeure',
      title: 'Events outside our control',
      body: [
        'Neither side is responsible for delays caused by events outside its reasonable control, such as natural disasters, internet or power outages, strikes, government action or failures of outside services. The affected side will tell the other promptly and do what it reasonably can to reduce the delay.',
      ],
    },
    {
      id: 'law',
      title: 'Governing law and disputes',
      body: [
        'These terms are governed by the laws of Bangladesh. If a disagreement comes up, we will first try to settle it in good faith by talking. If that does not work within 30 days, the courts of Dhaka, Bangladesh have jurisdiction.',
      ],
    },
    {
      id: 'general',
      title: 'General',
      body: [
        {
          list: [
            'We may update these terms. The version on this page on the date you approve a quote applies to that project.',
            'If part of these terms cannot be enforced, the rest still applies.',
            'Neither side may transfer the contract to someone else without the other’s written consent, except as part of a merger or sale of the business.',
            'If we do not enforce a right straight away, we have not given it up.',
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: [
        'Questions about these terms can be sent to {email}, by phone on {phone}, or on {whatsapp}. Our address is Pragati Sarani, Merul Badda, Dhaka, Bangladesh.',
      ],
    },
  ],
};
