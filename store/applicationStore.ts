import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  assessmentConfigs,
  type AssessmentType,
  type PositionAssessmentConfig,
  type MCQQuestion,
  type ShortAnswerQuestion,
  type LongAnswerQuestion,
} from "@/data/questions-data";
import { apiGet } from "@/lib/api/client";
import { hiringApi } from "@/lib/api/hiring";
import { openPositionsData } from "@/data/career-data";

export interface ApplicationState {
  // Job context
  positionId: number | null;
  positionTitle: string;
  positionSlug: string | null;

  // Personal Info
  name: string;
  email: string;
  isOtpVerified: boolean;
  applicationId: number | null;
  otpCode: string | null;

  // Assessment state
  isStarted: boolean;
  isCompleted: boolean; // Flag if exam submitted
  startedAt: number | null; // Timestamp
  stageTimeRemaining: Record<string, number>; // stage -> remaining seconds
  isTimerRunning: boolean;
  mcqAnswers: Record<string, number>; // questionId -> optionIndex
  shortAnswers: Record<string, string>; // questionId -> text
  longAnswers: Record<string, string>; // questionId -> text
  score: number; // percentage
  isPassed: boolean;
  isGraded: boolean;
  assessmentConfig: PositionAssessmentConfig | null;
  completedStages: Record<string, boolean>; // stage -> completed flag

  // Dynamic Questions & Config
  dynamicMcqQuestions: MCQQuestion[];
  dynamicShortQuestions: ShortAnswerQuestion[];
  dynamicLongQuestions: LongAnswerQuestion[];
  isLoadingAssessment: boolean;
  assessmentLoadError: string | null;
  showTimeoutAlert: string | null;
  transitionCountdown: number | null;

  // Additional Info
  phoneNumber: string;
  location: string;
  linkedin: string;
  portfolio: string;
  heardAbout: string[];
  experience: string;
  expectedSalary: string;
  noticePeriod: string;
  cvFileName: string;
  cvFileSize: number;
  cvUrl: string;
  coverLetter: string;

  // Actions
  setPersonalInfo: (name: string, email: string) => void;
  setStep1Data: (applicationId: number | null, otpCode: string | null) => void;
  setOtpVerified: (verified: boolean) => void;
  startAssessment: (
    positionId: number,
    positionTitle: string,
    config: PositionAssessmentConfig
  ) => void;
  tickTimer: (currentStage: string) => void;
  stopTimer: () => void;
  completeStage: (stage: string) => void;
  setMCQAnswer: (questionId: string, optionIndex: number) => void;
  setShortAnswer: (questionId: string, answerText: string) => void;
  setLongAnswer: (questionId: string, answerText: string) => void;
  completeAssessment: () => void;
  setGradingResult: (score: number, isPassed: boolean) => void;
  setAdditionalInfo: (info: Partial<Omit<ApplicationState, "actions">>) => void;
  fetchAssessment: (slugOrId: string | number) => Promise<boolean>;
  setShowTimeoutAlert: (stage: string | null) => void;
  setTransitionCountdown: (countdown: number | null) => void;
  finalizeTimeoutStage: (stage: string | null) => void;
  skipAssessmentFlow: () => void;
  reset: () => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      // Initial state
      positionId: null,
      positionTitle: "",
      positionSlug: null,
      name: "",
      email: "",
      isOtpVerified: false,
      applicationId: null,
      otpCode: null,
      isStarted: false,
      isCompleted: false,
      startedAt: null,
      stageTimeRemaining: {},
      isTimerRunning: false,
      mcqAnswers: {},
      shortAnswers: {},
      longAnswers: {},
      score: 0,
      isPassed: false,
      isGraded: false,
      assessmentConfig: null,
      completedStages: {},
      dynamicMcqQuestions: [],
      dynamicShortQuestions: [],
      dynamicLongQuestions: [],
      isLoadingAssessment: false,
      assessmentLoadError: null,
      showTimeoutAlert: null,
      transitionCountdown: null,
      phoneNumber: "",
      location: "",
      linkedin: "",
      portfolio: "",
      heardAbout: [],
      experience: "",
      expectedSalary: "",
      noticePeriod: "",
      cvFileName: "",
      cvFileSize: 0,
      cvUrl: "",
      coverLetter: "",

