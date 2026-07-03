import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { assessmentConfigs, type PositionAssessmentConfig } from "@/data/questions-data";

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
      coverLetter: "",

      // Actions
      setPersonalInfo: (name, email) => set({ name, email }),

      setOtpVerified: (isOtpVerified) => set({ isOtpVerified }),

      startAssessment: (positionId, positionTitle, config) => {
        const types = config?.assessmentTypes ?? (config ? [config.assessmentType] : []);
        const stageTimeRemaining: Record<string, number> = {};

        types.forEach((type: string) => {
          const limit = config?.stageTimeLimits?.[type] ?? config?.timeLimitMinutes ?? 30;
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
          // Timer finished! Stop timer and finalize based on the active flow.
          const updatedTimes = { ...stageTimes, [currentStage]: 0 };
          const updatedCompletedStages = {
            ...get().completedStages,
            [currentStage]: true,
          };
          const posId = get().positionId;
          let nextStageExists = false;
          if (posId) {
            const config = get().assessmentConfig ?? assessmentConfigs[posId];
            const types = config?.assessmentTypes ?? (config ? [config.assessmentType] : []);
            const currentIndex = types.indexOf(currentStage as any);
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
          coverLetter: "",
        }),
    }),
    {
      name: "malik-seed-application-store",
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage so it resets if they close tab
    }
  )
);
