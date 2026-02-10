/* eslint-disable @next/next/no-img-element */

import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import { GetStaticProps } from "next";
import { Experience, PageInfo, Project, Skill, Social } from "@/typings";
import { fetchPageInfo } from "@/utils/fetchPageInfo";
import { fetchExperiences } from "@/utils/fetchExperiences";
import { fetchProjects } from "@/utils/fetchProjects";
import { fetchSkills } from "@/utils/fetchSkills";
import { fetchSocials } from "@/utils/fetchSocials";

type Props = {
  pageInfo: PageInfo | null;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  socials: Social[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const pageInfo: PageInfo | null = await fetchPageInfo();
    const experiences: Experience[] = await fetchExperiences();
    const projects: Project[] = await fetchProjects();
    const skills: Skill[] = await fetchSkills();
    const socials: Social[] = await fetchSocials();

    return {
      props: {
        pageInfo,
        experiences,
        projects,
        skills,
        socials,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);

    return {
      props: {
        pageInfo: null,
        experiences: [],
        projects: [],
        skills: [],
        socials: [],
      },
      revalidate: 10,
    };
  }
};

export default function Home({
  pageInfo,
  experiences,
  projects,
  skills,
  socials,
}: Props) {
  if (!pageInfo) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
        <Head>
          <title>Error</title>
        </Head>
        <div className="text-3xl font-bold mb-4">Error loading page info</div>
        <p className="text-lg mb-8">
          An error occurred while loading the page information.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 bg-yellow-500 text-gray-900 py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
        >
          <HomeIcon className="h-6 w-6" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 modifyScrollbar">
      <Head>
        <title>Bartu`s Portfolio</title>
      </Head>

      <Header socials={socials} />

      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>

      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      <section id="contact" className="snap-start">
        <ContactMe pageInfo={pageInfo} />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <HomeIcon className="h-10 w-10 py-1 rounded-full filter grayscale hover:grayscale-0 cursor-pointer bg-[#F7AB0A]" />
          </div>
        </footer>
      </Link>
    </div>
  );
}
