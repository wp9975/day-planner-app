import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req, res);
  if (req.method === 'POST') {
    const { prompt, maxTokens } = req.body;
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Your task is to generate a plan to carry out a task given by the user. The user specifies what task they have to perform and you return the response in one of the following formats:
          
              1. "1:00 - Description of what the user has to do."
              2. "1:00: Description of what the user has to do."
              3. "1:20 : Description of what the user has to do."
          
              Note that time (e.g., "1:00") is the expected duration of the task, and the "Description of what the user has to do" is the task details.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: maxTokens,
      });

      const assistantMessage =
        response.data.choices && response.data.choices[0]
          ? response.data.choices[0].message
          : null;

      if (assistantMessage && assistantMessage.role === "assistant") {
        res.status(200).json({ data: assistantMessage.content });
      } else {
        throw new Error("No assistant message returned by OpenAI");
      }
    } catch (error) {
      console.error(error); // Add logging of the error
      res.status(500).json({ error: 'Error calling OpenAI API' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' }); 
  }
}
