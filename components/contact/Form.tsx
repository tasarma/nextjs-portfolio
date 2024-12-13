"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  from_name: z.string().min(3, "Name should be at least 3 characters long."),
  reply_to: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(50, "Message should be more than 50 characters")
    .max(500, "Message should be less than 500 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const sendEmail = (params: FormValues) => {
    const toastId = toast.loading("Sending your message, please wait...");

    emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID!,
      process.env.NEXT_PUBLIC_TEMPLATE_ID!,
      params,
      {
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        limitRate: {
          throttle: 3 * 60 * 60 * 1000,
        }
      },

    )
    .then(
      () => {
        toast.success("I have received your message, I will get back to you soon!", {
          id: toastId,
        })
      },
      (error) => {
        toast.error("There was an error sending your message, please try again later!", {
          id: toastId,
        })
      }
    )
  };

  const onSubmit = (data: FormValues) => {
    sendEmail(data);
  };

  return (
    <>
      <Toaster richColors />
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col items-center justify-center space-y-4"
      >
        <motion.input
          variants={item}
          type="text"
          placeholder="name"
          {...register("from_name")}
          className="w-full p-2 rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg"
        />
        {errors.from_name && (
          <span className="inline-block self-start text-accent">
            {errors.from_name.message}
          </span>
        )}
        <motion.input
          variants={item}
          type="email"
          placeholder="email"
          {...register("reply_to")}
          className="w-full p-2 rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg"
        />
        {errors.reply_to && (
          <span className="inline-block self-start text-accent">
            {errors.reply_to.message}
          </span>
        )}
        <motion.textarea
          variants={item}
          placeholder="message"
          {...register("message")}
          className="w-full p-2 rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg"
        />
        {errors.message && (
          <span className="inline-block self-start text-accent">
            {errors.message.message}
          </span>
        )}

        <motion.input
          variants={item}
          value="Cast your message!"
          className="px-10 py-4 rounded-md shadow-lg bg-background border border-accent/30 border-solid
      hover:shadow-glass-sm backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer capitalize
      "
          type="submit"
        />
      </motion.form>
    </>
  );
}
