import React from "react";

const page = () => {
  return (
    <div className="pt-20 pl-16 pr-10 max-md:pl-2 max-md:pr-2">
      <article className="flex flex-col gap-3 mb-8">
        <h2 className="font-semibold text-2xl text-neutral-100">
          Terms and Conditions
        </h2>
        <p className="font-light text-neutral-200">
          This Agreement contains the complete terms and conditions that apply
          to your participation in our site. If you wish to use the site
          including its tools and services please read these terms of use
          carefully. By accessing this site or using any part of the site or any
          content or services hereof, you agree to become bound by these terms
          and conditions. If you do not agree to all the terms and conditions,
          then you may not access the site or use the content or any services in
          the site.
        </p>
      </article>

      <h2 className="font-semibold text-neutral-200 text-xl">
        Use of the Website
      </h2>
      <article className="my-6 flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-neutral-200 ">
          Age Restriction
        </h2>
        <p className="font-light text-neutral-300 ">
          You must be 18 years of age or older to use this Website. If you are
          under the age of 18, you may only use the Website with the involvement
          of a parent or guardian.
        </p>
      </article>
      <article className="my-6 flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-neutral-200">
          Third-Party Content
        </h2>
        <p className="font-light text-neutral-300">
          Our Website utilizes third-party APIs to stream movies and TV shows.
          We do not host any of the content directly on our servers. All content
          is provided by third-party sources, and you acknowledge that we have
          no control over the availability, quality, or legality of the content.
        </p>
      </article>
      <article className="my-6 flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-neutral-200">
          Registration Information
        </h2>
        <p className="font-light text-neutral-300">
          To access certain features of the Website, you may be required to sign
          up and provide personal information. You must ensure that all the
          information you provide is accurate, current, and complete. You are
          responsible for maintaining the confidentiality of your account and
          password, and you are solely responsible for all activities that occur
          under your account.
        </p>
      </article>
      <article className="my-6 flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-neutral-200">Disclaimer</h2>
        <ol className="flex flex-col gap-3 list-decimal ml-4">
          <li className="font-light text-neutral-300">
            The content on this Website is provided on an &quot;as-is&quot;
            basis. We do not warrant the accuracy, completeness, or availability
            of the content.
          </li>
          <li className="font-light text-neutral-300">
            We do not guarantee uninterrupted or error-free access to the
            Website or its services.
          </li>
          <li className="font-light text-neutral-300">
            You acknowledge that streaming copyrighted content without proper
            authorization may be illegal in your jurisdiction, and we are not
            responsible for any legal consequences resulting from your use of
            the Website.
          </li>
        </ol>
      </article>
    </div>
  );
};

export default page;
