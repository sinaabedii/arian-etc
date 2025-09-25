import React from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, bio }) => {
  return (
    <Card className="text-center">
      <div className="space-y-4">
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-neutral-800 mb-1">
            {name}
          </h3>
          <p className="text-primary-600 font-medium mb-3">
            {role}
          </p>
          <p className="text-neutral-600 text-sm">
            {bio}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TeamMember;
