import { Link } from "wouter";
import { itinerary } from "@/data/itinerary";
import { VoterSelector } from "@/components/VoterSelector";
import { useVotes } from "@/hooks/useVotes";

const DAY_HEADERS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const TRIP_START = new Date(2026, 6, 27); // July 27, 2026 — Monday

function shortDate(dayOffset: number) {
  const d = new Date(TRIP_START);
  d.setDate(TRIP_START.getDate() + dayOffset);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

const TOTAL_SLOTS = 21; // 3 rows × 7
const dayByNumber = Object.fromEntries(itinerary.map((d) => [d.dayNumber, d]));

export default function Home() {
  const { getLeaderboard, votes } = useVotes();
  const leaderboard = getLeaderboard();
  const topActivities = leaderboard.slice(0, 5);

  const getDayVoteSummary = (dayNumber: number) => {
    let upvotes = 0;
    let downvotes = 0;
    let totalVoted = 0;
    itinerary
      .find((d) => d.dayNumber === dayNumber)
      ?.activities.forEach((_, idx) => {
        const key = `${dayNumber}-${idx}`;
        Object.values(votes[key] || {}).forEach((v) => {
          totalVoted++;
          if (v === "up") upvotes++;
          if (v === "down") downvotes++;
        });
      });
    return { upvotes, downvotes, totalVoted };
  };

  const weeks = [
    Array.from({ length: 7 }, (_, i) => i + 1),   // J1–J7
    Array.from({ length: 7 }, (_, i) => i + 8),   // J8–J14
    Array.from({ length: 7 }, (_, i) => (i < 4 ? i + 15 : null)), // J15–J18, then null×3
  ];

  return (
    <div
      className="min-h-screen pb-16"
      style={{ backgroundColor: "#16162a", color: "#e8e8f0", fontFamily: "serif" }}
    >
      <header
        className="px-6 pt-10 pb-8 text-center"
        style={{ borderBottom: "1px solid #2e2e50" }}
      >
        <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "#c8a84b" }}>
          Famille De Decker
        </p>
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#e8e8f0", letterSpacing: "0.02em" }}>
          Japon 2026
        </h1>
        <p className="text-sm tracking-widest" style={{ color: "#b0b0cc" }}>
          27 Juillet — 13 Août
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-2 pt-8">
        {/* Instructions */}
        <div
          className="mb-8 px-5 py-4 rounded leading-relaxed"
          style={{
            backgroundColor: "#1a1a2e",
            border: "1px solid #2e2e50",
            color: "#b0b0cc",
            fontFamily: "sans-serif",
            fontSize: "15px",
          }}
        >
          <p className="mb-1.5">
            <span style={{ color: "#c8a84b", fontWeight: 600 }}>1.</span>{" "}
            Choisissez votre prénom ci-dessus.
          </p>
          <p className="mb-1.5">
            <span style={{ color: "#c8a84b", fontWeight: 600 }}>2.</span>{" "}
            Cliquez sur un jour pour voir ses activités.
          </p>
          <p className="mb-1.5">
            <span style={{ color: "#c8a84b", fontWeight: 600 }}>3.</span>{" "}
            Votez pour chaque activité : pour (+), neutre (—) ou contre (−). Vous pouvez naviguer d'un jour à l'autre avec les flèches en haut de page.
          </p>
          <p className="mb-1.5">
            <span style={{ color: "#c8a84b", fontWeight: 600 }}>4.</span>{" "}
            Laissez un avis sous chaque activité. Survolez votre avis pour le supprimer.
          </p>
          <p>
            <span style={{ color: "#c8a84b", fontWeight: 600 }}>5.</span>{" "}
            Proposez vos propres activités via le bouton en bas de chaque journée. Vous pouvez supprimer vos propres propositions.
          </p>
        </div>

        <VoterSelector />

        {/* Calendar grid */}
        <section className="mb-10">
          <h2
            className="text-xs font-mono tracking-[0.25em] uppercase mb-4"
            style={{ color: "#c8a84b" }}
          >
            Itinéraire — 18 jours
          </h2>

          {weeks.map((week, wi) => (
            <div key={wi} className="mb-3">
              {/* Day-of-week header row */}
              <div className="grid gap-2 mb-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
                {DAY_HEADERS.map((h) => (
                  <div
                    key={h}
                    className="text-center text-xs font-mono"
                    style={{ color: "#4a4a70", letterSpacing: "0.1em" }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* Card row */}
              <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
                {week.map((dayNumber, di) => {
                  const offset = wi * 7 + di;

                  if (!dayNumber) {
                    return (
                      <div
                        key={`empty-${di}`}
                        style={{
                          height: "150px",
                          backgroundColor: "#13132200",
                          border: "1px dashed #2e2e5055",
                          borderRadius: "4px",
                        }}
                      />
                    );
                  }

                  const day = dayByNumber[dayNumber];
                  const { upvotes, downvotes, totalVoted } = getDayVoteSummary(dayNumber);
                  const hasVotes = totalVoted > 0;

                  return (
                    <Link key={dayNumber} href={`/day/${dayNumber}`}>
                      <div
                        className="rounded flex flex-col transition-all cursor-pointer overflow-hidden"
                        style={{
                          height: "150px",
                          backgroundColor: "#1a1a2e",
                          border: "1px solid #2e2e50",
                          padding: "10px 12px",
                          fontFamily: "sans-serif",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "#c8a84b";
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = "#1e1e38";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "#2e2e50";
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = "#1a1a2e";
                        }}
                      >
                        {/* Date + day number */}
                        <div className="flex items-baseline justify-between mb-1.5">
                          <span
                            className="font-mono font-bold"
                            style={{ color: "#c8a84b", fontSize: "15px" }}
                          >
                            J{dayNumber}
                          </span>
                          <span
                            className="font-mono"
                            style={{ color: "#4a4a70", fontSize: "12px" }}
                          >
                            {shortDate(offset)}
                          </span>
                        </div>

                        {/* Title */}
                        <span
                          className="leading-snug flex-1 overflow-hidden"
                          style={{
                            color: "#e8e8f0",
                            fontSize: "13px",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {day.title}
                        </span>

                        {/* City */}
                        <span
                          className="mt-auto pt-1 block truncate"
                          style={{ color: "#6868aa", fontSize: "12px" }}
                        >
                          {day.ville}
                        </span>

                        {/* Vote badges */}
                        {hasVotes && (
                          <div className="flex gap-1 mt-1">
                            {upvotes > 0 && (
                              <span
                                className="font-bold px-1 rounded"
                                style={{ backgroundColor: "#0a2a0a", color: "#4caf50", fontSize: "8px" }}
                              >
                                +{upvotes}
                              </span>
                            )}
                            {downvotes > 0 && (
                              <span
                                className="font-bold px-1 rounded"
                                style={{ backgroundColor: "#2a0a0a", color: "#f44336", fontSize: "8px" }}
                              >
                                -{downvotes}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Leaderboard */}
        {topActivities.length > 0 && (
          <section
            className="rounded mb-10"
            style={{ border: "1px solid #2e2e50", backgroundColor: "#1a1a2e" }}
          >
            <div className="px-5 py-3" style={{ borderBottom: "1px solid #2e2e50" }}>
              <h2
                className="text-xs font-mono tracking-[0.25em] uppercase"
                style={{ color: "#c8a84b" }}
              >
                Les plus attendus
              </h2>
            </div>
            <div>
              {topActivities.map((item, idx) => (
                <Link key={idx} href={`/day/${item.dayNumber}`}>
                  <div
                    className="flex items-center justify-between px-5 py-3 cursor-pointer"
                    style={{
                      borderBottom: idx < topActivities.length - 1 ? "1px solid #2e2e50" : "none",
                      fontFamily: "sans-serif",
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="font-mono font-bold w-5 text-right flex-shrink-0"
                        style={{ color: "#c8a84b", fontSize: "11px" }}
                      >
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "#e8e8f0" }}>
                          {item.activity.name}
                        </p>
                        <p className="text-xs" style={{ color: "#6868aa" }}>
                          Jour {item.dayNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      {item.upvotes > 0 && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: "#0a2a0a", color: "#4caf50" }}
                        >
                          +{item.upvotes}
                        </span>
                      )}
                      {item.downvotes > 0 && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: "#2a0a0a", color: "#f44336" }}
                        >
                          -{item.downvotes}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
