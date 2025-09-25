import React from 'react';
import ContactMethod from './ContactMethod';

interface ContactMethodData {
  icon: string;
  title: string;
  description: string;
  contact: string;
  action: string;
}

interface ContactMethodsProps {
  contactMethods: ContactMethodData[];
}

const ContactMethods: React.FC<ContactMethodsProps> = ({ contactMethods }) => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
            راه‌های تماس با ما
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            ما همیشه آماده پاسخگویی به سوالات و نیازهای شما هستیم
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <ContactMethod
              key={index}
              icon={method.icon}
              title={method.title}
              description={method.description}
              contact={method.contact}
              action={method.action}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
