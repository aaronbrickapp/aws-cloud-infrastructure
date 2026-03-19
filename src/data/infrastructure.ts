import { type Node, type Edge } from "@xyflow/react";

export interface ServiceNodeData {
  label: string;
  category: string;
  description: string;
  details: string[];
  [key: string]: unknown;
}

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  networking: { bg: "#1e1b4b", border: "#6366f1", text: "#a5b4fc" },
  compute: { bg: "#1a2e05", border: "#65a30d", text: "#bef264" },
  database: { bg: "#451a03", border: "#d97706", text: "#fcd34d" },
  cache: { bg: "#3b0764", border: "#a855f7", text: "#d8b4fe" },
  serverless: { bg: "#0c4a6e", border: "#0ea5e9", text: "#7dd3fc" },
  storage: { bg: "#1c1917", border: "#78716c", text: "#d6d3d1" },
  security: { bg: "#4c0519", border: "#e11d48", text: "#fda4af" },
  dns: { bg: "#022c22", border: "#10b981", text: "#6ee7b7" },
  monitoring: { bg: "#2e1065", border: "#8b5cf6", text: "#c4b5fd" },
  messaging: { bg: "#172554", border: "#3b82f6", text: "#93c5fd" },
  auth: { bg: "#431407", border: "#ea580c", text: "#fdba74" },
  registry: { bg: "#164e63", border: "#06b6d4", text: "#67e8f9" },
};

export function getCategoryColor(category: string) {
  return categoryColors[category] || categoryColors.networking;
}

export const categories = [
  { id: "networking", label: "Networking" },
  { id: "compute", label: "Compute (ECS)" },
  { id: "database", label: "Database" },
  { id: "cache", label: "Cache" },
  { id: "serverless", label: "Serverless" },
  { id: "storage", label: "Storage" },
  { id: "security", label: "Security" },
  { id: "dns", label: "DNS" },
  { id: "monitoring", label: "Monitoring" },
  { id: "messaging", label: "Messaging" },
  { id: "auth", label: "Auth" },
  { id: "registry", label: "Registry" },
];

