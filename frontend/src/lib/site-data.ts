export const serviceMegaMenu = {
  Salesforce: [
    "Salesforce Development",
    "Salesforce Implementation",
    "Salesforce Integration",
    "AppExchange App Development",
    "Salesforce Consulting",
    "Hire a Salesforce Developer",
    "Salesforce Managed Services",
    "Salesforce Data Cloud Services",
    "Agentforce Services",
  ],
  ServiceNow: [
    "ServiceNow Consulting Services",
    "ServiceNow Implementation Services",
    "ServiceNow Managed Services",
  ],
  AWS: [
    "AWS Managed Services",
    "AWS Application Development",
    "AWS Migration Services",
    "AWS Security Services",
  ],
  GCP: ["Google Cloud Services"],
  Cloud: [
    "Cloud Consulting Services",
    "Cloud Migration Services",
    "Cloud Application Development",
    "Cloud Security Solutions",
    "Cloud Managed Services",
  ],
  Additional: [
    "Product Engineering Services",
    "Nintex Development Services",
    "IT Staff Augmentation Services",
    "UI/UX Design Services",
  ],
};

export const industriesMenu = [
  "Healthcare", "Finance & Banking", "Retail & E-Commerce", "Manufacturing",
  "Education", "Real Estate", "Non-Profit", "Logistics",
];

export const resourcesMenu = [
  { label: "Blogs", to: "/blog" },
  { label: "Case Studies", to: "/blog" },
  { label: "Customer Success Stories", to: "/blog" },
];

export const platformServices = [
  {
    id: "salesforce",
    label: "Salesforce",
    title: "Salesforce",
    paragraphs: [
      "Renowned as a trusted Salesforce consulting partner, ShivShakti Technology is built on an institution of trust, manifesting transparency in all our Salesforce services.",
      "Inspired by Salesforce's trailblazing mindset, we continually propel the boundaries to deliver cutting-edge solutions that keep you at the pinnacle of your industry.",
    ],
    items: [
      "Salesforce Consulting",
      "Salesforce Development",
      "Salesforce Implementation",
      "Salesforce Data Cloud Services",
      "Salesforce Integration",
      "AppExchange App Development",
      "Salesforce Managed Services",
      "Agentforce Services",
    ],
  },
  {
    id: "servicenow",
    label: "ServiceNow",
    title: "ServiceNow",
    paragraphs: [
      "Make your digital transformation a reality with ShivShakti, your trusted partner for all of your ServiceNow needs. Leveraging ServiceNow proficiencies, we turn digital workflows into a symphony of productivity and innovation.",
      "At ShivShakti, we're not just offering ServiceNow consulting services — we're orchestrating your digital transformation.",
    ],
    items: [
      "ServiceNow Consulting",
      "ServiceNow Implementation",
      "ServiceNow Integration",
      "ServiceNow Migration",
      "ServiceNow Customization",
      "ServiceNow App Development",
      "ServiceNow Managed Services",
    ],
  },
  {
    id: "cloud-native",
    label: "Cloud Native",
    title: "Cloud Native",
    paragraphs: [
      "We embody cloud-native philosophy — effortless scalability and developer-first innovation in every engagement.",
      "Guided by modern cloud orchestration, we transform operations into harmony, where code, data, and intelligence flow seamlessly.",
    ],
    items: [
      "Cloud Implementation Services",
      "Cloud Integration Services",
      "Cloud Migration Services",
      "Cloud Managed Services",
      "Kubernetes & Containers",
      "Serverless Architecture",
      "Microservices Development",
      "DevOps & CI/CD",
    ],
  },
  {
    id: "automation",
    label: "Automation",
    title: "Automation & AI",
    paragraphs: [
      "We're advocates of intelligent work — optimizing operations, standardizing workflows, and automating business processes.",
      "With ShivShakti, you're creating an ecosystem of continuous improvement that adapts and grows with your business.",
    ],
    items: [
      "Process Automation",
      "RPA Solutions",
      "AI & Machine Learning",
      "Workflow Automation",
      "Business Intelligence",
      "Data Analytics",
      "Chatbots & Virtual Assistants",
      "Support & Maintenance",
    ],
  },
];

