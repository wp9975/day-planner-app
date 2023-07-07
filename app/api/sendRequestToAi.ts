
import axios from 'axios';

export async function sendRequestToAi(prompt: string, maxTokens: number = 1000) {
  try {
    const response = await axios.post('http://localhost:3000/api', { prompt, maxTokens });

    return response.data.data; 
  } catch (error) {
    console.error("Error calling OpenAI API: ", error);
    throw error;
  }
}

