import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SERVICES } from "./services-data.js";
import { SEO_BLOG_POSTS } from "./seo-blog-posts.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const adminHash = await bcrypt.hash("Admin@123", 12);
  const clientHash = await bcrypt.hash("Client@123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@shivshaktitech.com" },
    update: {},
    create: {
      email: "admin@shivshaktitech.com",
      passwordHash: adminHash,
      role: Role.ADMIN,
      profile: {
        create: { firstName: "Admin", lastName: "User", company: "ShivShakti Technology" },
      },
    },
  });

  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      passwordHash: clientHash,
      role: Role.CLIENT,
      profile: {
        create: { firstName: "John", lastName: "Client", company: "Acme Corp", phone: "+1 555 0100" },
      },
    },
  });

  for (const [i, service] of SERVICES.entries()) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        title: service.title,
        slug: service.slug,
        shortDescription: service.shortDescription,
        description: `${service.shortDescription} ShivShakti Technology delivers enterprise-grade ${service.title.toLowerCase()} solutions tailored to your business needs.`,
        icon: service.icon,
        isFeatured: i < 6,
        sortOrder: i,
        features: ["Custom Solutions", "Agile Delivery", "24/7 Support", "Enterprise Security"],
        technologies: ["React", "TypeScript", "Node.js", "MySQL"],
      },
    });
  }

  const faqCount = await prisma.fAQ.count();
  if (faqCount === 0) {
    const faqs = [
      { question: "What industries do you serve?", answer: "We serve healthcare, finance, e-commerce, education, logistics, and more.", category: "General" },
      { question: "How do I get started?", answer: "Contact us through our form or book a free consultation.", category: "General" },
      { question: "Do you offer support?", answer: "Yes, we offer 24/7 maintenance and support packages.", category: "Support" },
    ];
    await prisma.fAQ.createMany({
      data: faqs.map((faq, i) => ({ ...faq, sortOrder: i, isPublished: true })),
    });
  }

  for (const post of SEO_BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        tags: [...post.tags],
        isPublished: true,
        publishedAt: new Date(),
        author: "ShivShakti Technology",
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        tags: [...post.tags],
        isPublished: true,
        publishedAt: new Date(),
        author: "ShivShakti Technology",
      },
    });
  }

  const jobs = [
    {
      title: "Senior Full Stack Developer",
      slug: "senior-full-stack-developer",
      department: "Engineering",
      location: "Remote / India",
      employmentType: "Full-time",
      experience: "4+ years",
      salary: "Competitive",
      description: "Join our engineering team to build enterprise web applications using React, Node.js, and cloud technologies.",
      requirements: ["4+ years React/Node.js", "TypeScript proficiency", "MySQL/PostgreSQL experience", "Strong problem-solving skills"],
      responsibilities: ["Design and develop scalable APIs", "Build responsive frontends", "Code reviews and mentoring", "Collaborate with product team"],
      isPublished: true,
    },
    {
      title: "UI/UX Designer",
      slug: "ui-ux-designer",
      department: "Design",
      location: "Hybrid",
      employmentType: "Full-time",
      experience: "2+ years",
      description: "Create beautiful, user-centered interfaces for web and mobile products.",
      requirements: ["Figma expertise", "Portfolio of web/mobile designs", "Understanding of design systems"],
      responsibilities: ["Wireframes and prototypes", "User research", "Design system maintenance"],
      isPublished: true,
    },
  ];

  for (const job of jobs) {
    await prisma.career.upsert({
      where: { slug: job.slug },
      update: {},
      create: job,
    });
  }

  const existingProject = await prisma.project.findFirst({
    where: { clientId: client.id, title: "Corporate Website Redesign" },
  });
  if (!existingProject) {
    await prisma.project.create({
      data: {
        clientId: client.id,
        title: "Corporate Website Redesign",
        description: "Complete website redesign and development",
        status: "IN_PROGRESS",
        progress: 65,
        milestones: {
          create: [
            { title: "Discovery & Planning", status: "COMPLETED", sortOrder: 0 },
            { title: "UI/UX Design", status: "COMPLETED", sortOrder: 1 },
            { title: "Development", status: "IN_PROGRESS", sortOrder: 2 },
            { title: "Testing & Launch", status: "PENDING", sortOrder: 3 },
          ],
        },
      },
    });
  }

  await prisma.websiteSetting.upsert({
    where: { key: "site_name" },
    update: { value: "ShivShakti Technology" },
    create: { key: "site_name", value: "ShivShakti Technology", group: "general" },
  });

  const homepageDefaults = [
    { key: "homepage.projects", value: "50", group: "homepage" },
    { key: "homepage.globalClients", value: "25", group: "homepage" },
    { key: "homepage.cloudExperts", value: "15", group: "homepage" },
  ];

  for (const setting of homepageDefaults) {
    await prisma.websiteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("Seed completed!");
  console.log("Admin: admin@shivshaktitech.com / Admin@123");
  console.log("Client: client@example.com / Client@123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
