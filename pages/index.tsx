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

(async () => {
  const pageInfo = await fetchPageInfo();
  console.log(pageInfo);
})();

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
    return <div>Error loading page info</div>;
  }
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 modifyScrollbar">
      <Head>
        <title>Bartu`s Portolio</title>
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
        <ContactMe />
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