      // Actions
      setPersonalInfo: (name, email) => set({ name, email }),

      setStep1Data: (applicationId, otpCode) => set({ applicationId, otpCode }),

      setOtpVerified: (isOtpVerified) => set({ isOtpVerified }),

      setShowTimeoutAlert: (showTimeoutAlert) => set({ showTimeoutAlert }),

      setTransitionCountdown: (transitionCountdown) => set({ transitionCountdown }),

      skipAssessmentFlow: () => {
        set({
          isStarted: true,
          isCompleted: true,
          isPassed: true,
          isGraded: true,
          score: 100,
        });
      },

      finalizeTimeoutStage: (stage) => {
        if (!stage) return;
        const stageTimes = get().stageTimeRemaining;
        const updatedTimes = { ...stageTimes, [stage]: 0 };
        const updatedCompletedStages = {
          ...get().completedStages,
          [stage]: true,
        };
        const posId = get().positionId;
        let nextStageExists = false;
        if (posId) {
          const config = get().assessmentConfig ?? assessmentConfigs[posId];
          const types =
            config?.assessmentTypes ??
            (config ? [config.assessmentType] : []);
          const currentIndex = types.indexOf(stage as any);
          const nextStage = types[currentIndex + 1];
          nextStageExists = !!nextStage;

          if (!nextStage) {
            get().completeAssessment();
          }
        }
        set({
          stageTimeRemaining: updatedTimes,
          completedStages: updatedCompletedStages,
          isTimerRunning: nextStageExists,
          transitionCountdown: null,
          showTimeoutAlert: null,
        });
      },

      startAssessment: (positionId, positionTitle, config) => {
        const types =
          config?.assessmentTypes ?? (config ? [config.assessmentType] : []);
        const stageTimeRemaining: Record<string, number> = {};

        types.forEach((type: string) => {
          const limit =
            config?.stageTimeLimits?.[type] ?? config?.timeLimitMinutes ?? 30;
          stageTimeRemaining[type] = limit * 60;
        });

        set({
          positionId,
          positionTitle,
          assessmentConfig: config,
          isStarted: true,
          isCompleted: false,
          startedAt: Date.now(),
          stageTimeRemaining,
          completedStages: {},
          isTimerRunning: true,
          mcqAnswers: {},
          shortAnswers: {},
          longAnswers: {},
          score: 0,
          isPassed: false,
          isGraded: false,
        });
      },

      tickTimer: (currentStage) => {
        const stageTimes = get().stageTimeRemaining;
        const currentRemaining = stageTimes[currentStage] ?? 0;
        if (currentRemaining <= 1) {
          // Timer finished! Pause the main timer and trigger the 5-second redirect countdown.
          set({
            isTimerRunning: false,
            transitionCountdown: 5,
            showTimeoutAlert: currentStage,
          });
        } else {
          set({
            stageTimeRemaining: {
              ...stageTimes,
              [currentStage]: currentRemaining - 1,
            },
          });
        }
      },

      stopTimer: () => set({ isTimerRunning: false }),

      completeStage: (stage) => {
        set((state) => ({
          completedStages: {
            ...state.completedStages,
            [stage]: true,
          },
        }));
      },

      setMCQAnswer: (questionId, optionIndex) => {
        set((state) => ({
          mcqAnswers: {
            ...state.mcqAnswers,
            [questionId]: optionIndex,
          },
        }));
      },

      setShortAnswer: (questionId, answerText) => {
        set((state) => ({
          shortAnswers: {
            ...state.shortAnswers,
            [questionId]: answerText,
          },
        }));
      },

      setLongAnswer: (questionId, answerText) => {
        set((state) => ({
          longAnswers: {
            ...state.longAnswers,
            [questionId]: answerText,
          },
        }));
      },

      completeAssessment: () => {
        set({
          isCompleted: true,
          isGraded: false,
          isPassed: false,
          score: 0,
          isTimerRunning: false,
        });
      },

      setGradingResult: (score, isPassed) => {
        set({
          score,
          isPassed,
          isGraded: true,
        });
      },

