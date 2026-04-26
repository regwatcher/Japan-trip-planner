import { useState } from "react";
import { useParams, Link } from "wouter";
import { itinerary } from "@/data/itinerary";
import { ActivityRow, CustomActivityRow } from "@/components/ActivityCard";
import { VoterSelector } from "@/components/VoterSelector";
import { useVotes } from "@/hooks/useVotes";
import { useCustomActivities } from "@/hooks/useCustomActivities";
import { useActivityMoves } from "@/hooks/useActivityMoves";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

function ProposeForm({ dayNumber }: { dayNumber: number }) {
  const { currentVoter } = useVotes();
  const { propose, isPending } = useCustomActivities(dayNumber);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  if (!currentVoter) return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm px-4 py-2 rounded transition-all mt-4"
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px dashed #3a3a60",
          color: "#6868aa",
          cursor: "pointer",
          fontFamily: "sans-serif",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c8a84b"; (e.currentTarget as HTMLButtonElement).style.color = "#c8a84b"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#3a3a60"; (e.currentTarget as HTMLButtonElement).style.color = "#6868aa"; }}
      >
        <Plus className="w-4 h-4" />
        Proposer une activité
      </button>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !currentVoter) return;
    propose(currentVoter, name.trim(), description.trim() || undefined);
    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <form
      onSubmit={submit}
      className="mt-4 rounded p-4"
      style={{
        backgroundColor: "#1a1a2e",
        border: "1px solid #2e2e50",
        fontFamily: "sans-serif",
      }}
    >
      <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "#6ab0e0" }}>
        Proposer une activité
      </p>
      <div className="flex flex-col gap-2">
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de l'activité *"
          required
          className="rounded px-3 py-2 text-sm"
          style={{
            backgroundColor: "#12122040",
            border: "1px solid #3a3a60",
            color: "#e8e8f0",
            outline: "none",
          }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optionnel)"
          rows={2}
          className="rounded px-3 py-2 text-sm resize-none"
          style={{
            backgroundColor: "#12122040",
            border: "1px solid #3a3a60",
            color: "#e8e8f0",
            outline: "none",
          }}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!name.trim() || isPending}
            className="px-4 py-2 rounded text-sm font-medium"
            style={{
              backgroundColor: name.trim() ? "#2a200a" : "#1a1a2e",
              color: name.trim() ? "#c8a84b" : "#4a4a70",
              border: name.trim() ? "1px solid #6a5020" : "1px solid #3a3a60",
              cursor: name.trim() ? "pointer" : "not-allowed",
            }}
          >
            {isPending ? "Envoi…" : "Proposer"}
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setName(""); setDescription(""); }}
            className="px-4 py-2 rounded text-sm"
            style={{ color: "#5555aa", border: "1px solid #2e2e50", backgroundColor: "transparent", cursor: "pointer" }}
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
}

const TABLE_HEADER = (
  <tr style={{ backgroundColor: "#1e1e38", borderBottom: "2px solid #c8a84b" }}>
    <th className="px-4 py-3 text-left font-semibold w-36"
      style={{ color: "#c8a84b", borderRight: "1px solid #2e2e50" }}>Statut</th>
    <th className="px-4 py-3 text-left font-semibold w-56"
      style={{ color: "#c8a84b", borderRight: "1px solid #2e2e50" }}>Activité</th>
    <th className="px-4 py-3 text-left font-semibold" style={{ color: "#c8a84b" }}>
      Description détaillée
    </th>
    <th className="px-4 py-3 text-left font-semibold w-44"
      style={{ color: "#c8a84b", borderLeft: "1px solid #2e2e50" }}>
      Réservation nécessaire
    </th>
  </tr>
);

