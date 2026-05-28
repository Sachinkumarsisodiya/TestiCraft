export const meta = () => {
  return [{ title: "Privacy Policy | TestiCraft" }];
};

export default function PrivacyPolicy() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <p>
          Welcome to TestiCraft ("we," "our," or "us"). We respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy explains how we collect, use, and share information when you install or use the TestiCraft app in connection with your Shopify-supported store.
        </p>
      ),
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <>
          <p className="mb-4">
            When you install the App, we are automatically able to access certain types of information from your Shopify account:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Merchant Information:</strong> Store name, email address, physical store location, and primary locale.</li>
            <li><strong>App Usage Data:</strong> Interactivity with our widgets, configuration settings, and templates chosen.</li>
            <li><strong>Technical Data:</strong> IP addresses, browser types, and device information from interactions with our services.</li>
          </ul>
        </>
      ),
    },
    {
      id: "shopify-store-data",
      title: "3. Shopify Store Data Access",
      content: (
        <>
          <p className="mb-4">
            To provide our core services (testimonial widgets, social proof sections, carousel testimonials, floating trust walls, and luxury spotlight widgets), TestiCraft requires specific permissions (scopes) from your Shopify store:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><code>write_metaobjects</code> & <code>write_metaobject_definitions</code>: Used to safely store and manage your testimonials and configuration data natively within your store without relying on external databases.</li>
            <li><code>write_products</code>: Required to associate product-specific reviews and display social proof directly on relevant product pages.</li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "4. How We Use Information",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and operate the App, including rendering theme app extensions on your storefront.</li>
          <li>To securely store your configuration using Shopify Metaobjects.</li>
          <li>To provide customer support and send service-related notifications.</li>
          <li>To monitor and improve the App's performance, layout speed, and analytics.</li>
        </ul>
      ),
    },
    {
      id: "data-security",
      title: "5. Data Security",
      content: (
        <p>
          We implement industry-standard security measures to protect your data. Since TestiCraft heavily utilizes Shopify's native Metaobjects for data storage, your primary review data remains within your Shopify ecosystem, benefiting from Shopify's world-class enterprise security architecture. We do not unnecessarily duplicate or host sensitive store data on our external servers.
        </p>
      ),
    },
    {
      id: "billing-information",
      title: "6. Billing Information",
      content: (
        <p>
          All billing, subscriptions, and financial transactions are processed securely through Shopify's native billing API. TestiCraft does not process, store, or have direct access to your credit card details or payment methods.
        </p>
      ),
    },
    {
      id: "third-party",
      title: "7. Third-Party Services",
      content: (
        <p>
          We may employ third-party companies (such as analytics providers or cloud infrastructure services) to facilitate our App. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>
      ),
    },
    {
      id: "cookies",
      title: "8. Cookies",
      content: (
        <p>
          We use cookies and similar tracking technologies to track the activity on our App and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
      ),
    },
    {
      id: "merchant-rights",
      title: "9. Merchant Rights",
      content: (
        <p>
          As a merchant, you retain full ownership of your review data. You have the right to access, correct, update, or request deletion of your personal data. Because we leverage Shopify Metaobjects, uninstalling the app or deleting the respective metaobjects directly from your Shopify admin will permanently remove the associated data.
        </p>
      ),
    },
    {
      id: "gdpr-compliance",
      title: "10. GDPR & Regulatory Compliance",
      content: (
        <p>
          If you are a resident of the European Economic Area (EEA), you have certain data protection rights. TestiCraft aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data in compliance with GDPR. We also subscribe to Shopify's mandatory webhooks (such as <code>customers/data_request</code>, <code>customers/redact</code>, and <code>shop/redact</code>) to ensure automated compliance with privacy requests.
        </p>
      ),
    },
    {
      id: "data-retention",
      title: "11. Data Retention",
      content: (
        <p>
          We will retain your Information only for as long as is necessary for the purposes set out in this Privacy Policy. Upon uninstallation of the TestiCraft app, we purge all locally cached merchant data within 48 hours, in accordance with Shopify's requirements. Data stored via Metaobjects will remain on your Shopify store until manually deleted by you.
        </p>
      ),
    },
    {
      id: "contact",
      title: "12. Contact Information",
      content: (
        <p>
          If you have any questions about this Privacy Policy, please contact us at: <br />
          <a href="mailto:support@testicraft.hostvault.online" className="text-[#d980ff] hover:text-[#ec4899] transition-colors font-semibold">support@testicraft.hostvault.online</a>
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05050c] font-sans text-slate-300 selection:bg-[#c55cf3]/30 selection:text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-[#8b5cf6]/5 blur-[150px]" />
        <div className="absolute right-[10%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#ec4899]/5 blur-[140px]" />
      </div>

      <nav className="relative z-50 border-b border-white/[0.06] bg-[#05050c]/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 sm:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="TestiCraft home">
            <img src="/logo.png" alt="TestiCraft Logo" className="h-12 w-auto object-contain" />
            <span className="text-[22px] font-extrabold tracking-[-0.03em] text-white">TestiCraft</span>
          </a>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-20 sm:px-8">
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#d980ff]">
            Legal Information
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-400">
            Effective Date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="mb-5 text-2xl font-bold text-white">{section.title}</h2>
              <div className="text-[16px] leading-relaxed text-slate-300">
                {section.content}
              </div>
            </section>
          ))}
        </div>
        
        <div className="mt-20 border-t border-white/10 pt-10 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TestiCraft. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