      setAdditionalInfo: (info) => set((state) => ({ ...state, ...info })),

      fetchAssessment: async (slugOrId) => {
        set({ isLoadingAssessment: true, assessmentLoadError: null });
        const searchStr = String(slugOrId).trim();
        const isNum = !isNaN(Number(searchStr)) && /^\d+$/.test(searchStr);
        const numId = isNum ? Number(searchStr) : null;

        let realPosition: { id: number; title: string; slug?: string } | null = null;

        // 1. Direct API lookup via hiringApi by slug or ID
        try {
          if (isNum && numId !== null) {
            const res = await hiringApi.getPositionById(numId);
            if (res?.position) {
              realPosition = {
                id: res.position.id,
                title: res.position.title,
                slug: res.position.slug,
              };
            }
          } else {
            const res = await hiringApi.getPositionBySlug(searchStr);
            if (res?.position) {
              realPosition = {
                id: res.position.id,
                title: res.position.title,
                slug: res.position.slug,
              };
            }
          }
        } catch (err) {
          console.warn(`Direct fetch position for ${slugOrId} failed, falling back to list...`, err);
        }

        // 2. Fallback to positions list endpoint
        if (!realPosition) {
          try {
            const res = await apiGet<any>("/api/v1/hiring/positions");
            const positionsList: any[] = Array.isArray(res)
              ? res
              : Array.isArray(res?.positions)
              ? res.positions
              : Array.isArray(res?.data)
              ? res.data
              : [];

            if (positionsList.length > 0) {
              const found = positionsList.find((p: any) => {
                const rawId = p.id ?? p.position_id;
                if (numId !== null && (rawId === numId || Number(rawId) === numId)) return true;
                if (rawId !== undefined && rawId !== null && String(rawId).toLowerCase() === searchStr.toLowerCase()) return true;
                if (p.slug && String(p.slug).toLowerCase() === searchStr.toLowerCase()) return true;
                if (p.title && String(p.title).toLowerCase() === searchStr.toLowerCase()) return true;
                return false;
              });
              if (found) {
                const rawPosId = found.id ?? found.position_id;
                const realId = typeof rawPosId === "number" ? rawPosId : Number(rawPosId) || rawPosId;
                realPosition = {
                  id: realId,
                  title: found.title,
                  slug: found.slug,
                };
              }
            }
          } catch (err) {
            console.warn("Positions list fallback failed:", err);
          }
        }

        // 3. Fallback to static mock position data
        if (!realPosition) {
          const staticPos = openPositionsData.positions.find(
            (pos) => pos.id.toString() === searchStr || pos.slug?.toLowerCase() === searchStr.toLowerCase()
          );
          if (staticPos) {
            realPosition = {
              id: staticPos.id,
              title: staticPos.title,
              slug: staticPos.slug,
            };
          }
        }

        if (!realPosition) {
          console.warn(`Could not resolve backend position for ${slugOrId}.`);
          set({
            isLoadingAssessment: false,
            assessmentLoadError: "This position does not require an assessment.",
          });
          return false;
        }

        const realId = realPosition.id;
        const realTitle = realPosition.title;
        const realSlug = realPosition.slug ?? searchStr;

        // Save resolved position in the store
        set({
          positionId: realId,
          positionTitle: realTitle,
          positionSlug: realSlug,
        });

        try {
          const data = await apiGet<any>(`/api/v1/hiring/positions/${realId}/assessment`);
          console.log("=== ASSESSMENT API DATA ===", data);
          
          if (!data || !data.has_assessment) {
            console.warn(`Position ID ${realId} does not require an assessment.`);
            set({
              isLoadingAssessment: false,
              assessmentLoadError: "This position does not require an assessment.",
            });
            return false;
          }

          const letterToIndex: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
          
          // Map MCQ questions
          const mcq = (data.mcq_questions || []).map((q: any) => ({
            id: String(q.id),
            question: q.question,
            options: q.options || [],
            correctAnswer: letterToIndex[q.correct_answer?.trim().toUpperCase()] ?? 0,
          }));

          // Map Short Answer questions
          const short = (data.short_answer_questions || []).map((q: any) => ({
            id: String(q.id),
            question: q.question,
            description: q.description || undefined,
            placeholder: q.placeholder || undefined,
            charLimit: q.char_limit ? Number(q.char_limit) : undefined,
          }));

          // Map Long Answer questions
          const long = (data.long_answer_questions || []).map((q: any) => ({
            id: String(q.id),
            question: q.question,
            description: q.description || undefined,
            placeholder: q.placeholder || undefined,
            charLimit: q.char_limit ? Number(q.char_limit) : undefined,
          }));

          // Build active assessment stage list
          const assessmentTypes: AssessmentType[] = [];
          if (mcq.length > 0) assessmentTypes.push("mcq");
          if (short.length > 0) assessmentTypes.push("short_answers");
          if (long.length > 0) assessmentTypes.push("long_answers");

          // Build per-stage time limits (only for active stages)
          const stageTimeLimits: Record<string, number> = Object.fromEntries(
            assessmentTypes.map((type) => {
              let apiMinutes: number | undefined;
              if (type === "mcq") apiMinutes = data.mcq_duration;
              else if (type === "short_answers") apiMinutes = data.short_answer_duration;
              else if (type === "long_answers") apiMinutes = data.long_answer_duration;
              // Fallback: split total duration equally among stages
              const fallback = Math.round((data.duration ?? 30) / (assessmentTypes.length || 1));
              return [type, apiMinutes ?? fallback];
            })
          );

          // Total time = sum of all active stage limits (accurate even when per-stage durations differ)
          const totalTimeLimitMinutes =
            Object.values(stageTimeLimits).reduce((sum, m) => sum + m, 0) || (data.duration ?? 30);

          const config: PositionAssessmentConfig = {
            positionId: realId,
            assessmentType: assessmentTypes[0] ?? "mcq",
            assessmentTypes,
            timeLimitMinutes: totalTimeLimitMinutes,
            stageTimeLimits,
            totalQuestions: data.total_questions ?? (mcq.length + short.length + long.length),
            passingScorePercent:
              data.passing_score !== undefined && data.passing_score !== null && Number(data.passing_score) > 0
                ? Number(data.passing_score)
                : null,
            title: `${realTitle} Screening`,
          };

          set({
            dynamicMcqQuestions: mcq,
            dynamicShortQuestions: short,
            dynamicLongQuestions: long,
            assessmentConfig: config,
            isLoadingAssessment: false,
            assessmentLoadError: null,
          });
          return true;
        } catch (err: any) {
          console.warn(`Assessment API fetch for position ${realId} failed, checking fallback:`, err);

          // If static config exists for this position ID, use it
          const staticConfig = assessmentConfigs[realId];
          if (staticConfig) {
            set({
              assessmentConfig: staticConfig,
              isLoadingAssessment: false,
              assessmentLoadError: null,
            });
            return true;
          }

          // Position is valid but has no assessment configuration in database/static data
          set({
            assessmentConfig: null,
            isLoadingAssessment: false,
            assessmentLoadError: "This position does not require an assessment.",
          });
          return false;
        }
      },

      reset: () =>
        set({
          positionId: null,
          positionTitle: "",
          name: "",
          email: "",
          isOtpVerified: false,
          applicationId: null,
          otpCode: null,
          isStarted: false,
          isCompleted: false,
          startedAt: null,
          stageTimeRemaining: {},
          isTimerRunning: false,
          mcqAnswers: {},
          shortAnswers: {},
          longAnswers: {},
          score: 0,
          isPassed: false,
          isGraded: false,
          assessmentConfig: null,
          completedStages: {},
          phoneNumber: "",
          location: "",
          linkedin: "",
          portfolio: "",
          heardAbout: [],
          experience: "",
          expectedSalary: "",
          noticePeriod: "",
          cvFileName: "",
          cvFileSize: 0,
          cvUrl: "",
          coverLetter: "",
          dynamicMcqQuestions: [],
          dynamicShortQuestions: [],
          dynamicLongQuestions: [],
          isLoadingAssessment: false,
          assessmentLoadError: null,
          showTimeoutAlert: null,
          transitionCountdown: null,
        }),
    }),
    {
      name: "malik-seed-application-store",
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage so it resets if they close tab
    }
  )
);
