import { config } from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

// Load environment variables
config();

// Initialize the chat model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Create a prompt template
const prompt = ChatPromptTemplate.fromTemplate(
  "Crie uma frase sobre o seguinte: {assunto}"
);

// Create a chain using the pipe operator (|) equivalent in TypeScript
const chain = RunnableSequence.from([
  prompt,
  model,
  new StringOutputParser(),
]);

// Example usage
async function generatePhrase(assunto: string) {
  try {
    const result = await chain.invoke({ assunto });
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error generating phrase:", error);
    throw error;
  }
}

// Example usage
generatePhrase("gatinhos")
  .then((result) => {
    console.log("Generated phrase:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

export { generatePhrase }; 