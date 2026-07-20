import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  assessmentConfigs,
  type PositionAssessmentConfig,
  type MCQQuestion,
  type ShortAnswerQuestion,
  type LongAnswerQuestion,
} from "@/data/questions-data";
import { apiGet } from "@/lib/api/client";

export interface ApplicationState {
  // Job context
  positionId: number | null;
  positionTitle: string;

  // Personal Info
  name: string;
  email: string;
  isOtpVerified: boolean;

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
  fetchAssessment: (positionId: string | number, positionTitle: string) => Promise<boolean>;
  setShowTimeoutAlert: (stage: string | null) => void;
  setTransitionCountdown: (countdown: number | null) => void;
  finalizeTimeoutStage: (stage: string | null) => void;
  reset: () => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      // Initial state
      positionId: null,
      positionTitle: "",
      name: "",
      email: "",
      isOtpVerified: false,
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

      setOtpVerified: (isOtpVerified) => set({ isOtpVerified }),

      setShowTimeoutAlert: (showTimeoutAlert) => set({ showTimeoutAlert }),

      setTransitionCountdown: (transitionCountdown) => set({ transitionCountdown }),

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

      fetchAssessment: async (positionId, positionTitle) => {
        set({ isLoadingAssessment: true, assessmentLoadError: null });
        try {
          // Resolve real backend ID from title or slug
          const positions = await apiGet<any[]>("/api/v1/hiring/positions");
          let realPosition = null;

          if (typeof positionId === "string" && isNaN(Number(positionId))) {
            realPosition = positions.find(
              (p: any) => p.slug === positionId || p.slug === positionId.toLowerCase()
            );
          } else {
            const targetId = Number(positionId);
            realPosition = positions.find(
              (p: any) => p.id === targetId || p.title.toLowerCase() === positionTitle.toLowerCase()
            );
          }

          if (!realPosition) {
            realPosition = positions.find(
              (p: any) => p.title.toLowerCase() === positionTitle.toLowerCase()
            );
          }

          if (!realPosition) {
            console.warn(`Could not resolve backend position for ${positionTitle} (${positionId}).`);
            set({
              isLoadingAssessment: false,
              assessmentLoadError: "This position does not require an assessment.",
            });
            return false;
          }

          const realId = realPosition.id;
          const data = await apiGet<any>(`/api/v1/hiring/positions/${realId}/assessment`);
          
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
          }));

          // Map Long Answer questions
          const long = (data.long_answer_questions || []).map((q: any) => ({
            id: String(q.id),
            question: q.question,
            description: q.description || undefined,
            placeholder: q.placeholder || undefined,
          }));

          // Build config
          const assessmentTypes: any[] = [];
          if (mcq.length > 0) assessmentTypes.push("mcq");
          if (short.length > 0) assessmentTypes.push("short_answers");
          if (long.length > 0) assessmentTypes.push("long_answers");

          const config: PositionAssessmentConfig = {
            positionId: realId,
            assessmentType: assessmentTypes[0] ?? "mcq",
            assessmentTypes,
            timeLimitMinutes: data.duration ?? 30,
            stageTimeLimits: {
              mcq: data.mcq_duration ?? 30,
              short_answers: data.short_answer_duration ?? 30,
              long_answers: data.long_answer_duration ?? 30,
            },
            totalQuestions: data.total_questions ?? (mcq.length + short.length + long.length),
            passingScorePercent: data.passing_score ?? 70,
            title: `${positionTitle} Screening`,
          };

          set({
            dynamicMcqQuestions: mcq,
            dynamicShortQuestions: short,
            dynamicLongQuestions: long,
            assessmentConfig: config,
            isLoadingAssessment: false,
          });
          return true;
        } catch (err: any) {
          console.error("Failed to fetch assessment from API:", err);
          set({
            isLoadingAssessment: false,
            assessmentLoadError: err?.message || "Failed to load assessment data",
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
