export interface PayloadType {
  page?: string;
  limit?: string;
  status?: string;
}

export interface FeedBackPayload {
  title: string;
  apartNumber: string;
  content: string;
  image: File | null;
  status: string;
}

export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  apartNumber: string;
  userId: string;
  imageUrl: string | null;
  status: string;
  createdAt: string;
}

export interface FeedbackListResponse {
  feedBacks: FeedbackItem[];
  total: number;
  page: number | null;
  limit: number | null;
}
