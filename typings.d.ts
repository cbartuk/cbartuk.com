interface SanityBody {
  _createdAt?: string;
  _id?: string;
  _rev?: string;
  _updatedAt?: string;
}

interface ImageAssetRef {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export type ImageSource = ImageAssetRef | string;

export interface PageInfo extends SanityBody {
  _type: "pageInfo";
  address: string;
  backgroundInformation: string;
  email: string;
  role: string;
  heroImage: ImageSource;
  name: string;
  phoneNumber: string;
  profilePic: ImageSource;
}

export interface Technology extends SanityBody {
  _type: "skill";
  image: ImageSource;
  progress?: number;
  title: string;
}

export interface Experience extends SanityBody {
  _type: "experience";
  company: string;
  companyImage: ImageSource;
  dateStarted: string;
  dateEnded?: string;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  points: string[];
  technologies: Technology[];
}

export interface Project extends SanityBody {
  title: string;
  _type: "project";
  desktopImage?: ImageSource;
  tabletImage?: ImageSource;
  mobileImage?: ImageSource;
  deviceTargets?: Array<"desktop" | "tablet" | "mobile">;
  linkToBuild?: string;
  summary: string;
  technologies: Technology[];
}

export interface Skill extends SanityBody {
  _type: "skill";
  image: ImageSource;
  title: string;
  category?:
    | "frontend"
    | "mobile"
    | "testing"
    | "tooling"
    | "platform"
    | "backend"
    | "design";
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  yearsExperience?: number;
  summary?: string;
  featured?: boolean;
  order?: number;
  tags?: string[];
  currentlyUsing?: boolean;
  progress?: number;
}

export interface Social extends SanityBody {
  _type: "social";
  title: string;
  url: string;
}
