import type { ApiError } from "@/lib/types/apiError";
import { useMutation } from "@tanstack/react-query";

import {
    contactUsPublicContactPost,
    type ContactForm,
    type contactUsPublicContactPostResponse,
} from "@/openapi";

/**
 * Mutation hook to submit a contact form
 */
export function useContactForm() {
  return useMutation<contactUsPublicContactPostResponse, ApiError, ContactForm>(
    {
      mutationFn: (payload: ContactForm) => contactUsPublicContactPost(payload),
    },
  );
}
