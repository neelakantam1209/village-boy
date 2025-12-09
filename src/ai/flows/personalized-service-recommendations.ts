'use server';

/**
 * @fileOverview Personalized service recommendations flow.
 *
 * This file defines a Genkit flow that provides personalized service recommendations to users
 * based on their past behavior and preferences.
 *
 * @module src/ai/flows/personalized-service-recommendations
 *
 * @exports personalizedServiceRecommendations - The main function to trigger the flow.
 * @exports PersonalizedServiceRecommendationsInput - The input type for the personalizedServiceRecommendations function.
 * @exports PersonalizedServiceRecommendationsOutput - The output type for the personalizedServiceRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for personalized service recommendations.
 */
const PersonalizedServiceRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  pastServices: z.array(z.string()).describe('List of past services used by the user.'),
  preferences: z.string().describe('User preferences (e.g., budget, time of day).'),
});

/**
 * Type for the input of the personalized service recommendations flow.
 */
export type PersonalizedServiceRecommendationsInput = z.infer<
  typeof PersonalizedServiceRecommendationsInputSchema
>;

/**
 * Output schema for personalized service recommendations.
 */
const PersonalizedServiceRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('Personalized service recommendations.'),
});

/**
 * Type for the output of the personalized service recommendations flow.
 */
export type PersonalizedServiceRecommendationsOutput = z.infer<
  typeof PersonalizedServiceRecommendationsOutputSchema
>;

/**
 * Main function to trigger the personalized service recommendations flow.
 * @param input - The input for the flow.
 * @returns A promise that resolves to the personalized service recommendations.
 */
export async function personalizedServiceRecommendations(
  input: PersonalizedServiceRecommendationsInput
): Promise<PersonalizedServiceRecommendationsOutput> {
  return personalizedServiceRecommendationsFlow(input);
}

/**
 * Prompt definition for personalized service recommendations.
 */
const personalizedServiceRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedServiceRecommendationsPrompt',
  input: {schema: PersonalizedServiceRecommendationsInputSchema},
  output: {schema: PersonalizedServiceRecommendationsOutputSchema},
  prompt: `You are an expert service recommender.

  Based on the user's past services and preferences, recommend services that the user might be interested in.

  User ID: {{{userId}}}
  Past Services: {{#each pastServices}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Preferences: {{{preferences}}}

  Recommendations should be relevant to the user's past behavior and cater to the stated preferences.

  Return a JSON object with a \"recommendations\" array containing the names of recommended services.
  `,
});

/**
 * Flow definition for personalized service recommendations.
 */
const personalizedServiceRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedServiceRecommendationsFlow',
    inputSchema: PersonalizedServiceRecommendationsInputSchema,
    outputSchema: PersonalizedServiceRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedServiceRecommendationsPrompt(input);
    return output!;
  }
);
