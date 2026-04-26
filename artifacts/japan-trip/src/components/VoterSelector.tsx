import { FAMILY_MEMBERS, useVotes } from "@/hooks/useVotes";

interface VoterSelectorProps {
  dark?: boolean;
}

export function VoterSelector({ dark }: VoterSelectorProps) {
  const { currentVoter, setCurrentVoter } = useVotes();

  if (dark) {
    return (
      <div className="flex flex-wrap items-center gap-2" style={{ padding: "12px 0" }}>
        <span className="text-xs font-bold tracking-widest uppercase mr-2" style={{ color: "#8888aa" }}>
          Qui vote ?
        </span>
        {FAMILY_MEMBERS.map(member => (
          <button
            key={member}
            onClick={() => setCurrentVoter(member)}
            className="px-4 py-1.5 rounded text-sm font-medium transition-all"
            style={{
              backgroundColor: currentVoter === member ? "#c8a84b" : "#1e1e38",
              color: currentVoter === member ? "#16162a" : "#8888aa",
              border: currentVoter === member ? "1px solid #c8a84b" : "1px solid #3a3a60",
            }}
            data-testid={`voter-${member}`}
          >
            {member}
          </button>
        ))}
        {currentVoter && (
          <span className="text-xs ml-2" style={{ color: "#c8a84b" }}>
            — vous votez en tant que <strong>{currentVoter}</strong>
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="mb-6 rounded"
      style={{
        backgroundColor: "#1a1a2e",
        border: "1px solid #2e2e50",
      }}
    >
      <div className="px-5 py-3" style={{ borderBottom: "1px solid #2e2e50" }}>
        <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "#c8a84b" }}>
          Qui vote ?
        </p>
      </div>
      <div className="px-5 py-4 flex flex-wrap gap-2">
        {FAMILY_MEMBERS.map(member => (
          <button
            key={member}
            onClick={() => setCurrentVoter(currentVoter === member ? null : member)}
            className="px-5 py-2 rounded text-sm font-medium transition-all"
            style={{
              backgroundColor: currentVoter === member ? "#c8a84b" : "#16162a",
              color: currentVoter === member ? "#16162a" : "#b0b0cc",
              border: currentVoter === member ? "1px solid #c8a84b" : "1px solid #3a3a60",
              fontFamily: "sans-serif",
            }}
            data-testid={`voter-${member}`}
          >
            {member}
          </button>
        ))}
        {currentVoter && (
          <span
            className="flex items-center text-xs ml-1"
            style={{ color: "#8888aa", fontFamily: "sans-serif" }}
          >
            Vous votez en tant que{" "}
            <strong className="ml-1" style={{ color: "#c8a84b" }}>
              {currentVoter}
            </strong>
          </span>
        )}
      </div>
    </div>
  );
}
