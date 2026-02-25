import express from "express";
import Thread from "../models/Thread.js";
// import getOpenAiAPIResponse from "../utils/openai.js";
import { getGeminiResponse } from "../utils/openai.js";

const router = express.Router();


// test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz",
      title: "Testing New Thread after so many days",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in DB" });
  }
});

// Get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({updatedAt : -1 }); 
    // we need threads in descending order of updatedAt  i.e most recent data should be on top
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// route to get messages of particular thread
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// to delete particular thread
router.delete("/thread/:threadId", async(req, res)=>{
    const {threadId} = req.params;
    try{
        const deletedThread = await Thread.findOneAndDelete({threadId});
        
        if(!deletedThread){
            res.status(400).json({error: "Thread not found"})
        }

        res.status(200).json({success: "Thread deleted successfully"})
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"})
        
    }
})

// to be able to create new chat with a message and a reply
router.post("/chat", async(req, res)=>{
  const {threadId, message} = req.body;

  // 1. Validation check
  if(!threadId || !message){
     res.status(400).json({error: "missing required fields"}); //yaha return tha 
  }
  try{
    // 2. Find or Create the thread context
    let thread = await Thread.findOne({threadId});

    if(!thread){  //if thread does not exists
      // create a new thread in Db
      thread = new Thread({
        threadId,
        title: message,
        messages: [{role: "user", content: message}]
      })
    }else{
      thread.messages.push({role: "user", content: message});
    }
    // 3. Get AI Response with safety check
    // const assistantReply = await getOpenAiAPIResponse(message);
    const assistantReply = await getGeminiResponse(message);

    // // CRITICAL FIX: Verify the AI actually replied before saving to DB
    // if (!assistantReply) {
    //   return res.status(500).json({ error: "AI failed to generate a response" });
    // }

    // 4. Update and Save
    thread.messages.push({role: "assistant", content: assistantReply});
    thread.updatedAt = new Date();

    await thread.save();

    // 5. Send back the successful reply
    res.json({reply: assistantReply});

  }catch(err){
    console.log(err);
    res.status(500).json({error: "something went wrong"});
    
  }

})

export default router;
