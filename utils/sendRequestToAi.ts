import axios from "axios"
import { Configuration, OpenAIApi } from "openai"

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
const OPENAI_API_KEY = "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" // replace with your actual key

const openai = new OpenAIApi(
  new Configuration({
    apiKey: OPENAI_API_KEY,
  })
)

async function sendRequestToAi(prompt: string, maxTokens: number = 1000) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Your task is to generate a plan to carry out a task given by the user. The user specifies what task they have to perform and you return the response in one of the following formats:
          
              1. "1:00 - Description of what the user has to do."
              2. "Czas 1:00: Description of what the user has to do."
              3. "1:20 : Description of what the user has to do."
          
              Note that time (e.g., "1:00") is the expected duration of the task, and the "Description of what the user has to do" is the task details.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
    })

    console.log(response.data)

    // Get the last message from the assistant
    const assistantMessage =
      response.data.choices && response.data.choices[0]
        ? response.data.choices[0].message
        : null

    if (assistantMessage && assistantMessage.role === "assistant") {
      return assistantMessage.content
    } else {
      throw new Error("No assistant message returned by OpenAI")
    }
  } catch (error) {
    console.error("Error calling OpenAI API: ", error)
    throw error
  }
}

export default sendRequestToAi

// async function sendRequestToAi(prompt: string, maxTokens: number = 60) {
//     const response = await axios.post(OPENAI_API_URL,
//       {
//         prompt,
//         max_tokens: maxTokens,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${OPENAI_API_KEY}`
//         },
//       }
//     );

//     if (response.status !== 200) {
//       throw new Error(`OpenAI API request failed with status ${response.status}`);
//     }

//     return response.data.choices[0].text.trim();
//   }
