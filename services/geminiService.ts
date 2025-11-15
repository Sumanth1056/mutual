
import { GoogleGenAI } from "@google/genai";
import type { MutualFund } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getFundInsight = async (fund: MutualFund): Promise<string> => {
    const prompt = `
        Act as a neutral financial analyst. Provide a concise and balanced summary for a retail investor about the following mutual fund.
        Do not give financial advice or recommend buying or selling. The summary should be easy to understand and objective.

        Fund Details:
        - Name: ${fund.name} (${fund.ticker})
        - Fund House: ${fund.fundHouse}
        - Category: ${fund.category}
        - Investment Strategy: ${fund.strategy}
        - 1-Year Return: ${fund.returns.oneYear}%
        - 3-Year Annualized Return: ${fund.returns.threeYear}%
        - 5-Year Annualized Return: ${fund.returns.fiveYear}%
        - Expense Ratio: ${fund.expenseRatio}%
        - Assets Under Management (AUM): $${fund.aum} billion

        Based on these details, provide a summary covering these points in separate paragraphs:
        1.  **Fund Objective & Strategy:** Briefly explain what the fund aims to do and what it invests in.
        2.  **Performance Analysis:** Comment on its recent and long-term performance compared to typical funds in its category, without making future predictions.
        3.  **Risk & Suitability Profile:** Describe the potential risks associated with this type of fund (e.g., market risk, sector concentration) and the kind of investor it might be suitable for.
        4.  **Key Considerations:** Mention the expense ratio and AUM as points of consideration.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content from Gemini API:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};
