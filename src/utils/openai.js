import OpenAI from 'openai';
import chatgptAPI from "../api_key";

const openai = new OpenAI({
  apiKey: chatgptAPI,
  dangerouslyAllowBrowser:true,
});

export default openai;