export const cloudServices = [
  {
    id: "gcp",
    label: "Google Cloud",
    title: "Google Cloud Platform",
    paragraphs: [
      "Realize the potential of your business with ShivShakti's Google Cloud Platform services. Transform your business by leveraging Google's speed, agility, and innovation.",
      "With ShivShakti and Google, the future is in your hands. Let's start building it together.",
    ],
    items: [
      "Google Cloud Consulting Services",
      "Google Cloud Development Services",
      "Google Cloud Managed Services",
      "Google Cloud Migration & Modernization",
      "Google Cloud API & Integration",
      "Google Cloud Storage & Backup",
      "Google Cloud Security",
      "Google Cloud Cost Optimization",
    ],
  },
  {
    id: "aws",
    label: "AWS",
    title: "Amazon Web Services",
    paragraphs: [
      "At ShivShakti, we're not just leveraging AWS — we're creating a partnership that drives your business to new pinnacles.",
      "Let's build your tomorrow with ShivShakti's expertise and Amazon Web Services capabilities.",
    ],
    items: [
      "AWS Consulting",
      "AWS Implementation",
      "AWS Cloud Migration",
      "AWS Data Warehouse",
      "AWS Integration",
      "Managed AWS Cloud Services",
      "Amazon AppFlow",
      "Amazon Connect",
    ],
  },
  {
    id: "azure",
    label: "Microsoft Azure",
    title: "Microsoft Azure",
    paragraphs: [
      "Our team provides guidelines to design, implement, and optimize Microsoft Azure solutions that satisfy your business needs.",
      "With ShivShakti and Azure, you gain the agility to experiment, innovate rapidly, and stay ahead of the curve.",
    ],
    items: [
      "Azure Consulting",
      "Azure Implementation",
      "Azure Cloud Migration",
      "Azure DevOps",
      "Azure Integration",
      "Managed Azure Services",
      "Azure Security",
      "Azure Cost Optimization",
    ],
  },
];

export const staffRoles = [
  "Salesforce Developers",
  "Salesforce Consultant",
  "Technical Architect",
  "Quality Assurance Engineer",
  "Project Manager",
  "UI/UX Design",
];

export const portfolioCases = [
  {
    client: "RetailMax",
    title: "Redefining Customer Loyalty With CRM & Loyalty Management",
    description:
      "We helped a major retail chain migrate their legacy loyalty program into a modern CRM platform. The new system enabled real-time points accrual, automated expiry & transfers, and strengthened data security.",
    stats: [
      { value: "135+", label: "Stores" },
      { value: "12 Days", label: "Go Live" },
      { value: "2.4M+", label: "Members Unified" },
      { value: "Optimized", label: "Member Lifecycle" },
    ],
    color: "from-blue-600 to-blue-800",
  },
  {
    client: "HealthPlus",
    title: "Streamlining Donations Management with Integrated CRM",
    description:
      "A healthcare non-profit optimized donation management by integrating payment gateways, WhatsApp, and lead capture with their CRM. This streamlined donations and automated acknowledgments.",
    stats: [
      { value: "Seamless", label: "Payment Integration" },
      { value: "Accurate", label: "Notifications" },
      { value: "Automated", label: "Donor Acknowledgments" },
      { value: "Multi", label: "Channel Support" },
    ],
    color: "from-emerald-600 to-teal-800",
  },
  {
    client: "BuildRight",
    title: "Real Estate Reinvented: Smarter B2B Sales with E-Commerce",
    description:
      "Transformed B2B e-commerce with a redesigned UX/UI, single-page checkout, and dynamic FAQ. Integrations with shipping, tax, and payment providers streamlined transactions.",
    stats: [
      { value: "Frictionless", label: "Checkout" },
      { value: "Enhanced", label: "Buyer Experience" },
      { value: "Instant", label: "Self-Service" },
      { value: "Faster", label: "Conversions" },
    ],
    color: "from-violet-600 to-purple-800",
  },
  {
    client: "FinTech Corp",
    title: "Enhancing Underwriting Efficiency with Multi-Cloud Implementation",
    description:
      "Streamlined underwriting by integrating Sales Cloud, Service Cloud, and custom portals. Automated workflows for data entry, quoting, and document processing increased speed and accuracy.",
    stats: [
      { value: "Faster", label: "Underwriting" },
      { value: "Scalable", label: "Secure Storage" },
      { value: "User", label: "Friendly Portals" },
      { value: "Accurate", label: "Processing" },
    ],
    color: "from-orange-600 to-red-800",
  },
];

export const whyChooseItems = [
  { label: "Vendor-agnostic", icon: "🔄" },
  { label: "Collaborative culture", icon: "🤝" },
  { label: "Ethical practices", icon: "✅" },
  { label: "Scalable solutions", icon: "📈" },
  { label: "Long-term partnerships", icon: "🔗" },
  { label: "Continuous improvement", icon: "🚀" },
  { label: "Cost-effective solutions", icon: "💰" },
  { label: "Data-driven decisions", icon: "📊" },
];

export const clientBrands = [
  "Aakhand Aarambh Foundation",
  "Rexar",
  "Gyanvatika",
  "Citycare",
  "Swamiaagmanand",
  "Shivshaktiyogpeeth",
  "Ghartak",
  "Gyatriprintingpress",
  "Homecareteam",
  "Onrise",
  "Sec4sys",
  "Abhaysaa",
];

export const leadServiceOptions = [
  "Web Development",
  "Mobile App Development",
  "Salesforce Development",
  "Salesforce Implementation",
  "Cloud Migration",
  "IT Consulting",
  "Hire a Professional Developer",
  "UI/UX Design",
  "AI & Automation",
  "Others",
];
