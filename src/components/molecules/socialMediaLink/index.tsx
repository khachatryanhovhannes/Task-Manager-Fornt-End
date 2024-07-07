import { IconButton, Link } from "@chakra-ui/react";
import { ReactElement } from "react";

interface ISocialMediaLinkProps {
  href: string;
  icon: ReactElement;
  areaLabel: string;
}

function SocialMediaLink({ href, icon, areaLabel }: ISocialMediaLinkProps) {
  return (
    <Link mx={2} href={href} target="_blank" rel="noopener noreferrer">
      <IconButton
        icon={icon}
        aria-label={areaLabel}
        variant="ghost"
        fontSize="lg"
      />
    </Link>
  );
}

export default SocialMediaLink;
