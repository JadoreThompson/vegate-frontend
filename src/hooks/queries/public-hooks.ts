import type { ApiError } from "@/lib/types/apiError";
import { handleApi } from "@/lib/utils/base";
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
      mutationFn: async (payload: ContactForm) =>
        handleApi(await contactUsPublicContactPost(payload)),
    },
  );
}
