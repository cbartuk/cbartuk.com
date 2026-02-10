import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { PageInfo } from "@/typings";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type Props = {
  pageInfo: PageInfo;
};

export default function ContactMe({ pageInfo }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const targetEmail = pageInfo?.email || "me@cbartuk.com";
    const subject = encodeURIComponent(formData.subject || "Portfolio Contact");
    const body = encodeURIComponent(
      `Hi, my name is ${formData.name}, ${formData.message} (sent from ${formData.email})`
    );
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col max-w-5xl px-4 sm:px-8 lg:px-12 pt-24 pb-10 mx-auto items-center justify-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Contact
      </h3>

      <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-10">
        I have got just what you need.{" "}
        <span className="decoration-[#F7AB0A]/50 underline">
          Let&rsquo;s Talk.
        </span>
      </h4>

      <div className="flex flex-col md:flex-row gap-10 md:gap-14 w-full max-w-3xl">
        {/* Contact Info */}
        <div className="flex flex-col gap-5 md:w-2/5 md:pt-2">
          {pageInfo?.phoneNumber && (
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-[#F7AB0A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F7AB0A]/20 transition-colors">
                <PhoneIcon className="w-5 h-5 text-[#F7AB0A]" />
              </div>
              <p className="text-gray-300 text-sm">
                {pageInfo.phoneNumber}
              </p>
            </div>
          )}

          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-lg bg-[#F7AB0A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F7AB0A]/20 transition-colors">
              <EnvelopeIcon className="w-5 h-5 text-[#F7AB0A]" />
            </div>
            <p className="text-gray-300 text-sm">
              {pageInfo?.email}
            </p>
          </div>

          {pageInfo?.address && (
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-[#F7AB0A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F7AB0A]/20 transition-colors">
                <MapPinIcon className="w-5 h-5 text-[#F7AB0A]" />
              </div>
              <p className="text-gray-300 text-sm">
                {pageInfo.address}
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 flex-1"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              {...register("name")}
              placeholder="Name"
              className="contactInput flex-1"
              type="text"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="contactInput flex-1"
              type="email"
            />
          </div>

          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput"
            type="text"
          />

          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput min-h-[100px] resize-none"
            rows={4}
          />

          <button
            type="submit"
            className="bg-[#F7AB0A] hover:bg-[#F7AB0A]/90 py-3 px-8 rounded-lg text-[#242424] font-semibold text-base transition-colors duration-300 mt-1"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
}