export const initialNodes: Node<ServiceNodeData>[] = [
  // DNS & Entry
  {
    id: "route53",
    type: "service",
    position: { x: 100, y: 0 },
    data: {
      label: "Route53",
      category: "dns",
      description: "Managed DNS service that translates domain names into the IP addresses of our load balancers, routing all user traffic to the right place.",
      details: [
        "Public and private hosted zones",
        "NS delegation across environments",
        "Alias records to ALB",
      ],
    },
  },

  // Security
  {
    id: "waf",
    type: "service",
    position: { x: 100, y: 130 },
    data: {
      label: "WAF",
      category: "security",
      description: "Web Application Firewall that sits in front of the load balancer, blocking malicious requests, enforcing rate limits, and filtering traffic before it reaches our services.",
      details: [
        "Path-based allowlist",
        "IP rate limiting",
        "AWS Managed Rule Sets",
        "Protects public ALB",
      ],
    },
  },
  {
    id: "acm",
    type: "service",
    position: { x: -150, y: 130 },
    data: {
      label: "ACM Certificate",
      category: "security",
      description: "Manages the TLS/SSL certificate that encrypts all HTTPS traffic between users and our services, ensuring secure communication.",
      details: [
        "Wildcard TLS certificate",
        "DNS-validated via Route53",
        "Auto-renew enabled",
      ],
    },
  },

  // Load Balancing
  {
    id: "alb",
    type: "service",
    position: { x: 100, y: 260 },
    data: {
      label: "Public ALB",
      category: "networking",
      description: "Application Load Balancer that receives all incoming HTTPS traffic and distributes it across our ECS services based on hostname and path rules.",
      details: [
        "HTTPS listener (TLS 1.3)",
        "HTTP → HTTPS redirect",
        "Access logs to S3",
        "Host-based routing for In-house WebApp",
      ],
    },
  },

  // ECS Services
  {
    id: "brick-server",
    type: "service",
    position: { x: -100, y: 420 },
    data: {
      label: "Generic API",
      category: "compute",
      description: "The main backend API that powers the application. Handles user sessions, business logic, and all core operations.",
      details: [
        "Fargate, ARM64",
        "Auto-scaled across environments",
        "Health-checked endpoint",
        "Monitoring sidecar",
      ],
    },
  },
  {
    id: "foundry",
    type: "service",
    position: { x: 300, y: 420 },
    data: {
      label: "In-house WebApp",
      category: "compute",
      description: "Internal web application for the team. Provides admin tools, dashboards, and management interfaces backed by Google OAuth authentication.",
      details: [
        "Fargate, ARM64",
        "Health-checked endpoint",
        "Monitoring sidecar",
        "Google OAuth integration",
      ],
    },
  },
  {
    id: "supertokens",
    type: "service",
    position: { x: -350, y: 560 },
    data: {
      label: "SuperTokens",
      category: "auth",
      description: "Open-source authentication service that handles user sign-up, login, session management, and token validation for the API.",
      details: [
        "Fargate, ARM64",
        "Internal service discovery",
        "Auth provider for Generic API",
      ],
    },
  },

  // Databases
  {
    id: "rds",
    type: "service",
    position: { x: -100, y: 700 },
    data: {
      label: "Aurora PostgreSQL",
      category: "database",
      description: "Primary relational database storing all application data. Auto-scales capacity based on demand.",
      details: [
        "Aurora PostgreSQL, Serverless v2",
        "Auto-scaling ACUs per environment",
        "Multi-instance in production",
        "SSL enforced, encrypted storage",
      ],
    },
  },
  {
    id: "redis",
    type: "service",
    position: { x: 300, y: 700 },
    data: {
      label: "ElastiCache Redis",
      category: "cache",
      description: "In-memory cache used by the API for fast lookups, session caching, and reducing database load on frequently accessed data.",
      details: [
        "Redis 7.1",
        "Multi-AZ with failover (prod)",
        "Encryption at rest + in transit",
        "LRU eviction policy",
      ],
    },
  },

  // Serverless
  {
    id: "api-gateway",
    type: "service",
    position: { x: 650, y: 130 },
    data: {
      label: "API Gateway",
      category: "serverless",
      description: "HTTP API gateway that routes incoming requests to the appropriate Lambda function based on the URL path, enabling lightweight serverless endpoints.",
      details: [
        "HTTP API, CORS enabled",
        "Routes: ANY /api/{function-name}",
        "AWS_PROXY integration",
        "Auto-deploy stage",
      ],
    },
  },
  {
    id: "api-lambdas",
    type: "service",
    position: { x: 650, y: 280 },
    data: {
      label: "API Lambdas",
      category: "serverless",
      description: "Serverless functions that power Slack integrations and operational tooling — posting server stats, searching logs, and other internal automations.",
      details: [
        "Auto-discovered from S3 builds",
        "Node.js runtime",
        "Internal tooling and integrations",
      ],
    },
  },
  {
    id: "unified-handler",
    type: "service",
    position: { x: 650, y: 560 },
    data: {
      label: "Unified Handler Lambda",
      category: "serverless",
      description: "Processes user archive uploads end-to-end: triggered when files land in S3, decompresses them, and writes the data into the database via SQS-based serialized processing.",
      details: [
        "Node.js runtime, VPC-enabled",
        "Processes file uploads",
        "Reserved concurrency limit",
        "Triggered by S3 and SQS",
      ],
    },
  },
  {
    id: "datadog-forwarder",
    type: "service",
    position: { x: -350, y: 130 },
    data: {
      label: "Datadog Forwarder",
      category: "monitoring",
      description: "Lambda function that subscribes to CloudWatch log streams and forwards them to Datadog for centralized logging, APM, and alerting.",
      details: [
        "Python runtime, ARM64",
        "Forwards CloudWatch Logs to Datadog",
        "Subscribes to service log streams",
      ],
    },
  },

  // Storage
  {
    id: "s3-archive",
    type: "service",
    position: { x: 900, y: 420 },
    data: {
      label: "S3: Archive Uploads",
      category: "storage",
      description: "Receives compressed archive files (.br) uploaded by the application, then triggers the archive processing pipeline to import user data.",
      details: [
        "Compressed file uploads",
        "Versioning enabled",
        "TLS-only bucket policy",
        "Event-driven Lambda trigger",
      ],
    },
  },
  {
    id: "s3-lambda-builds",
    type: "service",
    position: { x: 900, y: 280 },
    data: {
      label: "S3: Lambda Builds",
      category: "storage",
      description: "Stores compiled Lambda function code (ZIP files) deployed by CI/CD. Lambda functions pull their code from here at deploy time.",
      details: [
        "CI/CD artifact storage",
        "Versioning enabled",
        "Lifecycle rules for cleanup",
        "Consumed by Lambda functions",
      ],
    },
  },
  {
    id: "s3-alb-logs",
    type: "service",
    position: { x: 900, y: 130 },
    data: {
      label: "S3: ALB Logs",
      category: "storage",
      description: "Stores access logs from the Application Load Balancer for debugging, traffic analysis, and security auditing.",
      details: [
        "ALB access logs",
        "Versioning enabled",
        "Lifecycle-based expiration",
      ],
    },
  },
  {
    id: "s3-cloudtrail",
    type: "service",
    position: { x: 900, y: 0 },
    data: {
      label: "S3: CloudTrail Logs",
      category: "storage",
      description: "Long-term archive of all AWS API activity logs for compliance and security investigations, with automatic tiering to cheaper storage over time.",
      details: [
        "Audit logs for AWS API activity",
        "Automatic tiering to cold storage",
      ],
    },
  },

  // Messaging
  {
    id: "sqs-fifo",
    type: "service",
    position: { x: 650, y: 420 },
    data: {
      label: "SQS FIFO Queue",
      category: "messaging",
      description: "Message queue that serializes archive backfill processing per user, ensuring data is imported in order and preventing duplicate writes from concurrent processing.",
      details: [
        "Serialized per-user processing",
        "Dead-letter queue for failures",
        "Configurable visibility timeout",
      ],
    },
  },

  // Monitoring
  {
    id: "cloudwatch",
    type: "service",
    position: { x: -350, y: 280 },
    data: {
      label: "CloudWatch",
      category: "monitoring",
      description: "Centralized logging and monitoring hub. Collects logs from all services, triggers alarms on error thresholds, and forwards data to Datadog for deeper analysis.",
      details: [
        "Log groups for all services",
        "Alarms for key service metrics",
        "Metric filters for security events",
        "Log forwarding to Datadog",
      ],
    },
  },
  {
    id: "cloudtrail",
    type: "service",
    position: { x: -350, y: 0 },
    data: {
      label: "CloudTrail",
      category: "monitoring",
      description: "Records every AWS API call across the account for security auditing — who did what, when, and from where. Essential for compliance and incident investigation.",
      details: [
        "Multi-region audit trail",
        "Global service events",
        "Log file validation",
        "S3 data events tracked",
      ],
    },
  },

  // Secrets
  {
    id: "secrets-manager",
    type: "service",
    position: { x: -350, y: 420 },
    data: {
      label: "Secrets Manager",
      category: "security",
      description: "Securely stores and rotates sensitive credentials (database passwords, API keys, OAuth secrets) that services fetch at runtime instead of hardcoding.",
      details: [
        "Database credentials",
        "Third-party API keys",
        "Service auth tokens",
        "OAuth client secrets",
      ],
    },
  },

  // ECR
  {
    id: "ecr",
    type: "service",
    position: { x: -100, y: 560 },
    data: {
      label: "ECR",
      category: "registry",
      description: "Docker container registry that stores the built images for the API and WebApp. ECS pulls images from here when deploying new versions.",
      details: [
        "API repository",
        "WebApp repository",
        "Cross-account access (prod pulls from staging)",
      ],
    },
  },

  // SNS
  {
    id: "sns",
    type: "service",
    position: { x: -550, y: 280 },
    data: {
      label: "SNS",
      category: "messaging",
      description: "Notification service that sends email alerts when CloudWatch alarms fire or AWS budget thresholds are exceeded.",
      details: [
        "CloudWatch Alarms topic",
        "Budget Alert topic",
        "Email notifications",
      ],
    },
  },
];

