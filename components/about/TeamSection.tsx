import React from 'react';
import TeamMember from './TeamMember';

interface TeamMemberData {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamSectionProps {
  teamMembers: TeamMemberData[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers }) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
            تیم ما
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            متخصصان با تجربه ما آماده ارائه بهترین محصولات و خدمات به شما هستند
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              bio={member.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
