import { api, publicApi } from "./index";

export const forumApi = {
  create(data: { title: string; description: string }) {
    return api.post("/forums", data);
  },

  getById(forumId: string | number) {
    return publicApi.get(`/forums/${forumId}`);
  },

  getMessages(forumId: string | number) {
    return publicApi.get(`/forums/${forumId}/messages`);
  },
  getForums() {
    return publicApi.get(`/forums`);
  },
};
