import { useState, useEffect } from "react";
import type { ScheduleItem } from "@/regions/types";
import fallbackSchedule from "../data/schedule.json";

const API_URL =
  "https://abicora.com/api/v1/public/events/aws-community-day-brasil-edicao-norte-belem-pa/schedule";

const LEVEL_MAP: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
  all_levels: "",
};

interface ApiTrack {
  id: string;
  name: string;
}

interface ApiTalk {
  title?: string;
  knowledge_level?: string;
  submission_type?: string;
}

interface ApiScheduleItem {
  start_time: string;
  end_time: string;
  title: string;
  track_id: string | null;
  speaker_ids: string[];
  talk?: ApiTalk | null;
}

interface ApiSpeaker {
  id: string;
  name: string;
}

interface ApiResponse {
  data: {
    schedule_items: ApiScheduleItem[];
    tracks: ApiTrack[];
    speakers: ApiSpeaker[];
  };
}

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

const localLevelByTitle = new Map(
  (fallbackSchedule as ScheduleItem[])
    .filter((i) => i.level)
    .map((i) => [normalize(i.title), i.level as string]),
);

function mapApiToSchedule(data: ApiResponse["data"]): ScheduleItem[] {
  const trackById = new Map(data.tracks.map((t) => [t.id, t.name]));
  const speakerById = new Map(data.speakers.map((s) => [s.id, s.name]));

  return data.schedule_items.map((item) => {
    const trackName = item.track_id ? (trackById.get(item.track_id) ?? "Geral") : "Geral";
    const speakerNames = item.speaker_ids
      .map((id) => speakerById.get(id) ?? "")
      .filter(Boolean)
      .join(", ");
    const title = item.talk?.title || item.title;
    const rawLevel = item.talk?.knowledge_level ?? "";
    const level = LEVEL_MAP[rawLevel] || localLevelByTitle.get(normalize(title)) || "";

    return {
      time: `${item.start_time} - ${item.end_time}`,
      title,
      speaker: speakerNames,
      track: trackName,
      level,
    };
  });
}

export function useNorteSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(fallbackSchedule as ScheduleItem[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchSchedule() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = await res.json();
        const mapped = mapApiToSchedule(json.data);
        if (!cancelled && mapped.length > 0) {
          setSchedule(mapped);
        }
      } catch {
        // Silently fall back to the static schedule.json already in state
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSchedule();
    return () => { cancelled = true; };
  }, []);

  return { schedule, loading };
}
