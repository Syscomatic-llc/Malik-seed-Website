import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  mcqQuestionsData,
  assessmentConfigs,
  shouldAutoGradeAssessment,
} from "@/data/questions-data";

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
    timeLimitMinutes: number
  ) => void;
  tickTimer: (currentStage: string) => void;
  stopTimer: () => void;
  setMCQAnswer: (questionId: string, optionIndex: number) => void;
  setShortAnswer: (questionId: string, answerText: string) => void;
  setLongAnswer: (questionId: string, answerText: string) => void;
  gradeAssessment: () => void;
  completeAssessment: () => void;
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

      startAssessment: (positionId, positionTitle, timeLimitMinutes) => {
        const config = assessmentConfigs[positionId];
        const types = config?.assessmentTypes ?? (config ? [config.assessmentType] : []);
        const stageTimeRemaining: Record<string, number> = {};

        types.forEach((type) => {
          const limit = config?.stageTimeLimits?.[type] ?? config?.timeLimitMinutes ?? 30;
          stageTimeRemaining[type] = limit * 60;
        });

        set({
          positionId,
          positionTitle,
          isStarted: true,
          isCompleted: false,
          startedAt: Date.now(),
          stageTimeRemaining,
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
          set({ stageTimeRemaining: updatedTimes, isTimerRunning: false });
          const posId = get().positionId;
          if (posId) {
            const config = assessmentConfigs[posId];
            const types = config?.assessmentTypes ?? (config ? [config.assessmentType] : []);
            const currentIndex = types.indexOf(currentStage as any);
            const nextStage = types[currentIndex + 1];

            if (!nextStage) {
              if (shouldAutoGradeAssessment(posId)) {
                get().gradeAssessment();
              } else {
                get().completeAssessment();
              }
            }
          }
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

      gradeAssessment: () => {
        const state = get();
        const posId = state.positionId;
        if (!posId) return;

        const config = assessmentConfigs[posId];
        if (!config) return;

        if (!shouldAutoGradeAssessment(posId)) {
          return;
        }

        let score = 0;
        let isPassed = false;

        const questions = mcqQuestionsData[posId] || [];
        if (questions.length > 0) {
          let correctCount = 0;
          questions.forEach((q) => {
            const candidateAnswer = state.mcqAnswers[q.id];
            if (candidateAnswer === q.correctAnswer) {
              correctCount++;
            }
          });
          score = Math.round((correctCount / questions.length) * 100);
          isPassed = score >= config.passingScorePercent;
        }

        set({
          score,
          isPassed,
          isGraded: true,
          isCompleted: true,
          isTimerRunning: false,
        });
      },

      completeAssessment: () => {
        set({
          isCompleted: true,
          isGraded: false,
          isPassed: false,
          isTimerRunning: false,
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
