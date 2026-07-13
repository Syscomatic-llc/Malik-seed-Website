import { apiGet, RequestOptions } from "./client";
import {
  ApiOurStoryHero,
  ApiOurStoryMission,
  ApiOurStoryValue,
  ApiOurStoryTimelineItem,
  ApiOurStoryData,
} from "./types";

export const aboutpageApi = {
  getHero(options?: RequestOptions) {
    return apiGet<ApiOurStoryHero>("/api/v1/our-story/hero", options);
  },
  getMission(options?: RequestOptions) {
    return apiGet<ApiOurStoryMission>("/api/v1/our-story/mission", options);
  },
  getValues(options?: RequestOptions) {
    return apiGet<ApiOurStoryValue[]>("/api/v1/our-story/values", options);
  },
  getTimeline(options?: RequestOptions) {
    return apiGet<ApiOurStoryTimelineItem[]>("/api/v1/our-story/timeline", options);
  },
  getTeam(options?: RequestOptions) {
    return apiGet<unknown[]>("/api/v1/our-story/team", options);
  },
  getLeadership(options?: RequestOptions) {
    return apiGet<unknown[]>("/api/v1/our-story/team/leadership", options);
  },
  getAwards(options?: RequestOptions) {
    return apiGet<unknown[]>("/api/v1/our-story/awards", options);
  },
  getAll(options?: RequestOptions) {
    return apiGet<ApiOurStoryData>("/api/v1/our-story/", options);
  },
};
