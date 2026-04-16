import { Star, Linkedin, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Speaker } from "@/regions/types";

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
  isVisible: boolean;
}

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SpeakerCard = ({ speaker, index, isVisible }: SpeakerCardProps) => (
  <div
    className={`rounded-lg border bg-card p-6 text-center transition-all duration-700 ease-out hover:border-primary/50 ${
      speaker.keynote ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
    } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    style={{ transitionDelay: `${index * 100}ms`, boxShadow: "var(--shadow-card)" }}
  >
    {speaker.keynote && (
      <Badge className="mb-3 bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30">
        <Star className="w-3 h-3 mr-1 fill-amber-400" />
        Keynote
      </Badge>
    )}
    <div
      className="w-24 h-24 mx-auto rounded-full overflow-hidden border-[3px] border-primary mb-4"
      style={{ boxShadow: "var(--shadow-glow)" }}
    >
      <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg font-bold font-display text-foreground">{speaker.name}</h3>
    <p className="text-sm text-primary font-medium">{speaker.title}</p>
    <p className="text-xs text-muted-foreground">{speaker.company}</p>
    {speaker.talk && <p className="text-sm text-muted-foreground mt-3 italic">"{speaker.talk}"</p>}
    {speaker.social && (speaker.social.instagram || speaker.social.linkedin || speaker.social.twitter) && (
      <div className="flex items-center justify-center gap-3 mt-4">
        {speaker.social.linkedin && (
          <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {speaker.social.instagram && (
          <a href={speaker.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {speaker.social.twitter && (
          <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <XIcon />
          </a>
        )}
      </div>
    )}
  </div>
);

export default SpeakerCard;
