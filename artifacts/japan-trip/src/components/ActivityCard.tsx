import { useState } from "react";
import { ThumbsUp, ThumbsDown, Minus, MessageSquare, Send, X, Trash2, ArrowLeftRight, Calendar, MoveRight } from "lucide-react";
import { Activity, itinerary } from "@/data/itinerary";
import { useVotes, type VoteType } from "@/hooks/useVotes";
import { useComments } from "@/hooks/useComments";
import { useCustomActivities } from "@/hooks/useCustomActivities";
import { useCustomActivityVotes } from "@/hooks/useCustomActivityVotes";
import { useActivityMoves } from "@/hooks/useActivityMoves";
import { useReservations } from "@/hooks/useReservations";
import type { CustomActivity } from "@workspace/api-client-react";

// ── Shared vote button ───────────────────────────────────────────────────────
function VoteBtn({
  type, icon, count, active, disabled, onClick, testId,
}: {
  type: VoteType; icon: React.ReactNode; count: number;
  active: boolean; disabled: boolean; onClick: () => void; testId: string;
}) {
  const colors: Record<VoteType, { bg: string; fg: string; border: string }> = {
    up:      { bg: "#1a4a1a", fg: "#4caf50", border: "#4caf50" },
    neutral: { bg: "#1a1a3a", fg: "#8888cc", border: "#5555aa" },
    down:    { bg: "#4a1a1a", fg: "#f44336", border: "#f44336" },
  };
  const c = colors[type];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-bold transition-all"
      style={{
        backgroundColor: active ? c.bg : "#1e1e38",
        color: active ? c.fg : "#888899",
        border: active ? `1px solid ${c.border}` : "1px solid #3a3a60",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
      data-testid={testId}
    >
      {icon}
      {count}
    </button>
  );
}

// ── Move modal ────────────────────────────────────────────────────────────────
function MoveModal({
  activityName,
  currentDayNumber,
  onConfirm,
  onCancel,
}: {
  activityName: string;
  currentDayNumber: number;
  onConfirm: (targetDayNumber: number) => void;
  onCancel: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const otherDays = itinerary.filter((d) => d.dayNumber !== currentDayNumber);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid #3a3a60",
          borderRadius: "10px",
          padding: "24px",
          width: "min(420px, 92vw)",
          maxHeight: "82vh",
          overflowY: "auto",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base" style={{ color: "#c8a84b" }}>
            Déplacer vers un autre jour
          </h3>
          <button onClick={onCancel} style={{ color: "#5555aa", cursor: "pointer" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="mb-4 text-sm italic" style={{ color: "#8888aa" }}>
          « {activityName} »
        </p>

        <div className="flex flex-col gap-2 mb-6" style={{ maxHeight: "340px", overflowY: "auto" }}>
          {otherDays.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => setSelected(d.dayNumber)}
              style={{
                padding: "10px 14px",
                textAlign: "left",
                backgroundColor: selected === d.dayNumber ? "#2a200a" : "#12122060",
                border: selected === d.dayNumber ? "1px solid #c8a84b" : "1px solid #2e2e50",
                color: selected === d.dayNumber ? "#c8a84b" : "#c0c0d8",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontWeight: 600, marginRight: "8px" }}>Jour {d.dayNumber}</span>
              <span style={{ color: selected === d.dayNumber ? "#a07830" : "#6868a0" }}>
                {d.date} — {d.title}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            style={{
              padding: "8px 18px", borderRadius: "6px", fontSize: "13px", cursor: "pointer",
              backgroundColor: "transparent", color: "#6868a0", border: "1px solid #2e2e50",
            }}
          >
            Annuler
          </button>
          <button
            onClick={() => selected !== null && onConfirm(selected)}
            disabled={selected === null}
            style={{
              padding: "8px 18px", borderRadius: "6px", fontSize: "13px", fontWeight: 600,
              backgroundColor: selected !== null ? "#2a200a" : "#1a1a30",
              color: selected !== null ? "#c8a84b" : "#4a4a70",
              border: selected !== null ? "1px solid #6a5020" : "1px solid #2e2e50",
              cursor: selected !== null ? "pointer" : "not-allowed",
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Move control ─────────────────────────────────────────────────────────────
function MoveControl({
  dayNumber,
  activityIndex,
  activityName,
}: {
  dayNumber: number;
  activityIndex: number;
  activityName: string;
}) {
  const { currentVoter } = useVotes();
  const { getMoveForActivity, setMove, deleteMove } = useActivityMoves();
  const [showModal, setShowModal] = useState(false);
  const currentMove = getMoveForActivity(dayNumber, activityIndex);

  if (!currentVoter) return null;

  const handleConfirm = (targetDayNumber: number) => {
    setMove(dayNumber, activityIndex, targetDayNumber, currentVoter);
    setShowModal(false);
  };

  if (currentMove) {
    return (
      <div className="mt-2 flex items-center gap-2 flex-wrap">
        <span className="text-xs px-1.5 py-0.5 rounded"
          style={{ backgroundColor: "#1a2a3a", color: "#6ab0e0", border: "1px solid #2a5080" }}>
          <ArrowLeftRight className="w-3 h-3 inline mr-1" />
          Déplacé → Jour {currentMove.targetDayNumber}
        </span>
        <button
          onClick={() => deleteMove(dayNumber, activityIndex)}
          className="text-xs"
          style={{ color: "#5555aa", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#c8a84b"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#5555aa"; }}
        >
          Restaurer
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
        className="mt-2 flex items-center gap-1 text-xs"
        style={{ color: "#5555aa", cursor: "pointer" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#c8a84b"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#5555aa"; }}
      >
        <MoveRight className="w-3 h-3" />
        Déplacer vers un autre jour
      </button>

      {showModal && (
        <MoveModal
          activityName={activityName}
          currentDayNumber={dayNumber}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

// ── Reservation cell ─────────────────────────────────────────────────────────
export function ReservationCell({
  dayNumber,
  activityIndex,
}: {
  dayNumber: number;
  activityIndex: number;
}) {
  const { currentVoter } = useVotes();
  const { getForActivity, setReservation } = useReservations();
  const res = getForActivity(dayNumber, activityIndex);

  const serverRequired = res?.required ?? false;
  const serverDeadline = res?.deadline ?? null;

  const [optimisticRequired, setOptimisticRequired] = useState<boolean | null>(null);
  const isRequired = optimisticRequired ?? serverRequired;
  const deadline = serverDeadline;

  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!currentVoter) return;
    const newVal = e.target.checked;
    setOptimisticRequired(newVal);
    setReservation(dayNumber, activityIndex, newVal, newVal ? deadline : null, currentVoter);
    setTimeout(() => setOptimisticRequired(null), 2000);
  };

  const changeDate = (val: string) => {
    if (!currentVoter) return;
    setReservation(dayNumber, activityIndex, isRequired, val || null, currentVoter);
  };

  return (
    <td className="px-4 py-4 align-top" style={{ borderLeft: "1px solid #2e2e50", minWidth: "160px" }}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`res-${dayNumber}-${activityIndex}`}
          checked={isRequired}
          onChange={toggle}
          disabled={!currentVoter}
          style={{
            accentColor: "#c8a84b",
            cursor: currentVoter ? "pointer" : "not-allowed",
            width: "15px", height: "15px",
            flexShrink: 0,
          }}
        />
        <label
          htmlFor={`res-${dayNumber}-${activityIndex}`}
          style={{
            color: isRequired ? "#c8a84b" : "#5555aa",
            fontSize: "13px",
            cursor: currentVoter ? "pointer" : "not-allowed",
            userSelect: "none",
          }}
        >
          {isRequired ? "Oui" : "Non"}
        </label>
      </div>

      {isRequired && (
        <div className="mt-2 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#c8a84b" }} />
          <input
            type="date"
            value={deadline ?? ""}
            onChange={(e) => changeDate(e.target.value)}
            disabled={!currentVoter}
            style={{
              backgroundColor: "#12122040",
              border: "1px solid #3a3a60",
              color: deadline ? "#e8e8f0" : "#5555aa",
              borderRadius: "4px",
              fontSize: "12px",
              padding: "2px 4px",
              outline: "none",
              cursor: currentVoter ? "pointer" : "not-allowed",
            }}
          />
        </div>
      )}

      {!currentVoter && (
        <p className="mt-1 italic" style={{ color: "#4a4a70", fontSize: "11px" }}>
          Sélectionnez votre prénom.
        </p>
      )}
    </td>
  );
}

// ── Comment section ──────────────────────────────────────────────────────────
function CommentSection({
  dayNumber,
  activityIndex,
  customActivityId,
}: {
  dayNumber: number;
  activityIndex?: number;
  customActivityId?: number;
}) {
  const { currentVoter } = useVotes();
  const { getForActivity, getForCustomActivity, addComment, deleteComment, isPending } = useComments();
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(false);

  const comments =
    customActivityId !== undefined
      ? getForCustomActivity(customActivityId)
      : getForActivity(dayNumber, activityIndex!);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!text.trim() || !currentVoter) return;
    addComment({
      author: currentVoter,
      dayNumber,
      activityIndex,
      customActivityId,
      content: text.trim(),
    });
    setText("");
    setExpanded(false);
  };

  return (
    <div className="mt-3" onClick={(e) => e.stopPropagation()} style={{ fontFamily: "sans-serif" }}>
      {comments.length > 0 && (
        <div className="mb-2 flex flex-col gap-1.5">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-1.5 group">
              <span style={{ color: "#c8a84b", fontWeight: 600, whiteSpace: "nowrap", fontSize: "13px" }}>
                {c.author} :
              </span>
              <span style={{ color: "#b0b0cc", fontSize: "13px", lineHeight: "1.4" }}>{c.content}</span>
              {currentVoter === c.author && (
                <button
                  onClick={(e) => { e.stopPropagation(); deleteComment(c.id); }}
                  className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Supprimer mon avis"
                  style={{ color: "#4a3a3a", cursor: "pointer", padding: "1px 3px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#f44336"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4a3a3a"; }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {currentVoter && !expanded && (
        <button
          className="flex items-center gap-1 text-sm"
          style={{ color: "#5555aa", cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Ajouter un avis
        </button>
      )}

      {currentVoter && expanded && (
        <form onSubmit={submit} className="flex gap-1.5 mt-1 items-center">
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Votre avis..."
            className="flex-1 rounded px-2 py-1.5 text-sm"
            style={{
              backgroundColor: "#12122040",
              border: "1px solid #3a3a60",
              color: "#e8e8f0",
              outline: "none",
              minWidth: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="submit"
            disabled={!text.trim() || isPending}
            className="flex items-center gap-1 px-2 py-1.5 rounded text-sm font-medium"
            style={{
              backgroundColor: "#2a200a",
              color: "#c8a84b",
              border: "1px solid #6a5020",
              cursor: text.trim() ? "pointer" : "not-allowed",
              opacity: text.trim() ? 1 : 0.5,
              whiteSpace: "nowrap",
            }}
          >
            <Send className="w-3.5 h-3.5" />
            Envoyer
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setExpanded(false); setText(""); }}
            className="text-sm"
            style={{ color: "#5555aa" }}
          >
            Annuler
          </button>
        </form>
      )}
    </div>
  );
}

// ── Built-in activity row ────────────────────────────────────────────────────
interface ActivityRowProps {
  dayNumber: number;
  activityIndex: number;
  activity: Activity;
  isEven: boolean;
  movedFromDay?: number;
}

export function ActivityRow({ dayNumber, activityIndex, activity, isEven, movedFromDay }: ActivityRowProps) {
  const { votes, currentVoter, castVote } = useVotes();

  const key = `${dayNumber}-${activityIndex}`;
  const activityVotes = votes[key] || {};

  const upvoters   = Object.entries(activityVotes).filter(([, v]) => v === "up").map(([n]) => n);
  const downvoters = Object.entries(activityVotes).filter(([, v]) => v === "down").map(([n]) => n);
  const neutrals   = Object.entries(activityVotes).filter(([, v]) => v === "neutral").map(([n]) => n);

  const myVote = currentVoter ? activityVotes[currentVoter] : undefined;
  const rowBg = isEven ? "#1a1a2e" : "#1e1e38";

  if (activity.isIncluded) {
    return (
      <tr style={{ backgroundColor: rowBg, borderBottom: "1px solid #2e2e50", opacity: 0.7 }}>
        <td className="px-4 py-3 align-top" style={{ borderRight: "1px solid #2e2e50" }}>
          <span className="inline-flex items-center gap-1 text-sm font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: "#2a2a45", color: "#8888aa", border: "1px solid #3a3a60" }}>
            INCLUS
          </span>
        </td>
        <td className="px-4 py-3 align-top font-medium text-base" style={{ color: "#8888aa", borderRight: "1px solid #2e2e50" }}>
          {activity.name}
        </td>
        <td className="px-4 py-3 align-top text-sm leading-relaxed" style={{ color: "#666688" }}>
          {activity.description}
        </td>
        <td className="px-4 py-3 align-top" style={{ borderLeft: "1px solid #2e2e50" }} />
      </tr>
    );
  }

  return (
    <tr
      style={{ backgroundColor: rowBg, borderBottom: "1px solid #2e2e50" }}
      data-testid={`activity-row-${dayNumber}-${activityIndex}`}
    >
      <td className="px-4 py-4 align-top" style={{ borderRight: "1px solid #2e2e50" }}>
        {movedFromDay ? (
          <span className="inline-flex items-center gap-1 text-sm font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: "#1a2a1a", color: "#4caf80", border: "1px solid #2a5a30" }}>
            <ArrowLeftRight className="w-3 h-3" />
            Depuis Jour {movedFromDay}
          </span>
        ) : (
          <span className="inline-flex items-center text-sm font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: "#2a200a", color: "#c8a84b", border: "1px solid #6a5020" }}>
            CONSEIL
          </span>
        )}

        {(upvoters.length > 0 || downvoters.length > 0 || neutrals.length > 0) && (
          <div className="mt-2 flex items-center gap-1 flex-wrap">
            {upvoters.length > 0 && (
              <span className="text-sm font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "#0a2a0a", color: "#4caf50" }}>+{upvoters.length}</span>
            )}
            {neutrals.length > 0 && (
              <span className="text-sm font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "#1a1a30", color: "#8888cc" }}>={neutrals.length}</span>
            )}
            {downvoters.length > 0 && (
              <span className="text-sm font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "#2a0a0a", color: "#f44336" }}>-{downvoters.length}</span>
            )}
          </div>
        )}

        <MoveControl dayNumber={dayNumber} activityIndex={activityIndex} activityName={activity.name} />
      </td>

      <td className="px-4 py-4 align-top" style={{ borderRight: "1px solid #2e2e50" }}>
        <p className="font-semibold text-base leading-snug mb-3" style={{ color: "#e8e8f0" }}>
          {activity.name}
        </p>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <VoteBtn type="up"      icon={<ThumbsUp   className="w-4 h-4" />} count={upvoters.length}   active={myVote === "up"}      disabled={!currentVoter} onClick={() => currentVoter && castVote(dayNumber, activityIndex, "up")}      testId={`vote-up-${dayNumber}-${activityIndex}`}      />
          <VoteBtn type="neutral" icon={<Minus       className="w-4 h-4" />} count={neutrals.length}   active={myVote === "neutral"} disabled={!currentVoter} onClick={() => currentVoter && castVote(dayNumber, activityIndex, "neutral")} testId={`vote-neutral-${dayNumber}-${activityIndex}`} />
          <VoteBtn type="down"    icon={<ThumbsDown  className="w-4 h-4" />} count={downvoters.length} active={myVote === "down"}    disabled={!currentVoter} onClick={() => currentVoter && castVote(dayNumber, activityIndex, "down")}    testId={`vote-down-${dayNumber}-${activityIndex}`}    />
        </div>

        {(upvoters.length > 0 || neutrals.length > 0 || downvoters.length > 0) && (
          <div className="mt-1 flex flex-col gap-0.5" style={{ fontSize: "12px" }}>
            {upvoters.length   > 0 && <span style={{ color: "#4caf50" }}>Pour : {upvoters.join(", ")}</span>}
            {neutrals.length   > 0 && <span style={{ color: "#8888cc" }}>Neutre : {neutrals.join(", ")}</span>}
            {downvoters.length > 0 && <span style={{ color: "#f44336" }}>Contre : {downvoters.join(", ")}</span>}
          </div>
        )}

        <CommentSection dayNumber={dayNumber} activityIndex={activityIndex} />
      </td>

      <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: "#b0b0cc" }}>
        {activity.description}
        {!currentVoter && (
          <p className="mt-2 italic" style={{ color: "#666688", fontSize: "12px" }}>
            Sélectionnez votre prénom pour voter et commenter.
          </p>
        )}
      </td>

      <ReservationCell dayNumber={dayNumber} activityIndex={activityIndex} />
    </tr>
  );
}

// ── Custom (proposed) activity row ───────────────────────────────────────────
interface CustomActivityRowProps {
  customActivity: CustomActivity;
  isEven: boolean;
}

export function CustomActivityRow({ customActivity, isEven }: CustomActivityRowProps) {
  const { currentVoter } = useVotes();
  const { getVotesForActivity, castVote } = useCustomActivityVotes();
  const { deleteActivity } = useCustomActivities(customActivity.dayNumber);

  const activityVotes = getVotesForActivity(customActivity.id);
  const upvoters   = activityVotes.filter((v) => v.voteType === "up").map((v) => v.voter);
  const downvoters = activityVotes.filter((v) => v.voteType === "down").map((v) => v.voter);
  const neutrals   = activityVotes.filter((v) => v.voteType === "neutral").map((v) => v.voter);

  const myVote = currentVoter ? activityVotes.find((v) => v.voter === currentVoter)?.voteType : undefined;
  const rowBg = isEven ? "#1a1a2e" : "#1e1e38";
  const isOwner = currentVoter === customActivity.proposedBy;

  return (
    <tr style={{ backgroundColor: rowBg, borderBottom: "1px solid #2e2e50" }}>
      <td className="px-4 py-4 align-top" style={{ borderRight: "1px solid #2e2e50" }}>
        <span className="inline-flex items-center text-sm font-bold px-2 py-0.5 rounded"
          style={{ backgroundColor: "#0a1a2a", color: "#6ab0e0", border: "1px solid #2a5080" }}>
          PROPOSÉ
        </span>
        <div className="mt-1 text-xs" style={{ color: "#4a6888" }}>
          par {customActivity.proposedBy}
        </div>
        {(upvoters.length > 0 || neutrals.length > 0 || downvoters.length > 0) && (
          <div className="mt-2 flex items-center gap-1 flex-wrap">
            {upvoters.length > 0 && (
              <span className="text-sm font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "#0a2a0a", color: "#4caf50" }}>+{upvoters.length}</span>
            )}
            {neutrals.length > 0 && (
              <span className="text-sm font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "#1a1a30", color: "#8888cc" }}>={neutrals.length}</span>
            )}
            {downvoters.length > 0 && (
              <span className="text-sm font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "#2a0a0a", color: "#f44336" }}>-{downvoters.length}</span>
            )}
          </div>
        )}
        {isOwner && (
          <button
            onClick={() => deleteActivity(customActivity.id)}
            className="mt-3 flex items-center gap-1 text-xs"
            title="Supprimer ma proposition"
            style={{ color: "#5a3a3a", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#f44336"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#5a3a3a"; }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Supprimer
          </button>
        )}
      </td>

      <td className="px-4 py-4 align-top" style={{ borderRight: "1px solid #2e2e50" }}>
        <p className="font-semibold text-base leading-snug mb-3" style={{ color: "#e8e8f0" }}>
          {customActivity.name}
        </p>

        <div className="flex items-center gap-2">
          <VoteBtn type="up"      icon={<ThumbsUp   className="w-4 h-4" />} count={upvoters.length}   active={myVote === "up"}      disabled={!currentVoter} onClick={() => currentVoter && castVote(currentVoter, customActivity.id, "up")}      testId={`custom-vote-up-${customActivity.id}`}      />
          <VoteBtn type="neutral" icon={<Minus       className="w-4 h-4" />} count={neutrals.length}   active={myVote === "neutral"} disabled={!currentVoter} onClick={() => currentVoter && castVote(currentVoter, customActivity.id, "neutral")} testId={`custom-vote-neutral-${customActivity.id}`} />
          <VoteBtn type="down"    icon={<ThumbsDown  className="w-4 h-4" />} count={downvoters.length} active={myVote === "down"}    disabled={!currentVoter} onClick={() => currentVoter && castVote(currentVoter, customActivity.id, "down")}    testId={`custom-vote-down-${customActivity.id}`}    />
        </div>

        {(upvoters.length > 0 || neutrals.length > 0 || downvoters.length > 0) && (
          <div className="mt-1 flex flex-col gap-0.5" style={{ fontSize: "12px" }}>
            {upvoters.length   > 0 && <span style={{ color: "#4caf50" }}>Pour : {upvoters.join(", ")}</span>}
            {neutrals.length   > 0 && <span style={{ color: "#8888cc" }}>Neutre : {neutrals.join(", ")}</span>}
            {downvoters.length > 0 && <span style={{ color: "#f44336" }}>Contre : {downvoters.join(", ")}</span>}
          </div>
        )}

        <CommentSection dayNumber={customActivity.dayNumber} customActivityId={customActivity.id} />
      </td>

      <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: "#b0b0cc" }}>
        {customActivity.description || <span style={{ color: "#4a4a70", fontStyle: "italic" }}>Pas de description.</span>}
        {!currentVoter && (
          <p className="mt-2 italic" style={{ color: "#666688", fontSize: "12px" }}>
            Sélectionnez votre prénom pour voter et commenter.
          </p>
        )}
      </td>

      <td className="px-4 py-4 align-top" style={{ borderLeft: "1px solid #2e2e50" }} />
    </tr>
  );
}

export function ActivityCard({ dayNumber, activityIndex, activity }: { dayNumber: number; activityIndex: number; activity: Activity }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <ActivityRow dayNumber={dayNumber} activityIndex={activityIndex} activity={activity} isEven={false} />
      </tbody>
    </table>
  );
}
