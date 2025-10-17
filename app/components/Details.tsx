import React from "react";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "../components/Accordion";
import { cn } from "~/lib/format";

// Assume Feedback is imported or globally defined. We'll reference it for props typing.
// Define a local Tip type used within CategoryContent.
export type Tip = {
  type: "good" | "improve";
  tip: string;
  explanation: string;
};

// Helper component: ScoreBadge
const ScoreBadge: React.FC<{ score: number; className?: string }> = ({ score, className }) => {
  const color = score > 69 ? "green" : score > 39 ? "yellow" : "red";
  const palette = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      icon: "text-green-600",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: "text-yellow-600",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: "text-red-600",
    },
  } as const;

  const Icon = () => {
    if (color === "green") {
      return (
        <svg className={cn("w-4 h-4", palette[color].icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (color === "yellow") {
      return (
        <svg className={cn("w-4 h-4", palette[color].icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.8A2 2 0 004.6 20h14.8a2 2 0 001.71-3.34l-7.4-12.8a2 2 0 00-3.42 0z" />
        </svg>
      );
    }
    return (
      <svg className={cn("w-4 h-4", palette[color].icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M9.37 5.51l-6.86 11.87A2 2 0 004.18 21h15.64a2 2 0 001.67-3.02L14.64 5.51a2 2 0 00-3.46 0z" />
      </svg>
    );
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        palette[color].bg,
        palette[color].border,
        palette[color].text,
        className
      )}
    >
      <Icon />
      {score}/100
    </span>
  );
};

// Helper component: CategoryHeader
const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({ title, categoryScore }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h4 className="text-sm md:text-base font-semibold text-gray-800">{title}</h4>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// Helper component: CategoryContent
const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => {
  return (
    <div className="space-y-4">
      {/* Two-column grid of tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tips.map((t, idx) => (
          <div key={idx} className="flex items-start gap-2">
            {t.type === "good" ? (
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86l-7.4 12.8A2 2 0 004.6 20h14.8a2 2 0 001.71-3.34l-7.4-12.8a2 2 0 00-3.42 0z" />
              </svg>
            )}
            <div>
              <p className={cn("text-sm font-medium", t.type === "good" ? "text-gray-800" : "text-gray-800")}>{t.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Explanations list */}
      <div className="space-y-2">
        {tips.map((t, idx) => (
          <div
            key={`exp-${idx}`}
            className={cn(
              "rounded-md border p-3 text-sm",
              t.type === "good"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-amber-50 border-amber-200 text-amber-900"
            )}
          >
            <div className="flex items-start gap-2">
              {t.type === "good" ? (
                <svg className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 mt-0.5 text-amber-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86l-7.4 12.8A2 2 0 004.6 20h14.8a2 2 0 001.71-3.34l-7.4-12.8a2 2 0 00-3.42 0z" />
                </svg>
              )}
              <div>
                <p className="font-medium">{t.tip}</p>
                <p className="text-xs mt-1 opacity-90">{t.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// The Details component
// Assuming Feedback has the following shape for used fields:
// feedback: {
//   toneStyle: { score: number; tips: Tip[] };
//   content: { score: number; tips: Tip[] };
//   structure: { score: number; tips: Tip[] };
//   skills: { score: number; tips: Tip[] };
// }
// If a global Feedback type exists, this annotation will match those properties.

interface CategoryData { score: number; tips: Tip[] }

interface LocalFeedback {
  toneStyle: CategoryData;
  content: CategoryData;
  structure: CategoryData;
  skills: CategoryData;
}

type DetailsProps = {
  feedback: Feedback | LocalFeedback; // prefer global Feedback if present
  defaultOpen?: "tone" | "content" | "structure" | "skills";
};

const Details: React.FC<DetailsProps> = ({ feedback, defaultOpen = "tone" }) => {
  // Map defaultOpen to item ids
  const openId =
    defaultOpen === "tone" ? "tone-style" :
    defaultOpen === "content" ? "content" :
    defaultOpen === "structure" ? "structure" :
    "skills";

  // Type narrow for local usage
  const fb = feedback as LocalFeedback as any;

  return (
    <div className="w-full">
      <Accordion defaultOpen={openId} allowMultiple className="divide-y divide-gray-100">
        {/* Tone & Style */}
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader title="Tone & Style" categoryScore={fb?.toneStyle?.score ?? 0} />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={fb?.toneStyle?.tips ?? []} />
          </AccordionContent>
        </AccordionItem>

        {/* Content */}
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader title="Content" categoryScore={fb?.content?.score ?? 0} />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={fb?.content?.tips ?? []} />
          </AccordionContent>
        </AccordionItem>

        {/* Structure */}
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader title="Structure" categoryScore={fb?.structure?.score ?? 0} />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={fb?.structure?.tips ?? []} />
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader title="Skills" categoryScore={fb?.skills?.score ?? 0} />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={fb?.skills?.tips ?? []} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;

// Also export helpers in case they are useful elsewhere (not required, but harmless)
export { ScoreBadge, CategoryHeader, CategoryContent };
