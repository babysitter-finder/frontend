export interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  service_id: string;
  reviewer_username: string;
  reviewer_name: string;
}

export interface ReviewForm {
  rating: number;
  comment: string;
}