export const initialEdges: Edge[] = [
  // DNS → ALB
  { id: "route53-alb", source: "route53", target: "alb", label: "DNS alias", animated: true },
  // WAF → ALB
  { id: "waf-alb", source: "waf", target: "alb", label: "protects" },
  // ACM → ALB
  { id: "acm-alb", source: "acm", target: "alb", label: "TLS cert" },
  // ALB → ECS
  { id: "alb-brick", source: "alb", target: "brick-server", label: "port 3000", animated: true },
  { id: "alb-foundry", source: "alb", target: "foundry", label: "host routing", animated: true },
  // ALB → S3 logs
  { id: "alb-s3logs", source: "alb", target: "s3-alb-logs", label: "access logs" },

  // brick-server connections
  { id: "brick-rds", source: "brick-server", target: "rds", label: "port 5432", animated: true },
  { id: "brick-redis", source: "brick-server", target: "redis", label: "port 6379", animated: true },
  { id: "brick-st", source: "brick-server", target: "supertokens", label: "port 3567" },

  // foundry connections
  { id: "foundry-brick", source: "foundry", target: "brick-server", label: "internal API", style: { strokeDasharray: "5,5" } },

  // SuperTokens → RDS
  { id: "st-rds", source: "supertokens", target: "rds", label: "port 5432" },

  // ECR → ECS
  { id: "ecr-brick", source: "ecr", target: "brick-server", label: "image pull" },
  { id: "ecr-foundry", source: "ecr", target: "foundry", label: "image pull" },

  // Secrets → services
  { id: "secrets-brick", source: "secrets-manager", target: "brick-server", label: "secrets", style: { strokeDasharray: "5,5" } },
  { id: "secrets-st", source: "secrets-manager", target: "supertokens", label: "secrets", style: { strokeDasharray: "5,5" } },
  { id: "secrets-foundry", source: "secrets-manager", target: "foundry", label: "secrets", style: { strokeDasharray: "5,5" } },
  { id: "secrets-lambda", source: "secrets-manager", target: "api-lambdas", label: "secrets", style: { strokeDasharray: "5,5" } },
  { id: "secrets-unified", source: "secrets-manager", target: "unified-handler", label: "secrets", style: { strokeDasharray: "5,5" } },

  // API Gateway → Lambdas
  { id: "apigw-lambdas", source: "api-gateway", target: "api-lambdas", label: "ANY /api/*", animated: true },
  // Lambdas → S3 builds
  { id: "lambdas-s3builds", source: "api-lambdas", target: "s3-lambda-builds", label: "read code" },

  // S3 archive → Lambda
  { id: "s3archive-unified", source: "s3-archive", target: "unified-handler", label: "S3 event trigger", animated: true },
  // Lambda → SQS
  { id: "unified-sqs", source: "unified-handler", target: "sqs-fifo", label: "publish msg" },
  // SQS → Lambda (trigger)
  { id: "sqs-unified", source: "sqs-fifo", target: "unified-handler", label: "trigger backfill", animated: true },
  // Unified handler → RDS
  { id: "unified-rds", source: "unified-handler", target: "rds", label: "port 5432" },

  // CloudWatch connections
  { id: "brick-cw", source: "brick-server", target: "cloudwatch", label: "logs" },
  { id: "foundry-cw", source: "foundry", target: "cloudwatch", label: "logs" },
  { id: "st-cw", source: "supertokens", target: "cloudwatch", label: "logs" },
  { id: "cw-dd", source: "cloudwatch", target: "datadog-forwarder", label: "subscription" },
  { id: "cw-sns", source: "cloudwatch", target: "sns", label: "alarm actions" },

  // CloudTrail
  { id: "ct-s3", source: "cloudtrail", target: "s3-cloudtrail", label: "audit logs" },
  { id: "ct-cw", source: "cloudtrail", target: "cloudwatch", label: "log integration" },
];