export default function DayDetail() {
  const params = useParams();
  const dayNumber = parseInt(params.dayNumber || "1", 10);
  const day = itinerary.find(d => d.dayNumber === dayNumber);
  const prevDay = itinerary.find(d => d.dayNumber === dayNumber - 1);
  const nextDay = itinerary.find(d => d.dayNumber === dayNumber + 1);
  const { customActivities } = useCustomActivities(dayNumber);
  const { getMoveForActivity, getActivitiesMovedToDay } = useActivityMoves();

  if (!day) {
    return <div className="p-8 text-center text-white">Jour introuvable.</div>;
  }

  // Activities from this day that have NOT been moved away
  const localActivities = day.activities
    .map((activity, idx) => ({ activity, idx }))
    .filter(({ idx }) => !getMoveForActivity(dayNumber, idx));

  // Activities from OTHER days that have been moved to this day
  const movedToHere = getActivitiesMovedToDay(dayNumber).filter(
    (m) => m.dayNumber !== dayNumber
  );

  const totalRows = localActivities.length + customActivities.length + movedToHere.length;

  const infoRows = [
    { label: "Ville",        value: day.ville },
    { label: "Repas",        value: day.repas },
    { label: "Transport",    value: day.transport },
    { label: "Hébergement",  value: day.hébergement },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#16162a" }}>
      {/* Top nav */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: "#16162a", borderBottom: "1px solid #2a2a4a" }}>
        <Link href="/">
          <button className="flex items-center gap-1.5 text-base font-semibold" style={{ color: "#c8a84b" }} data-testid="back-home">
            <ChevronLeft className="w-5 h-5" />
            Accueil
          </button>
        </Link>
        <div className="flex items-center gap-6">
          {prevDay ? (
            <Link href={`/day/${prevDay.dayNumber}`}>
              <button className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#8888aa" }} data-testid="prev-day">
                <ChevronLeft className="w-4 h-4" /> Jour {prevDay.dayNumber}
              </button>
            </Link>
          ) : <div className="w-20" />}
          {nextDay ? (
            <Link href={`/day/${nextDay.dayNumber}`}>
              <button className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#8888aa" }} data-testid="next-day">
                Jour {nextDay.dayNumber} <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          ) : <div className="w-20" />}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 py-8">
        {/* Day header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-lg font-bold tracking-wide" style={{ color: "#c8a84b" }}>
              JOUR {day.dayNumber}
            </span>
            <span className="text-lg" style={{ color: "#c8a84b" }}>•</span>
            <span className="text-lg font-bold" style={{ color: "#c8a84b" }}>{day.date}</span>
          </div>
          <p className="text-base italic" style={{ color: "#e8e8f0" }}>{day.title}</p>
        </div>

        <div className="mb-6" style={{ height: "1px", backgroundColor: "#c8a84b" }} />

        {/* Info table */}
        <table className="w-full mb-8 text-sm" style={{ borderCollapse: "collapse", border: "1px solid #2e2e50" }}>
          <tbody>
            {infoRows.map(row => (
              <tr key={row.label} style={{ borderBottom: "1px solid #2e2e50" }}>
                <td className="px-4 py-2 font-semibold w-36"
                  style={{ color: "#e8e8f0", backgroundColor: "#1e1e38", borderRight: "1px solid #2e2e50" }}>
                  {row.label}
                </td>
                <td className="px-4 py-2" style={{ color: "#c8c8e0", backgroundColor: "#1a1a30" }}>
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Voter selector */}
        <div className="mb-6">
          <VoterSelector dark />
        </div>

        {/* Activities table */}
        {totalRows === 0 ? (
          <div className="text-center py-12" style={{ color: "#8888aa" }}>
            Pas d'activités pour aujourd'hui.
          </div>
        ) : (
          <table className="w-full text-sm" style={{ borderCollapse: "collapse", border: "1px solid #2e2e50" }}>
            <thead>{TABLE_HEADER}</thead>
            <tbody>
              {/* Original activities that haven't been moved away */}
              {localActivities.map(({ activity, idx }, rowIdx) => (
                <ActivityRow
                  key={idx}
                  dayNumber={day.dayNumber}
                  activityIndex={idx}
                  activity={activity}
                  isEven={rowIdx % 2 === 0}
                />
              ))}

              {/* Activities moved in from other days */}
              {movedToHere.map((move, idx) => {
                const origDay = itinerary.find(d => d.dayNumber === move.dayNumber);
                const activity = origDay?.activities[move.activityIndex];
                if (!activity) return null;
                return (
                  <ActivityRow
                    key={`moved-${move.dayNumber}-${move.activityIndex}`}
                    dayNumber={move.dayNumber}
                    activityIndex={move.activityIndex}
                    activity={activity}
                    isEven={(localActivities.length + idx) % 2 === 0}
                    movedFromDay={move.dayNumber}
                  />
                );
              })}

              {/* Custom (proposed) activities */}
              {customActivities.map((ca, idx) => (
                <CustomActivityRow
                  key={ca.id}
                  customActivity={ca}
                  isEven={(localActivities.length + movedToHere.length + idx) % 2 === 0}
                />
              ))}
            </tbody>
          </table>
        )}

        <ProposeForm dayNumber={dayNumber} />
      </div>
    </div>
  );
}
