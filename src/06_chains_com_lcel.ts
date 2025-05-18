import { config } from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence} from "@langchain/core/runnables";
import { Logger } from "./Logger";

// Load environment variables
config();

Logger.info("Initializing chat model...");
// Initialize the chat model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Create a prompt template
const prompt = ChatPromptTemplate.fromTemplate(
  "Crie uma frase sobre o seguinte: {assunto}"
);

Logger.chain("Creating chain with prompt, model, and output parser...");
// Create a chain using the pipe operator (|) equivalent in TypeScript
const chain = RunnableSequence.from([
  prompt,
  model,
  new StringOutputParser(),
]);

// Example usage
async function generatePhrase(assunto: string) {
  try {
    Logger.info(`Generating phrase about: ${assunto}`);
    const result = await chain.invoke({ assunto });
    Logger.success("Generated phrase successfully");
    Logger.info(`Generated phrase: ${result}`);
    return result;
  } catch (error) {
    Logger.error(`Error generating phrase: ${error}`);
    throw error;
  }
}

// Challenge 01:
Logger.info("Setting up translation challenge...");
// Create a prompt template
const promptChallenge01 = ChatPromptTemplate.fromTemplate(
  "Traduza o texto para pt-BR: {text}"
);

Logger.chain("Creating translation chain...");
// Create a chain using the pipe operator (|) equivalent in TypeScript
const chainChallenge01 = RunnableSequence.from([
  promptChallenge01,
  model,
  new StringOutputParser(),
]);

// Example usage
async function translateText(text: string) {
  try {
    Logger.info(`Translating text: ${text}`);
    const result = await chainChallenge01.invoke({ text });
    Logger.success("Translation completed successfully");
    Logger.info(`Translated text: ${result}`);
    return result;
  } catch (error) {
    Logger.error(`Error translating text: ${error}`);
    throw error;
  }
}

// Challenge 02:
Logger.info("Setting up resume challenge...");
// Create a prompt template
const promptChallenge02 = ChatPromptTemplate.fromTemplate(
  "Resuma o texto: {text}"
);

Logger.chain("Creating resume chain...");
// Create a chain using the pipe operator (|) equivalent in TypeScript
const chainChallenge02 = RunnableSequence.from([
  promptChallenge02,
  model,
  new StringOutputParser(),
]);

// Example usage
async function resumeText(text: string) {
  try {
    Logger.info(`Resuming text: ${text}`);
    const result = await chainChallenge02.invoke({ text });
    Logger.success("Translation completed successfully");
    Logger.info(`Translated text: ${result}`);
    return result;
  } catch (error) {
    Logger.error(`Error translating text: ${error}`);
    throw error;
  }
}

// Challenge 03:
Logger.info("Setting up combination chains challenge...");
// create prompt template
const promptChallenge03 = ChatPromptTemplate.fromTemplate(
  "Traduza o texto para pt-BR e depois resumo: {text}"
);

// Create a chain that combines the translation and resume chains
const chainChallenge03 = RunnableSequence.from([
  chainChallenge01,
  (translatedText) => ({ text: translatedText }),
  chainChallenge02,
]);

// Example usage
async function combineChains(text: string) {
  try {
    Logger.info(`Combining chains with text: ${text}`);
    const result = await chainChallenge03.invoke({ text });
    Logger.success("Combination chains completed successfully");
    Logger.info(`Combined text: ${result}`);
    return result;
  } catch (error) {
    Logger.error(`Error combining chains: ${error}`);
    throw error;
  }
}

  async function main() {
    await generatePhrase("gatinhos");
    Logger.info("--------------------------------");
    Logger.info("Challenge 01: Translation");
    await translateText("Hello, how are you?");
    Logger.info("--------------------------------");
    Logger.info("Challenge 02: Resume");
    await resumeText("Esse é um texto de exemplo para ser resumido. Ele é longo e complexo, mas deve ser resumido em poucas palavras. Ele deve ser resumido em poucas palavras e deve ser um texto curto e objetivo.");
    Logger.info("--------------------------------");
    Logger.info("Challenge 03: Combination Chains");
    await combineChains("This is a text example to be translated and summarized. It is long and complex, but should be translated and summarized in a few words. It should be translated and summarized in a few words and should be a short and objective text.");
  }

  main();